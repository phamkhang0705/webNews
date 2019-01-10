var i = 0;
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
                title: 'Khoá học',
                field: 'CourseName',
                align: "left",
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lớp học hiện tại',
                field: 'ClassName',
                align: "left",
                width: "200px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã học viên',
                field: 'Code',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'Name',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Gói học phí',
                field: 'TuitionPackageName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí gia hạn',
                field: 'AmountOfMoney',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tổng số buổi học',
                field: 'NumberOfSessions',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            })
            , Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Gia hạn'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        i = index;
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/StudentExtend/ShowModal";
                            var model = {
                                classOfCourseId: row.ClassOfCourseId, studentId: row.StudentId, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $('#formDetail #txtStudentId').prop('disabled', true);
                                $('#formDetail #txtNumberOfSessions').prop('disabled', true);
                                $('#formDetail #txtAmountOfMoney').prop('disabled', true);
                                $('#formDetail #txtAmountPaidInAdvance').prop('disabled', true);
                                $('#formDetail #txtDebtAmount').prop('disabled', true);
                                jQuery(function () {
                                    $('#formDetail  #txtNumberOfSessions').number(true, 0);
                                    $('#formDetail  #txtAmountOfMoney').number(true, 0);
                                    $('#formDetail  #txtAmountPaidInAdvance').number(true, 0);
                                    $('#formDetail  #txtDebtAmount').number(true, 0);
                                    $('#formDetail  #txtAmountPaidInAdvance').number(true, 0);
                                    $('#formDetail  #txtRealOfMoney').number(true, 0);
                                });
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
    base.GetFormData = function () {
        var data = {};
        data.StudentId = $('#formDetail #txtStudentId').val();
        data.Code = $('#formDetail #txtCode').val();
        data.Name = $('#formDetail #txtName').val();
        data.ClassOfCourseId = $('#formDetail #txtClassOfCourseId').val();
        data.ClassId = $('#formDetail #txtClassId').val();
        data.CourseId = $('#formDetail #txtCourseId').val();
        data.NumberOfSessions = $('#formDetail #txtNumberOfSessions').val();
        data.AmountOfMoney = $('#formDetail #txtAmountOfMoney').val();
        data.AmountPaidInAdvance = $('#formDetail #txtAmountPaidInAdvance').val();
        data.RealOfMoney = $('#formDetail #txtRealOfMoney').val();
        data.DebtAmount = $('#formDetail #txtDebtAmount').val();
        data.AmountPaidInAdvance = $('#formDetail #txtAmountPaidInAdvance').val();
        data.Achievements = $('#formDetail #txtAchievements').val();
        data.OldClassOfCourseId = $('#formDetail #txtOldClassOfCourseId').val();
        return data;
    }
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/StudentExtend/Create";
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        $('table tr[data-index=' + i + '] .OpenEditItem').addClass('hidden');
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
        obj.CourseId = $('#txtCourseId').val();
        obj.ClassId = $('#txtClassId').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/StudentExtend/GetData",
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
        $('#txtCourseId').val('-1').trigger('change');
        $('#txtClassId').val('-1').trigger('change');
    });
    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        if (checkForm) {
            unit.SubmitServer("Add", 0);
        }
    });
    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        if (checkForm) {
            unit.SubmitServer("Add", 0);
        }
    });

    unit.$boxDetails.on('change', 'select#txtLearningPacakgeId', function () {
        $("#formDetail #txtClassOfCourseId").val($("#formDetail #txtLearningPacakgeId option:selected").attr("classofcourseId"));
        $("#formDetail #txtNumberOfSessions").val($("#formDetail #txtLearningPacakgeId option:selected").attr("numberofsession"));
        $("#formDetail #txtAmountOfMoney").val($("#formDetail #txtLearningPacakgeId option:selected").attr("amountofmonney"));

        $('#txtRealOfMoney').val(parseInt($("#formDetail #txtAmountOfMoney").val() - parseInt($("#formDetail #txtAmountPaidInAdvance").val())));
        $('#txtDebtAmount').val(parseInt($("#formDetail #txtAmountOfMoney").val()) - (parseInt($("#formDetail #txtAmountPaidInAdvance").val()) + parseInt($("#formDetail #txtRealOfMoney").val())));
    });

    unit.$boxDetails.on('change', 'select#txtClassId', function () {
        $("#formDetail #txtClassOfCourseId").val($("#formDetail #txtClassId option:selected").attr("classofcourseId"));
    });

    unit.$boxDetails.on('keyup', '#txtRealOfMoney', function (e) {
        $('#txtDebtAmount').val(parseInt($("#formDetail #txtAmountOfMoney").val()) - (parseInt($("#formDetail #txtAmountPaidInAdvance").val()) + parseInt($(e.target).val())));
    });
});

var checkForm = function () {
    var classId = $('#formDetail #txtClassId').val();
    var learningPackageId = $('#formDetail #txtLearningPacakgeId').val();

    if (classId === "") {
        Dialog.Alert("Vui lòng chọn lớp học", Dialog.Error);
        return false;
    }
    if (learningPackageId === "") {
        Dialog.Alert("Vui lòng chọn gói học", Dialog.Error);
        return false;
    }
    return true;
}