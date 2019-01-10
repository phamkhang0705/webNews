var listStudent = '';
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
                title: 'Thứ',
                field: 'DayOfWeek',
                align: "left",
                width: "100px",
                formatter: function (value, row) {
                    return "Thứ " + value + ": " + (row.CreateDate != null ? moment(new Date(parseInt(row.CreateDate.slice(6, -2)))).format('DD/MM/YYYY') : "");
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ca học',
                field: 'StudySessionName',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Môn học',
                field: 'SubjectName',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tiết học theo CTDT',
                field: 'LessonOfEducationProgram',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Danh sách học sinh nghỉ học',
                field: 'ListStudentName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên bài, nội dung bài học',
                field: 'LessonDetail',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhận xét của giáo viên về tiết học',
                field: 'TearcherComent',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Xếp loại tiết học',
                field: 'ClassRating',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Giáo viên',
                field: 'TeacherName',
                align: "left",
                width: "100px",
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
                            var url = "/Admin/LessonRecordBook/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });

                                $('#formDetail #txtCourseId').val(row.CourseId).trigger("change");
                                $('#formDetail #txtClassId').val(row.ClassId).trigger("change");
                                $('#formDetail #txtEducationId').val(row.EducationId).trigger("change");
                                $('#formDetail #txtSubjectId').val(row.SubjectId).trigger("change");
                                $('#formDetail #txtListStudentIdLeave').select2();
                                $('#formDetail #txtLessonDetail').val(row.LessonDetail).trigger("change");
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
        var data = {};
        data.Id = $('#formDetail input[name="Id"]').val();
        data.ClassOfCourseId = $('#formDetail input[name="ClassOfCourseId"]').val();
        data.LessonOfEducationProgram = $('#formDetail #txtLessonOfEducationProgram').val();
        data.SubjectId = $('#formDetail #txtSubjectId').val();
        data.DayOfWeek = $('#formDetail #txtDayOfWeek').val();
        data.LessonDetail = $('#formDetail #txtLessonDetail').val();
        data.StudySessionId = $('#formDetail #txtStudySessionId').val();
        data.LessonOfEducationProgram = $('#formDetail #txtLessonOfEducationProgram').val();
        data.ClassRating = $('#formDetail #txtClassRating').val();
        data.TearcherComent = $('#formDetail #txtTearcherComent').val();
        data.TeacherId = $('#formDetail #txtTeacherId').val();
        data.TutorsId = $('#formDetail #txtTutorsId').val();
        var listStudent = '';
        if ($('#formDetail #txtListStudentIdLeave').val() != null) {
            for (var i = 0; i < $('#formDetail #txtListStudentIdLeave').val().length; i++) {
                listStudent += $('#formDetail #txtListStudentIdLeave').val()[i] + ',';
            }
        }
        data.ListStudentIdLeave = listStudent;
        data.EducationId = $('#formDetail #txtEducationId').val();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/LessonRecordBook/Create";
        if (action == "Edit") {
            url = "/LessonRecordBook/Update";
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
        url: "/Admin/LessonRecordBook/GetData",
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
        var url = "/Admin/LessonRecordBook/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            $('#formDetail #txtListStudentIdLeave').select2();
            $('#formDetail #txtListStudentIdLeave').val('-1').select2();
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
    unit.$boxDetails.on('change', 'select#txtCourseId', function () {
        getClassByCourse($('#formDetail ').find('select#txtCourseId').val(), '#formDetail  #txtClassId', false);
    });
    unit.$boxDetails.on('change', 'select#txtClassId', function () {
        getEducation($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtEducationId', false);
        getStudentByCourseAndClass($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtListStudentIdLeave', false);
    });
    unit.$boxDetails.on('change', 'select#txtEducationId', function () {
        getSubjectByCourseAndClass($('#formDetail ').find('select#txtEducationId').val(), '#formDetail #txtSubjectId', false);
    });
    unit.$boxDetails.on('change', 'select#txtListStudentIdLeave', function () {
        listStudent = '';
        if ($('#txtListStudentIdLeave').val() != null) {
            for (var i = 0; i < $('#txtListStudentIdLeave').val().length; i++) {
                listStudent += $('#txtListStudentIdLeave').val()[i] + ',';
            }
        }
    });
});

var getClassByCourse = function (courseId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/LessonRecordBook/GetClassByCourse',
        Data: { courseId: courseId }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' +
                        value.Id +
                        '" classofcourseid="' + value.Id + '">' +
                        value.Name +
                        '</option>');
                });
        $("#formDetail #txtClassId").trigger("change");

        getEducation($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtEducationId', false);
        getStudentByCourseAndClass($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtListStudentIdLeave', false);
        $("#formDetail #txtClassOfCourseId").val($("#formDetail #txtClassId option:selected").attr("classofcourseid"));
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}
var getEducation = function (courseId, classId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/LessonRecordBook/GetEducations',
        Data: { courseId: courseId, classId: classId }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' +
                        value.Id +
                        '">' +
                        value.Name +
                        '</option>');
                });
        $("formDetail #txtEducationId").trigger("change");
        getSubjectByCourseAndClass($('#formDetail ').find('select#txtEducationId').val(), '#formDetail #txtSubjectId', false);
        getInfoBySubject();
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}
var getSubjectByCourseAndClass = function (educationId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/LessonRecordBook/GetSubjects',
        Data: { educationId: educationId }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' + value.Id + '" dayofweek = "' + value.LearningDayofWeek + '" studysession = "' + value.StudySessionId + '" studysessionname = "' + value.StudySessionName + '">' + value.Name + '</option>');
                });

        $("#formDetail #txtSubjectId").trigger("change");
        getInfoBySubject();
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}
var getStudentByCourseAndClass = function (courseId, classId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/LessonRecordBook/GetStudents',
        Data: {
            courseId: courseId,
            classId: classId
        }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' + value.Id + '">' + value.Name + '</option>');
                });

        $("#formDetail #txtSubjectId").trigger("change");
        getInfoBySubject();
    },
        function (error) {
            Dialog.Alert('Tải danh sách học viên thất bại', Dialog.Error);
        });
}
var getInfoBySubject = function () {
    $('#formDetail #txtStudySessionId').val($('#formDetail #txtEducationId').attr('studysessionname')).addClass('disabled');
    $('#formDetail #txtDayOfWeek').val($('#formDetail #txtEducationId').attr('dayofweek')).addClass('disabled');
}