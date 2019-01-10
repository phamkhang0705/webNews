var offset = 0;
var limit = 0;

var $tableSale = $('#tableSale');
var $tableRemove = $('#tableRemove');
var $tableIOStock = $('#tableIOStock');
var $tableIOStock2 = $('#tableIOStock2');
var $tableCustom = $('#tableCustom');
var $tableProfit = $('#tableProfit');
var $tableProvider = $('#tableProvider');

var $tableProfitDetail = $('#tableProfitDetail');
var $tableIOStockDetail = $('#tableIOStockDetail');
var $tableIOStockDetail2 = $('#tableIOStockDetail2');
var $tableCustomDetail = $('#tableBranchDetail');

var branchCode = '';
var type = '';
var $boxDetails = $('#box-detail');

function showTableSale() {
    if ($('.rpSale').hasClass('hidden')) {
        $('.rpSale').removeClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableProfit() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if ($('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').removeClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableRemove() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if ($('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').removeClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableIOStock() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if ($('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').removeClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableIOStock2() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if ($('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').removeClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableCustom() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if ($('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').removeClass('hidden');
    }
    if (!$('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').addClass('hidden');
    }
}
function showTableProvider() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpRemove').hasClass('hidden')) {
        $('.rpRemove').addClass('hidden');
    }
    if (!$('.rpIOStock').hasClass('hidden')) {
        $('.rpIOStock').addClass('hidden');
    }
    if (!$('.rpIOStock2').hasClass('hidden')) {
        $('.rpIOStock2').addClass('hidden');
    }
    if (!$('.rpCustom').hasClass('hidden')) {
        $('.rpCustom').addClass('hidden');
    }
    if ($('.rpProvider').hasClass('hidden')) {
        $('.rpProvider').removeClass('hidden');
    }
}
var loadTable = function () {
    if (type == "1") {
        showTableSale();
        $tableSale.bootstrapTable("refresh");
    }
    if (type == "2") {
        showTableProfit();
        $tableProfit.bootstrapTable("refresh");
    }
    if (type == "3") {
        showTableRemove();
        $tableRemove.bootstrapTable("refresh");
    }
    if (type == "4") {
        showTableIOStock();
        $tableIOStock.bootstrapTable("refresh");
    }
    if (type == "5") {
        showTableIOStock2();
        $tableIOStock2.bootstrapTable("refresh");
    }
    if (type == "6") {
        showTableCustom();
        $tableCustom.bootstrapTable("refresh");
    }
    if (type == "7") {
        showTableProvider();
        $tableProvider.bootstrapTable("refresh");
    }
}
$(document).ready(function () {
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    type = $('#txtType').val();
    loadTable();

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

        if (type == "1") {
            $tableSale.bootstrapTable("refresh");
        }
        if (type == "2") {
            $tableProfit.bootstrapTable("refresh");
        }
        if (type == "3") {
            $tableRemove.bootstrapTable("refresh");
        }
        if (type == "4") {
            $tableIOStock.bootstrapTable("refresh");
        }
        if (type == "5") {
            $tableIOStock2.bootstrapTable("refresh");
        }
        if (type == "6") {
            $tableCustom.bootstrapTable("refresh");
        }
        if (type == "7") {
            $tableProvider.bootstrapTable("refresh");
        }
    });

    $('#txtType').on('change', function () {
        type = $(this).val();
        loadTable();
    });

    $('#txtBranchCode').on('change', function () {
        branchCode = '';
        if ($('#txtBranchCode').val() != null) {
            for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
                branchCode += $('#txtBranchCode').val()[i] + ',';
            }
        }
    });

    $('#btnExportExcel').on('click', function () {
        var dataTable = [];
        if (type == "1") {
            dataTable = $tableSale.bootstrapTable('getData');
        }
        if (type == "2") {
            dataTable = $tableProfit.bootstrapTable('getData');
        }
        if (type == "3") {
            dataTable = $tableRemove.bootstrapTable('getData');
        }
        if (type == "4") {
            dataTable = $tableIOStock.bootstrapTable('getData');
        }
        if (type == "5") {
            dataTable = $tableIOStock2.bootstrapTable('getData');
        }
        if (type == "6") {
            dataTable = $tableCustom.bootstrapTable('getData');
        }
        if (type == "7") {
            dataTable = $tableProvider.bootstrapTable('getData');
        }
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }
        //var branchCode = '';
        //if ($('#txtBranchCode').val() != null) {
        //    for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
        //        branchCode += $('#txtBranchCode').val()[i] + ',';
        //    }
        //}
        window.location = '/ReportProduct/ExportExcel?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&Type=' + type +
            '&BranchCode=' + branchCode +
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

var initTableDetail = function (model) {
    if (model.type == "4") {
        var $tableIOStockDetail = $('#tableIOStockDetail');
        $tableIOStockDetail.bootstrapTable({
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
            url: '/ReportProduct/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').val(),
                        ToDate: $('#txtTDate').val(),
                        BranchCode: branchCode,
                        Type: type,
                        Code: model.Code
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
                        return Sv.BootstrapTableSTT($tableIOStockDetail, index);
                    }
                }, {
                    field: 'BranchName',
                    title: 'Chi nhánh',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'BeginInventory',
                    title: 'Tồn đầu kỳ',
                    valign: 'middle',
                    align: 'center',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'BeginTotalMonney',
                    title: 'Giá trị đầu kỳ',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalQuantityInput',
                    title: 'SL nhập',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalMonneyInput',
                    title: 'Giá trị nhập',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalQuantityOutput',
                    title: 'SL xuất',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalMonneyOutput',
                    title: 'Giá trị xuất',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'EndInventory',
                    title: 'Tồn cuối kỳ',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'EndTotalMonney',
                    title: 'Giá trị cuối kỳ',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }
            ]
        });
    }
    if (model.type == "5") {
        var $tableIOStock2Detail = $('#tableIOStockDetail2');
        $tableIOStock2Detail.bootstrapTable({
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
            url: '/ReportProduct/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').val(),
                        ToDate: $('#txtTDate').val(),
                        BranchCode: branchCode,
                        Type: type,
                        Code: model.Code
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
                        return Sv.BootstrapTableSTT($tableIOStock2Detail, index);
                    }
                }, {
                    field: 'BranchName',
                    title: 'Chi nhánh',
                    valign: 'middle',
                    align: 'center',
                    rowspan: '2',
                    width: '120px'
                }, {
                    field: 'BeginInventory',
                    title: 'Tồn đầu kỳ',
                    valign: 'middle',
                    align: 'center',
                    rowspan: '2',
                    width: '120px'
                }, {
                    field: 'BeginTotalMonney',
                    title: 'Giá trị đầu kỳ',
                    valign: 'middle',
                    align: 'center',
                    rowspan: '2',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    colspan: 4,
                    width: '360px',
                    title: "NHẬP"
                }, {
                    colspan: 5,
                    width: '500px',
                    title: "XUẤT"
                }, {
                    field: 'EndInventory',
                    title: 'Tồn cuối kỳ',
                    valign: 'middle',
                    align: 'right',
                    rowspan: '2',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'EndTotalMonney',
                    title: 'Giá trị cuối kỳ',
                    valign: 'middle',
                    align: 'right',
                    rowspan: '2',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }], [{
                    field: 'TotalQuantityInput',
                    title: 'NCC',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'BalacingQuantityInput',
                    title: 'Kiểm kho',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'ReturnQuantityInput',
                    title: 'Trả',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TranferQuantityInput',
                    title: 'Chuyển',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                },{
                    field: 'TotalQuantityOutput',
                    title: 'Bán',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'RemoveQuantityOutput',
                    title: 'Huỷ',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'ReturnQuantityOutput',
                    title: 'Trả',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'BalancingQuantityOutput',
                    title: 'Kiểm kho',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TranferQuantityOutput',
                    title: 'Chuyển',
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
    if (model.type == "6") {
        var $tableCustomDetail = $('#tableCustomDetail');
        $tableCustomDetail.bootstrapTable({
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
            url: '/ReportProduct/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').val(),
                        ToDate: $('#txtTDate').val(),
                        BranchCode: branchCode,
                        Type: type,
                        Code: model.Code
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
                        return Sv.BootstrapTableSTT($tableCustomDetail, index);
                    }
                }, {
                    field: 'CustomerCode',
                    title: 'Mã khách hàng',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'CustomerName',
                    title: 'Tê khách hàng',
                    align: 'right',
                    valign: 'middle',
                    width: '150px'
                }, {
                    field: 'QuantityBuy',
                    title: 'Số lượng mua',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalMonney',
                    title: 'Giá trị',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }
            ]
        });
    }
    if (model.type == "7") {
        var $tableProviderDetail = $('#tableProviderDetail');
        $tableProviderDetail.bootstrapTable({
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
            url: '/ReportProduct/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').val(),
                        ToDate: $('#txtTDate').val(),
                        BranchCode: branchCode,
                        Type: type,
                        Code: model.Code
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
                        return Sv.BootstrapTableSTT($tableProviderDetail, index);
                    }
                }, {
                    field: 'ProviderCode',
                    title: 'Mã NCC',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'ProviderName',
                    title: 'Tên NCC',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'TotalMonney',
                    title: 'Số lượng',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'QuantityBuy',
                    title: 'Giá trị',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }
            ]
        });
    }
}
var initTable = function () {
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'BranchName',
                title: 'Chi nhánh',
                align: 'right',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'TotalQuantity',
                title: 'Sl bán',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
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
    $tableProfit.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableProfit, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px',
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'TotalQuantitySale',
                title: 'SL bán',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneySale',
                title: 'Doanh thu',
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
                field: 'TotalMonneyReturn',
                title: 'Giá trị trả',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                field: 'TotalMonney',
                title: 'Doanh thu thuần',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'totalMonneySource',
                title: 'Tổng vốn',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Profit',
                title: 'Lợi nhuận',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'PercentProfit',
                title: 'Tỷ suất',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });
    $tableRemove.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableRemove, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'Code',
                title: 'Mã phiếu',
                align: 'center',
                valign: 'middle',
                width: '150px'
            },
            {
                field: 'CreateDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : '';
                }
            },
            {
                field: 'TotalProduct',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonney',
                title: 'Giá trị',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });
    $tableIOStock.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableIOStock, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                align: 'right',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'BeginInventory',
                title: 'Tồn đầu kỳ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalQuantityInput',
                title: 'SL nhập',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyInput',
                title: 'Giá trị nhập',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalQuantityOutput',
                title: 'SL xuất',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyOutput',
                title: 'Giá trị xuất',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'EndInventory',
                title: 'Tồn cuối kỳ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'EndTotalMonney',
                title: 'Giá trị cuối kỳ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                title: 'Chi tiết',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function () {
                    var str = "<button class='OpenEditItem btn btn-primary btn-in-table' type='button' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View",
                            function () {
                                var url = "/Admin/ReportProduct/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProductCode
                                };
                                Sv.BindPopup(url,
                                    model,
                                    function (rs) {
                                        $boxDetails.html(rs);
                                        $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                        initTableDetail(model);
                                        bindEventExport(model);
                                    });
                            });
                    }
                }
            }
        ]
    });

    $tableCustom.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableCustom, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'QuantityCustom',
                title: 'Số lượng khách',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityBuy',
                title: 'Số lượng mua',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonney',
                title: 'Giá trị',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                title: 'Chi tiết',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function () {
                    var str = "<button class='OpenEditItem btn btn-primary btn-in-table' type='button' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View",
                            function () {
                                var url = "/Admin/ReportProduct/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProductCode
                                };
                                Sv.BindPopup(url,
                                    model,
                                    function (rs) {
                                        $boxDetails.html(rs);
                                        $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                        initTableDetail(model);
                                        bindEventExport(model);
                                    });
                            });
                    }
                }
            }
        ]
    });
    $tableProvider.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableCustom, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'QuantityProvider',
                title: 'SL NCC',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'QuantityBuy',
                title: 'SL hàng hoá',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonney',
                title: 'Giá trị',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                title: 'Chi tiết',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function () {
                    var str = "<button class='OpenEditItem btn btn-primary btn-in-table' type='button' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View",
                            function () {
                                var url = "/Admin/ReportProduct/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProductCode
                                };
                                Sv.BindPopup(url,
                                    model,
                                    function (rs) {
                                        $boxDetails.html(rs);
                                        $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                        initTableDetail(model);
                                        bindEventExport(model);
                                    });
                            });
                    }
                }
            }
        ]
    });
    $tableIOStock2.bootstrapTable({
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
        url: '/ReportProduct/GetDataReport',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    Type: type
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
                    return Sv.BootstrapTableSTT($tableCustom, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '120px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '120px'
            }, {
                field: 'BeginInventory',
                title: 'Tồn đầu kỳ',
                align: 'right',
                valign: 'middle', rowspan: '2',
                width: '100px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'BeginTotalMonney',
                title: 'Giá trị đầu kỳ',
                valign: 'middle',
                align: 'right', rowspan: '2',
                width: '100px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                colspan: 4,
                width: '360px',
                title: "NHẬP"
            }, {
                colspan: 5,
                width: '500px',
                title: "XUẤT"
            }, {
                field: 'EndInventory',
                title: 'Tồn cuối kỳ',
                valign: 'middle',
                align: 'right', rowspan: '2',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'EndTotalMonney',
                title: 'Giá trị cuối kỳ',
                valign: 'middle',
                align: 'right', rowspan: '2',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                title: 'Chi tiết',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '120px',
                formatter: function () {
                    var str = "<button class='OpenEditItem btn btn-primary btn-in-table' type='button' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View",
                            function () {
                                var url = "/Admin/ReportProduct/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProductCode
                                };
                                Sv.BindPopup(url,
                                    model,
                                    function (rs) {
                                        $boxDetails.html(rs);
                                        $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                        initTableDetail(model);
                                        bindEventExport(model);
                                    });
                            });
                    }
                }
            }
        ], [{
            field: 'TotalQuantityInput',
            title: 'NCC',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'BalacingQuantityInput',
            title: 'Kiểm kho',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'ReturnQuantityInput',
            title: 'Trả',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'TranferQuantityInput',
            title: 'Chuyển',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'TotalQuantityOutput',
            title: 'Bán',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'RemoveQuantityOutput',
            title: 'Huỷ',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'ReturnQuantityOutput',
            title: 'Trả',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'BalancingQuantityOutput',
            title: 'Kiểm kho',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'TranferQuantityOutput',
            title: 'Chuyển',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }]]
    });
}

var bindEventExport = function (model) {
    var $btnExportDetail = $('#btnExportDetail');
    //var branchCode = '';
    //if ($('#txtBranchCode').val() != null) {
    //    for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
    //        branchCode += $('#txtBranchCode').val()[i] + ',';
    //    }
    //}
    $btnExportDetail.on('click', function () {
        var dataTable = [];
        if (type == "4") {
            dataTable = $('#formDetail').find('#tableIOStockDetail').bootstrapTable('getData');
        }
        if (type == "5") {
            dataTable = $('#formDetail').find('#tableIOStockDetail2').bootstrapTable('getData');
        }
        if (type == "6") {
            dataTable = $('#formDetail').find('#tableCustomDetail').bootstrapTable('getData');
        }
        if (type == "7") {
            dataTable = $('#formDetail').find('#tableProviderDetail').bootstrapTable('getData');
        }
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }
        window.location = '/ReportProduct/ExportExcelDetail?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&Type=' + type +
            '&BranchCode=' + model.BranchCode +
            '&Code=' + model.Code +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
}