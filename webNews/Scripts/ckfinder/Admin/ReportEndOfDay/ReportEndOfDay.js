var offset = 0;
var limit = 0;

var $tablePayment = $('#tablePayment');
var $tableProduct = $('#tableProduct');
var $tableSale = $('#tableSale');
var branchCode = '';
function showTablePayment() {
    if ($('.rpPayment').hasClass('hidden')) {
        $('.rpPayment').removeClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
}
function showTableProduct() {
    if (!$('.rpPayment').hasClass('hidden')) {
        $('.rpPayment').addClass('hidden');
    }
    if ($('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').removeClass('hidden');
    }
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
}
function showTableSale() {
    if (!$('.rpPayment').hasClass('hidden')) {
        $('.rpPayment').addClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if ($('.rpSale').hasClass('hidden')) {
        $('.rpSale').removeClass('hidden');
    }
}
$(document).ready(function () {
    $('#divDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);

    if ($('#txtType').val() == "1") {
        showTablePayment();
    }
    if ($('#txtType').val() == "2") {
        showTableProduct();
    }
    if ($('#txtType').val() == "3") {
        showTableSale();
    }

    $('#btnSearch').on('click', function () {
        if ($('#txtType').val() == "1") {
            $tablePayment.bootstrapTable('refresh');
        }
        if ($('#txtType').val() == "2") {
            $tableProduct.bootstrapTable('refresh');
        }
        if ($('#txtType').val() == "3") {
            $tableSale.bootstrapTable('refresh');
        }
    });

    $('#txtType').on('change', function () {
        if ($('#txtType').val() == "1") {
            showTablePayment();
            $tablePayment.bootstrapTable('refresh');
        }
        if ($('#txtType').val() == "2") {
            showTableProduct();
            $tableProduct.bootstrapTable('refresh');
        }
        if ($('#txtType').val() == "3") {
            showTableSale();
            $tableSale.bootstrapTable('refresh');
        }
    });

    $('#txtBranchCode').on('change', function () {
        branchCode = '';
        if ($('#txtBranchCode').val() != null) {
            for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
                branchCode += $('#txtBranchCode').val()[i] + ',';
            }
        }
    });

    $tablePayment.bootstrapTable({
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
        url: '/ReportEndOfDay/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    ReportDate: $('#txtDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: $('#txtType').val()
                }
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($tablePayment, index);
                }
            }, {
                field: 'Payments_Code',
                title: 'Mã phiếu thu/chi',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'Person_Name',
                title: 'Người nộp/nhận',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'Payments_TotalMoney',
                title: 'Thu/Chi',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Payments_CreatDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'InvoiceCode',
                title: 'Mã chứng từ',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }
        ]
    });

    $tableProduct.bootstrapTable({
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
        url: '/ReportEndOfDay/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    ReportDate: $('#txtDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: $('#txtType').val()
                }
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($tableProduct, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'BranchName',
                title: 'Chi nhánh',
                valign: 'middle',
                align: 'right',
                width: '120px',
            }, {
                field: 'QuantityInstock',
                title: 'SL bán',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                field: 'TotalMonneySale',
                title: 'Giá trị bán',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalQuantityReturn',
                title: 'SL trả',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMoneyReturn',
                title: 'Giá trị trả',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonney',
                title: 'Doanh thu thuần',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });

    $tableSale.bootstrapTable({
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
        url: '/ReportEndOfDay/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    ReportDate: $('#txtDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: $('#txtType').val()
                }
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($tableSale, index);
                }
            }, {
                field: 'Code',
                title: 'Mã chứng từ',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'CreateDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'TotalQuantity',
                title: 'Số lượng hàng hoá',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMonney',
                title: 'Doanh thu',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'OtherMonney',
                title: 'Thu khác',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'PaidMonney',
                title: 'Thực thu',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });

    $('#btnExportExcel').on('click', function () {
        if ($('#txtType').val() == "1") {
            var dataTable = $tablePayment.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if ($('#txtType').val() == "2") {
            var dataTable = $tableProduct.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if ($('#txtType').val() == "3") {
            var dataTable = $tableSale.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }

        var branchCode = '';
        if ($('#txtBranchCode').val() != null) {
            for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
                branchCode += $('#txtBranchCode').val()[i] + ',';
            }
        }
        window.location = '/ReportEndOfDay/ExportExcel?' +
            'ReportDate=' + $('#txtDate').val() +
            '&Type=' + $('#txtType').val() +
            '&BranchCode=' + branchCode +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
});