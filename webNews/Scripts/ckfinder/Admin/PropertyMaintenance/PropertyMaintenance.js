var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();

    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table, index);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tài sản',
                field: 'ProductName',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Từ ngày',
                field: 'FromDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Đến ngày',
                field: 'ToDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chi phí',
                field: 'Fee',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "");
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "left",
                width: "100px",
                formatter: function (value) {
                    if (value == "1") {
                        return "Đang hoạt động";
                    } else {
                        return "Ngừng hoạt động";
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PropertyMaintenance/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), row.FromDate);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), row.ToDate);
                                getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#formDetail #txtProductId', false);
                                jQuery(function() {
                                    $('#txtFee').number(true,0);
                                });
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total == 0) {
                    base.$table.bootstrapTable('removeAll');
                }
                return {
                    total: res.total,
                    rows: res.data
                };
            },
        });
    }
    base.GetFormData = function () {
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/PropertyMaintenance/Create";
        if (action == "Edit") {
            url = "/PropertyMaintenance/Update";
        }
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.LoadTableSearch();
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                },
                function () {
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        }
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.BranchCode = $('#txtBranchCode').val();
        obj.FromDate = $('#txtFromDate').val();
        obj.ToDate = $('#txtToDate').val();
        obj.Active = $('#txtActive').val();
        return obj;
    }
}

var getAllProductByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/PropertyMaintenance/GetAssetData',
        Data: { branchCode: branchCode }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response))
            $.each(response,
                function (key, value) {
                    $(controlSelect).append('<option value="' +
                        value.ProductId +
                        '">' +
                        value.ProductName +
                        '</option>');
                });
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

$(document).ready(function () {
    var unit = new Unit();

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/PropertyMaintenance/GetData",
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));
    unit.$btnOpenSearch.click(function () {
        Sv.SetupDateAndSetDefaultNotMaxDate($('#formSearch #divFromDate'), new Date());
        Sv.SetupDateAndSetDefaultNotMaxDate($('#formSearch #divToDate'), new Date());
        unit.$searchModal.modal({ backdrop: "static" });
        
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#formSearch #divFromDate"), $("#formSearch #divToDate"));
        $('#txtBranchCode').val('-1').trigger('change');
        $('#txtProductId').val('').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/PropertyMaintenance/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), new Date());
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), new Date());
            getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#formDetail #txtProductId', false);
            jQuery(function () {
                $('#txtFee').number(true, 0);
            });
        });
    });

    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        unit.SubmitServer("Add", 0);
    });
    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });
    unit.$boxDetails.on('change', 'select#txtBranchCode', function () {
        getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#formDetail #txtProductId', false);
    });
});