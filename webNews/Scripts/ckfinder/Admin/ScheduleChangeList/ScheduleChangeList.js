var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$searchModal = $("#searchModal");
    this.$btnSearch = $("#btnSearch");
    base.$boxDetails = $("#box-detail");
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
                title: 'Ngày',
                field: 'LearningDate',
                align: "center",
                width: "100px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 2',
                field: 'Thu2',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 3',
                field: 'Thu3',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 4',
                field: 'Thu4',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 5',
                field: 'Thu5',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 6',
                field: 'Thu6',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 7',
                field: 'Thu7',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chủ nhật',
                field: 'CN',
                align: "center",
                width: "150px",
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Dạy thay'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/ScheduleChangeList/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
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
            url: "/Admin/ScheduleChangeList/GetData",
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
        var url = "/ScheduleChangeList/Create";
        if (action == "Edit") {
            url = "/ScheduleChangeList/Update";
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
        obj.FromDate = $('#txtFDate').parent().data("DateTimePicker").date();
        obj.ToDate = $('#txtTDate').parent().data("DateTimePicker").date();
        obj.StaffName = $('#txtStaffName').val();
        obj.StaffCode = $('#txtStaffCode').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    $('#divFromDate').data("DateTimePicker").date(Sv.SetMinDateMaxDate().FirstDay);
    $('#divToDate').data("DateTimePicker").date(Sv.SetMinDateMaxDate().LastDay);
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));

    unit.$btnSearch.click(function () {
        unit.LoadTableSearch();
    });

    $('#btnExportExcel').on('click', function () {
        var dataTable = unit.$table.bootstrapTable('getData');
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }
        window.location = '/ScheduleChangeList/Export?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&StaffCode=' + $('#txtStaffCode').val() +
            '&StaffName=' + $('#txtStaffName').val() +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        unit.SubmitServer("Add", 0);
    });
    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });
    unit.$boxDetails.on('change', 'v#txtTeacher', function (e) {
        e.preventDefault();
        CheckTeacher();
    });
    unit.$boxDetails.on('change', '#formDetail #txtTutor1', function (e) {
        e.preventDefault();
        CheckTutors1();
    });
    unit.$boxDetails.on('change', '#formDetail #txtTutor2', function (e) {
        e.preventDefault();
        CheckTutors2();
    });
    unit.$boxDetails.on('change', '#formDetail #txtTutor3', function (e) {
        e.preventDefault();
        CheckTutors3();
    });
});

function CheckTeacher() {
    var teacherId = $("#formDetail #txtTeacher :selected").val();
    var tutors1Id = $("#formDetail #txtTutor1 :selected").val();
    if (teacherId == tutors1Id) {
        Dialog.Alert($("#formDetail #txtTeacher :selected").text() + " đang được chọn làm trợ giảng 1", Dialog.Error);
        $("#formDetail #txtTeacher").val('');
        return;
    }
    var tutors2Id = $("#formDetail #txtTutor2 :selected").val();
    if (teacherId == tutors2Id && tutors2Id != '') {
        Dialog.Alert($("#formDetail #txtTeacher :selected").text() + " đang được chọn làm trợ giảng 2", Dialog.Error);
        $("#formDetail #txtTeacher").val('');
        return;
    }
    var tutors3Id = $("#formDetail #txtTutor3 :selected").val();
    if (teacherId == tutors3Id && tutors3Id != '') {
        Dialog.Alert($("#formDetail #txtTeacher :selected").text() + " đang được chọn làm trợ giảng 3", Dialog.Error);
        $("#formDetail #txtTeacher").val('');
        return;
    }
}

function CheckTutors1() {
    var teacherId = $("#formDetail #txtTeacher :selected").val();
    var tutors1Id = $("#formDetail #txtTutor1 :selected").val();
    if (teacherId == tutors1Id && tutors1Id != '') {

        Dialog.Alert($("#formDetail #txtTutor1 :selected").text() + " đang được chọn làm giáo viên chính dạy thay",
            Dialog.Error);
        $("#formDetail #txtTutor1").val('');
        return;
    }
    var tutors2Id = $("#formDetail #txtTutor2 :selected").val();
    if (tutors1Id == tutors2Id && tutors2Id != '') {

        Dialog.Alert($("#formDetail #txtTutor1 :selected").html() + " đang được chọn làm trợ giảng 2 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor1").val('');
        return;
    }
    var tutors3Id = $("#formDetail #txtTutor3 :selected").val();
    if (tutors1Id == tutors3Id && tutors3Id != '') {

        Dialog.Alert($("#formDetail #txtTutor1 :selected").text() + " đang được chọn làm trợ giảng 3 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor1").val('');
        return;
    }
}

function CheckTutors2() {
    var teacherId = $("#formDetail #txtTeacher :selected").val();
    var tutors2Id = $("#formDetail #txtTutor2 :selected").val();
    var tutors1Id = $("#formDetail #txtTutor1 :selected").val();
    if (tutors2Id == teacherId && teacherId != '') {

        Dialog.Alert($("#formDetail #txtTutor2 :selected").text() + " đang được chọn làm giáo viên chính dạy thay", Dialog.Error);
        $("#formDetail #txtTutor2").val('');
        return;
    }

    if (tutors2Id == tutors1Id && tutors1Id != '') {

        Dialog.Alert($("#formDetail #txtTutor2 :selected").text() + " đang được chọn làm trợ giảng 2 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor2").val('');
        return;
    }
    var tutors3Id = $("#formDetail #txtTutor3 :selected").val();
    if (tutors2Id == tutors3Id && tutors3Id != '') {

        Dialog.Alert($("#formDetail #txtTutor2 :selected").text() + " đang được chọn làm trợ giảng 3 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor2").val('');
        return;
    }
}
function CheckTutors3() {
    var teacherId = $("#formDetail #txtTeacher :selected").val();
    var tutors2Id = $("#formDetail #txtTutor2 :selected").val();
    var tutors1Id = $("#formDetail #txtTutor1 :selected").val();
    var tutors3Id = $("#formDetail #txtTutor3 :selected").val();
    if (tutors3Id == teacherId && teacherId != '') {
        Dialog.Alert($("#formDetail #txtTutor3 :selected").text() + " đang được chọn làm giáo viên chính dạy thay", Dialog.Error);
        $("#formDetail #txtTutor3").val('');
        return;
    }

    if (tutors3Id == tutors1Id && tutors1Id != '') {

        Dialog.Alert($("#formDetail #txtTutor3 :selected").text() + " đang được chọn làm trợ giảng 1 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor3").val('');
        return;
    }

    if (tutors3Id == tutors2Id && tutors2Id != '') {

        Dialog.Alert($("#formDetail #txtTutor3 :selected").text() + " đang được chọn làm trợ giảng 2 dạy thay", Dialog.Error);
        $("#formDetail #txtTutor3").val('');
        return;
    }
}