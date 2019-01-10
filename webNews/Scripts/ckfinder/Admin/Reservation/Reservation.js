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
                title: 'Cấp độ',
                field: 'CourseName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lớp học',
                field: 'ClassName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã học viên',
                field: 'Code',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'Name',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tổng số buổi học',
                field: 'NumberOfSessions',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số buổi còn lại',
                field: 'RemainingNumberOfSessions',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số buổi đã học',
                field: 'NumberOfSessionLearning',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày bảo lưu',
                field: 'ReservationDate',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lý do',
                field: 'ReservationReson',
                align: "left",
                width: "100px"
            })
            //, Sv.BootstrapTableColumn("String", {
            //    title: "Thao tác",
            //    align: "Center",
            //    width: '80px',
            //    formatter: function (value, data, index) {//
            //        var str = "";
            //        if (base.$perEdit == 1) {
            //            str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
            //        }
            //        return str;
            //    },
            //    events: {
            //        'click .OpenEditItem': function (e, value, row, index) {
            //            Sv.ChecPermission("View", function () {
            //                var url = "/Admin/Reservation/ShowModal";
            //                var model = {
            //                    id: row.Id, action: "Edit"
            //                };
            //                Sv.BindPopup(url, model, function (rs) {
            //                    base.$boxDetails.html(rs);
            //                    base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            //                });
            //            });
            //        }
            //    }
            //})
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
        data.Id = $('#formDetail #txtId').val();
        data.RemainingNumberOfSessions = $('#formDetail #txtRemainingNumberOfSessions').val();
        data.ClassOfCourseId = $('#formDetail #txtClassOfCourseId').val();
        data.CourseId = $('#formDetail #txtCourseId').val();
        data.ClassId = $('#formDetail #txtClassId').val();
        data.ReservationReson = $('#formDetail #txtReservationReson').val();
        return data;
    }
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/Reservation/Update";
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
        obj.Code = $('#txtCode').val();
        obj.FullName = $('#txtFullName').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Reservation/GetData",
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
        $('#txtSalaryStandardId').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Reservation/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divReservationDate'), new Date());
            $("#formDetail #txtNumberOfSessions").prop('disabled', true);
            $("#formDetail #txtNumberOfSessionLearning").prop('disabled', true);
            $("#formDetail #txtRemainingNumberOfSessions").prop('disabled', true);
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
        getClassByCourse($('#formDetail ').find('select#txtCourseId').val(), '#formDetail  #txtClassId', true);
    });
    unit.$boxDetails.on('change', 'select#txtClassId', function () {
        getStudentByCourseAndClass($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtStudentId', true);
    });
    unit.$boxDetails.on('change', 'select#txtStudentId', function () {
        $("#formDetail #txtNumberOfSessions").val($("#formDetail #txtStudentId option:selected").attr("numberofsessions"));
        $("#formDetail #txtNumberOfSessionLearning").val($("#formDetail #txtStudentId option:selected").attr("numberofsessionlearning"));
        $("#formDetail #txtRemainingNumberOfSessions").val($("#formDetail #txtStudentId option:selected").attr("remainingnumberofsessions"));
        $("#formDetail #txtId").val($("#formDetail #txtStudentId option:selected").attr("id"));
    });
});

var getClassByCourse = function (courseId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/Reservation/GetClassByCourse',
        Data: { courseId: courseId }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Chọn lớp học</option>');
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

        getStudentByCourseAndClass($('#formDetail').find('select#txtCourseId').val(), $('#formDetail').find('select#txtClassId').val(), '#formDetail #txtStudentId', true);
        $("#formDetail #txtClassOfCourseId").val($("#formDetail #txtClassId option:selected").attr("classofcourseid"));
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}
var getStudentByCourseAndClass = function (courseId, classId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/Reservation/GetStudents',
        Data: {
            courseId: courseId,
            classId: classId
        }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Chọn học viên</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' + value.StudentId + '" ' +
                        'numberofsessions = "' + value.NumberOfSessions + '" ' +
                        'numberofsessionlearning="' + value.NumberOfSessionLearning + '" ' +
                        'id="' + value.Id + '" ' +
                        'remainingnumberofsessions = "' + value.RemainingNumberOfSessions + '">' + value.Name + '</option>');

                });
        $("#formDetail #txtNumberOfSessions").val($("#formDetail #txtStudentId option:selected").attr("numberofsessions"));
        $("#formDetail #txtNumberOfSessionLearning").val($("#formDetail #txtStudentId option:selected").attr("numberofsessionlearning"));
        $("#formDetail #txtRemainingNumberOfSessions").val($("#formDetail #txtStudentId option:selected").attr("remainingnumberofsessions"));
        $("#formDetail #txtId").val($("#formDetail #txtStudentId option:selected").attr("id"));
    },
        function (error) {
            Dialog.Alert('Tải danh sách học viên thất bại', Dialog.Error);
        });
}