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
                title: 'Tên sự kiện',
                field: 'Name',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày bắt đầu',
                field: 'DateBegin',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày kết thúc',
                field: 'DateEnd',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreateDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Kinh phí',
                field: 'Funding',
                align: "right",
                width: "100px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Độ tuổi tham dự',
                field: 'Age',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lịch trình',
                field: 'Schedule',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Địa điểm tổ chức',
                field: 'Address',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhân viên',
                field: 'StaffName',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Event/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divDateBegin'), row.DateBegin);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divDateEnd'), row.DateEnd);
                                jQuery(function() {
                                    $('#txtFunding').number(true,0);
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
        var url = "/Event/Create";
        if (action == "Edit") {
            url = "/Event/Update";
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
        obj.Name = $('#txtCategoryName').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Event/GetData",
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
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
        $('#txtBranchCode').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Event/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefaultNotMaxDate($('#divDateBegin'), new Date());
            Sv.SetupDateAndSetDefaultNotMaxDate($('#divDateEnd'), new Date());
            jQuery(function () {
                $('#txtFunding').number(true, 0);
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
});