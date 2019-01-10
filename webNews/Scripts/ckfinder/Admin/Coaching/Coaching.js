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
                title: 'Lớp học',
                field: 'CourseName',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã học viên',
                field: 'StudentCode',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên học viên',
                field: 'StudentName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Giới tính',
                field: 'Sex',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày bắt đầu',
                field: 'LastContactDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Xác nhận'><i class='fa fa-pencil-square-o'></i></button>";
                        str += "<button data-code='%s' class='OpenCancelItem btn btn-primary btn-in-table' title='Hủy xác nhận'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            Dialog.ConfirmCustom("Xác nhận", "Bạn có chắc chắn xác nhận đã liên lạc?", function () {
                                base.SubmitServer("Edit", row.Id, 1);
                            });
                        });
                    },
                    'click .OpenCancelItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            Dialog.ConfirmCustom("Xác nhận", "Bạn có chắc chắn hủy xác nhận đã liên lạc?", function () {
                                base.SubmitServer("Edit", row.Id, 0);
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
    this.SubmitServer = function (action, id, iscall) {
        var url = "/Coaching/Update";
        Sv.AjaxPost({
            Url: url,
            Data: {
                id: id,
                iscall: iscall
            }
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
    this.GetFormSearchData = function () {
        var obj = {};
        obj.FromDate = $('#txtFromDate').val();
        obj.ToDate = $('#txtToDate').val();
        obj.IsCall = $('#txtIsCall').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate).format("DD/MM/YYYY HH:mm:ss");
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().FormDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate).format("DD/MM/YYYY HH:mm:ss");
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().ToDate);
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Coaching/GetData",
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
        var url = "/Admin/Coaching/ShowModal";
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