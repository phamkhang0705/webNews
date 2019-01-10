var offset = 0;
var limit = 0;

var $table = $('#table');

var $boxDetails = $('#box-detail');

$(document).ready(function () {
    $('#divDepreciationDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate).format("YYYY-MM");
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
        window.location = '/DepreciationReport/Export?' +
            'DepreciationDate=' + $('#txtFDate').val() +
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
        url: '/DepreciationReport/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    DepreciationDate: $('#txtFDate').val(),
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
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($table, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã tài sản',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên tài sản',
                valign: 'middle',
                align: 'center',
                width: '120px'
            },{
                field: 'CreateDate',
                title: 'Ngày mua',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value) {
                    return value!= null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm'): "";
                }
            }, {
                field: 'DepreciationDate',
                title: 'Ngày tính khấu hao',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value) {
                    return value!= null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm'): "";
                }
            }, {
                field: 'Quantity',
                title: 'Số lượng tài sản',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonthNumberDepreciation',
                title: 'Số tháng khấu hao',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonney',
                title: 'Tổng giá trị',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MoneyDeprecialtionPermonth',
                title: 'Số tiền khấu hao hàng tháng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneyDeprecialtion',
                title: 'Khấu hao lỹ kế(Tháng/năm tìm kiếm)',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMoneyResidual',
                title: 'Giá trị còn lại',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return value!=null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'): 0;
                }
            }
        ]]
    });
}