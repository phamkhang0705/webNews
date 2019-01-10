var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$searchModal = $("#searchModal");
    this.$btnSearch = $("#btnSearch");
    base.$boxDetails = $("#box-detail");

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
                field: 'StudentCode',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'StudentName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí',
                field: 'SumMoney',
                align: "right",
                width: "100px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí đã đóng',
                field: 'RealOfMoney',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí ứng trước',
                field: 'AmountPaidInAdvance',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Học phí hoàn trả',
                field: 'ReturnAmountMoney',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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
        obj.FromDate = $('#txtFDate').parent().data("DateTimePicker").date();
        obj.ToDate = $('#txtTDate').parent().data("DateTimePicker").date();
        obj.CourseId = $('#txtCourseId').val();
        obj.ClassId = $('#txtClassId').val();
        obj.Type = $('#txtStatisticType').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/StatisticPayTutitionToClass/GetData",
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
        window.location = '/StatisticPayTutitionToClass/Export?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&CourseId=' + $('#txtCourseId').val() +
            '&ClassId=' + $('#txtClassId').val() +
            '&Type=' + $('#txtStatisticType').val() +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
});
