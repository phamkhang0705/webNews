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
                title: 'Ngày',
                field: 'LearningDate',
                align: "left",
                width: "100px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 2',
                field: 'Thu2',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 3',
                field: 'Thu3',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 4',
                field: 'Thu4',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 5',
                field: 'Thu5',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 6',
                field: 'Thu6',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thứ 7',
                field: 'Thu7',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chủ nhật',
                field: 'CN',
                align: "left",
                width: "150px",
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
        url: "/Admin/ScheduleList/GetData",
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
        window.location = '/ScheduleList/Export?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&StaffCode=' + $('#txtStaffCode').val() +
            '&StaffName=' + $('#txtStaffName').val() +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
});
