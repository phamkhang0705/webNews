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
                width: "250px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trình độ',
                field: 'StudentLevelName',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí',
                field: 'AmountOfMoney',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số buổi',
                field: 'NumberOfSessions',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số tháng học',
                field: 'NumberOfSchoolMonths',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày bắt đầu',
                field: 'FromDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày kết thúc',
                field: 'ToDate',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
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
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Tuition/GetData",
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
});