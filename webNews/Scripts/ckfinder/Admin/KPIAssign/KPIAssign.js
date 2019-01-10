
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
                title: 'Mã nhân viên',
                field: 'StaffCode',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên nhân viên',
                field: 'StaffName',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên KPI',
                field: 'KpiName',
                align: "left",
                width: "150px"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Từ ngày',
                field: 'FromDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Đến ngày',
                field: 'ToDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    if (value == "1") {
                        return "Hoạt động";
                    } else if (value == "0") {
                        return "Ngừng hoạt động";
                    } else if (value == "2") {
                        return "Đã xóa";
                    }
                }
            }), Sv.BootstrapTableColumn("String", {
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
                            var url = "/Admin/KPIAssign/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), row.FromDate);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), row.ToDate);
                                $('#formDetail #txtStaffId').prop('disabled', true);
                                initTable(model.id, 1);
                            });
                        });
                    }
                }
            })
        ];
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

    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if (action == "Add") {
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: "/KPIAssign/Create",
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
        if (action == "Edit") {
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: "/KPIAssign/Update",
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
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.StaffId = $('#txtStaffId').val();
        obj.KpiId = $('#txtKpiId').val();
        obj.FromDate = $('#sFromDate').val();
        obj.ToDate = $('#sToDate').val();
        obj.Active = $('#txtActive').val();
        return obj;
    }
    this.GetFormData = function () {
        var obj = $('#formDetail').serialize();
        return obj;
    }
}


$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/KPIAssign/GetData",
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
        $('#txtStaffId').val('-1').trigger('change');
        $('#txtKpiId').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/KPIAssign/ShowModal";
        var model = {
            id: 0, action: "Add"
        };

        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), new Date());
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), new Date());
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