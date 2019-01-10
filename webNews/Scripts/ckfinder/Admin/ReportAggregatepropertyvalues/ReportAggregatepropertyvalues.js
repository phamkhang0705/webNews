var offset = 0;
var limit = 0;

var $table = $('#table');

var $boxDetails = $('#box-detail');

$(document).ready(function () {
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#btnSearch').on('click', function () {
        //$('#txtTDate').rules('add', {
        //    required: true,
        //    messages: {
        //        required: 'Bạn phải nhập/ chọn ngày để tìm kiếm',
        //    }
        //});

        //$('#txtFDate').rules('add', {
        //    required: true,
        //    beetwenTime: '#txtTDate',
        //    //LimitTime: '#txtTDate',
        //    messages: {
        //        required: 'Bạn phải nhập/ chọn ngày để tìm kiếm',
        //        beetwenTime: 'Từ ngày phải nhỏ hơn hoặc bằng đến ngày.'
        //    }
        //});
        if (!$('#frmAction').valid()) return;
        $table.bootstrapTable("refresh");
    });

    $('#btnExportExcel').on('click', function () {
            var dataTable = $table.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        window.location = '/ReportAggregatepropertyvalues/Export?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
    initTable();
    jQuery.validator.addMethod("nulldate", function (value, element, params) {
        if (value.length == 0)
            return false;
        return true;
    }, 'Từ ngày phải nhỏ hơn hoặc bằng đến ngày, vui lòng kiểm tra lại');

    jQuery.validator.addMethod("beetwenTime", function (value, element, params) {
        if ($("#txtTDate").val().length > 0) {
            var formDateTime = moment($(params).parent().data("DateTimePicker").date(), 'MM/DD/YYYY HH:mm');
            var toDateTime = moment($(element).parent().data("DateTimePicker").date(), 'MM/DD/YYYY HH:mm');
            var diff = parseInt(toDateTime) - parseInt(formDateTime);

            return toDateTime.diff(formDateTime, 'days') <= 0;
        }
        return true;
    }, 'Từ ngày phải nhỏ hơn hoặc bằng đến ngày, vui lòng kiểm tra lại');
});

var initTable = function () {
    $table.bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 10,
        pageList: [10, 15, 20, 30, 50, 100],
        paginationFirstText: 'Trang đầu',
        paginationPreText: 'Trước',
        paginationNextText: 'Sau',
        paginationLastText: 'Trang cuối',
        showHeader: true,
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Tổng:' + totalRows;
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'Hiển thị ' + pageNumber + ' dòng trên trang';
        },
        formatNoMatches: function () {
            return 'Không tìm thấy dữ liệu theo điều kiện tìm kiếm. Vui lòng thử lại';
        },
        method: 'post',
        sidePagination: 'server',
        url: '/ReportAggregatepropertyvalues/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').val(),
                    ToDate: $('#txtTDate').val()
                }
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [[
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                rowspan: '2',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($table, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã tài sản',
                valign: 'middle',
                align: 'center',
                rowspan: '2',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên tài sản',
                valign: 'middle',
                align: 'center',
                rowspan: '2',
                width: '120px'
            }, {
                colspan: 2,
                width: '360px',
                title: "Tài sản đã mua"
            }, {
                colspan: 2,
                width: '360px',
                title: "Tài sản đã ngưng"
            }, {
                colspan: 2,
                width: '360px',
                title: "Khấu hao tài sản"
            }, {
                colspan: 2,
                width: '360px',
                title: "Thanh lý tài sản"
            }, {
                colspan: 2,
                width: '360px',
                title: "Giá trị tài sản còn lại"
            }], [{
                field: 'SumMoneyInput',
                title: 'Tổng tiền',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityInput',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneySupend',
                title: 'Tổng tiền',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantitySunpend',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneyDepreciation',
                title: 'Tổng tiền',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityDepreciation',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneyLiquidation',
                title: 'Tổng tiền',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityLiquidation',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneyActive',
                title: 'Tổng tiền',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityActive',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]]
    });
}