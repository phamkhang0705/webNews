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
                title: 'Tiêu đề',
                field: 'Name',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương cơ bản trợ giảng',
                field: 'TutorsSalary',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value!=null ?(parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'): "";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số tiết dạy mức 1',
                field: '',
                align: "right",
                width: "150px",
                formatter: function (value, row, index) {
                    return (row.MainTeacherSalary_1_Lession_From != null ? (parseInt(row.MainTeacherSalary_1_Lession_From)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "") + " - " + (row.MainTeacherSalary_1_Lession_To != null ? (parseInt(row.MainTeacherSalary_1_Lession_To)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "");
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương GV chính mức 1',
                field: 'MainTeacherSalary_1',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số tiết dạy mức 2',
                field: '',
                align: "right",
                width: "150px",
                formatter: function (value, row, index) {
                    return (row.MainTeacherSalary_2_Lession_From != null ? (parseInt(row.MainTeacherSalary_2_Lession_From)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "") + " - " + (row.MainTeacherSalary_2_Lession_To != null ? (parseInt(row.MainTeacherSalary_2_Lession_To)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "");
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương GV chính mức 2',
                field: 'MainTeacherSalary_2',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số tiết dạy mức 3',
                field: '',
                align: "right",
                width: "150px",
                formatter: function (value, row, index) {
                    return (row.MainTeacherSalary_3_Lession_From != null ? (parseInt(row.MainTeacherSalary_3_Lession_From)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "") + " - " + (row.MainTeacherSalary_3_Lession_To != null ? (parseInt(row.MainTeacherSalary_3_Lession_To)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "");
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương GV chính mức 3',
                field: 'MainTeacherSalary_3',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Lương giáo viên nước ngoài',
                field: 'ForeignTeacherSalary',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương giáo viên chính OT',
                field: 'TeacherSalary_OverTime',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương giáo viên nước ngoài OT',
                field: 'TeacherSalaryForeignTeacher_OverTime',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            })
            ,Sv.BootstrapTableColumn("string", {
                title: 'Lương trợ giảng OT',
                field: 'Tutors_OverTime',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Tỷ giá USD',
                field: 'Rate',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "";
                }
            }),Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                width: "150px",
                formatter: function (value, row, index) {
                    if (value == true) {
                        return "Đang có hiệu lực"
                    } else {
                        return "Hết hiệu lực"
                    }
                }
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
                            var url = "/Admin/SalaryStandard/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                jQuery(function () {
                                    $('#txtTutorsSalary').number(true, 0);
                                    $('#txtMainTeacherSalary_1').number(true, 0);
                                    $('#txtMainTeacherSalary_1_Lession_From').number(true, 0);
                                    $('#txtMainTeacherSalary_1_Lession_To').number(true, 0);
                                    $('#txtMainTeacherSalary_2').number(true, 0);
                                    $('#txMainTeacherSalary_2_Lession_From').number(true, 0);
                                    $('#txtMainTeacherSalary_2_Lession_To').number(true, 0);
                                    $('#txtMainTeacherSalary_3').number(true, 0);
                                    $('#txtMainTeacherSalary_3_Lession_From').number(true, 0);
                                    $('#txtMainTeacherSalary_1_Lession_To').number(true, 0);
                                    $('#txtForeignTeacherSalary').number(true, 0);
                                    $('#txtTeacherSalary_OverTime').number(true, 0);
                                    $('#txtTeacherSalaryForeignTeacher_OverTime').number(true, 0);
                                    $('#txtTutors_OverTime').number(true, 0);
                                    $('#txtTutorsSalary').number(true, 0);
                                    $('#txtRate').number(true, 0);
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
        var url = "/SalaryStandard/Create";
        if (action == "Edit") {
            url = "/SalaryStandard/Update";
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
        url: "/Admin/SalaryStandard/GetData",
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
        var url = "/Admin/SalaryStandard/ShowModal";
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