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
                title: 'Mã',
                field: 'Code',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'FullName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã giảng viên',
                field: 'Code',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số giờ giảng chính',
                field: 'MainTeachingTotalLearningMinute',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value / 60)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số giờ trợ giảng',
                field: 'Tutors1TotalLearningMinute',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    //(Tutors1TotalLearningMinute + Tutors2TotalLearningMinute + Tutors3TotalLearningMinute)/60
                    return (parseInt((row.Tutors1TotalLearningMinute + row.Tutors2TotalLearningMinute + row.Tutors3TotalLearningMinute) / 60)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số giờ dự giảng',
                field: 'NumberOfSessionLearning',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    //(AttendFacultyTeacher1TotalLearningMinute + AttendFacultyTeacher2TotalLearningMinute + AttendFacultyTeacher3TotalLearningMinute + AttendFacultyTeacher4TotalLearningMinute + AttendFacultyTeacher5TotalLearningMinute)/60
                    return (parseInt((row.AttendFacultyTeacher1TotalLearningMinute + row.AttendFacultyTeacher2TotalLearningMinute + row.AttendFacultyTeacher3TotalLearningMinute + row.AttendFacultyTeacher4TotalLearningMinute + row.AttendFacultyTeacher5TotalLearningMinute) / 60)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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
        obj.FromDate = $('#searchModal #txtFDate').parent().data("DateTimePicker").date();
        obj.ToDate = $('#searchModal #txtTDate').parent().data("DateTimePicker").date();
        obj.Code = $('#txtCode').val();
        obj.FullName = $('#txtFullName').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/StatisticTeachingMinute/GetData",
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
    });
});
