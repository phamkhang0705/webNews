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
                title: 'Gói học phí',
                field: 'CourseName',
                align: "left",
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lớp học',
                field: 'ClassName',
                align: "left",
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã học viên',
                field: 'StudentCode',
                align: "left",
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên học viên',
                field: 'StudentName',
                align: "left",
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "left",
                width: "100px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Giới tính',
                field: 'Sex',
                align: "right",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'IsRecieptGift',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        if (data.IsRecieptGift == 'true') {
                            str += "<button data-code='%s' class='OpenCancelItem btn btn-primary btn-in-table' title='Hủy'><i class='fa fa-pencil-square-o'></i></button>";
                        } else {
                            str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Phát quà'><i class='fa fa-remove'></i></button>";
                        }
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            Sv.ChecPermission("View", function () {
                                Dialog.ConfirmCustom("Xác nhận", "Bạn có chắc chắn muốn phát quà cho học viên này?", function () {
                                    base.SubmitServer("Edit", row.ClassOfCourseStudentId, 1);
                                });
                            });
                        });
                    },
                    'click .OpenCancelItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            Dialog.ConfirmCustom("Xác nhận", "Bạn có chắc chắn muốn hủy phát quà cho học viên này?", function () {
                                base.SubmitServer("Edit", row.ClassOfCourseStudentId, 2);
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
    this.GetFormSearchData = function () {
        var obj = {};
        obj.CourseId = $('#txtCourseId').val();
        obj.ClassId = $('#txtClassId').val();
        return obj;
    }
    this.SubmitServer = function (action, classOfCourseStudentId, type) {
        if (action == "Edit") {
            url = "/GiveGift/Update";
        }
        Sv.AjaxPost({
            Url: url,
            Data: {
                classOfCourseStudentId: classOfCourseStudentId,
                type: type,

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
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/GiveGift/GetData",
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
        $('#txtClassId').val('-1').trigger('change');
        $('#txtCourseId').val('-1').trigger('change');
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/GiveGift/ShowModal";
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
});