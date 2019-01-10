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
                field: 'Code',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'FullName',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày tham gia',
                field: 'CreateDate',
                align: "left",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày mua gần đây nhất',
                field: 'LastModifyDate',
                align: "right",
                width: "170px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY') : '';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tích điểm mua khóa học',
                field: 'TuitionCore',
                align: "right",
                width: "170px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tích điểm mua khóa học',
                field: 'SaleCore',
                align: "right",
                width: "170px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số điểm đã sử dụng',
                field: 'UseCore',
                align: "right",
                width: "170px",
                formatter: function (value, row) {
                    return parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    if (value == 1) { return 'Hoạt động' } else { return 'Ngừng hoạt động' }
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
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Vourcher/GetData",
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
});
