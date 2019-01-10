var offset = 0;
var limit = 0;

var $tableTime = $('#tableTime');
var $tableDiscount = $('#tableDiscount');
var $tableReturnCustom = $('#tableReturnCustom');
var $tableStaff = $('#tableStaff');
var $tableBranch = $('#tableBranch');
var $tableProfit = $('#tableProfit');

var $tableProfitDetail = $('#tableProfitDetail');
var $tableStaffDetail = $('#tableStaffDetail');
var $tableBranchDetail = $('#tableBranchDetail');

var branchCode = '';
var type = '';
var $boxDetails = $('#box-detail');

function showTableTime() {
    if ($('.rpTime').hasClass('hidden')) {
        $('.rpTime').removeClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').addClass('hidden');
    }
    if (!$('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').addClass('hidden');
    }
    if (!$('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').addClass('hidden');
    }
    if (!$('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').addClass('hidden');
    }
}
function showTableProfit() {
    if (!$('.rpTime').hasClass('hidden')) {
        $('.rpTime').addClass('hidden');
    }
    if ($('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').removeClass('hidden');
    }
    if (!$('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').addClass('hidden');
    }
    if (!$('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').addClass('hidden');
    }
    if (!$('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').addClass('hidden');
    }
    if (!$('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').addClass('hidden');
    }
}
function showTableDiscount() {
    if (!$('.rpTime').hasClass('hidden')) {
        $('.rpTime').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if ($('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').removeClass('hidden');
    }
    if (!$('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').addClass('hidden');
    }
    if (!$('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').addClass('hidden');
    }
    if (!$('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').addClass('hidden');
    }
}
function showTableReturnCustom() {
    if (!$('.rpTime').hasClass('hidden')) {
        $('.rpTime').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').addClass('hidden');
    }
    if ($('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').removeClass('hidden');
    }
    if (!$('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').addClass('hidden');
    }
    if (!$('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').addClass('hidden');
    }
}
function showTableStaff() {
    if (!$('.rpTime').hasClass('hidden')) {
        $('.rpTime').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').addClass('hidden');
    }
    if (!$('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').addClass('hidden');
    }
    if ($('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').removeClass('hidden');
    }
    if (!$('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').addClass('hidden');
    }
}
function showTableBranch() {
    if (!$('.rpTime').hasClass('hidden')) {
        $('.rpTime').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
    if (!$('.rpDiscount').hasClass('hidden')) {
        $('.rpDiscount').addClass('hidden');
    }
    if (!$('.rpReturnCustom').hasClass('hidden')) {
        $('.rpReturnCustom').addClass('hidden');
    }
    if (!$('.rpStaff').hasClass('hidden')) {
        $('.rpStaff').addClass('hidden');
    }
    if ($('.rpBranch').hasClass('hidden')) {
        $('.rpBranch').removeClass('hidden');
    }
}

var loadTable = function () {
    if (type == "1") {
        showTableTime();
    }
    if (type == "2") {
        showTableProfit();
    }
    if (type == "3") {
        showTableDiscount();
    }
    if (type == "4") {
        showTableReturnCustom();
    }
    if (type == "5") {
        showTableStaff();
    }
    if (type == "6") {
        showTableBranch();
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
            $tableTime.bootstrapTable("refresh");
        }
        if (type == "2") {
            $tableProfit.bootstrapTable("refresh");
        }
        if (type == "3") {
            $tableDiscount.bootstrapTable("refresh");
        }
        if (type == "4") {
            $tableReturnCustom.bootstrapTable("refresh");
        }
        if (type == "5") {
            $tableStaff.bootstrapTable("refresh");
        }
        if (type == "6") {
            $tableBranch.bootstrapTable("refresh");
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
        if (type == "1") {
            var dataTable = $tableTime.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "2") {
            var dataTable = $tableProfit.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "3") {
            var dataTable = $tableDiscount.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "4") {
            var dataTable = $tableReturnCustom.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "5") {
            var dataTable = $tableStaff.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "6") {
            var dataTable = $tableBranch.bootstrapTable('getData');
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
        window.location = '/ReportSale/ExportExcel?' +
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
    if (model.type == "1") {
        var $tableTimeDetail = $('#tableTimeDetail');
        $tableTimeDetail.bootstrapTable({
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
            url: '/ReportSale/GetDataDetail',
            queryParams: function (p) {
                var createdDate = moment(new Date(parseInt(model.CreateDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: createdDate,
                        ToDate: createdDate,
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
                        return Sv.BootstrapTableSTT($tableTimeDetail, index);
                    }
                }, {
                    field: 'CreateDate',
                    title: 'Thời gian',
                    valign: 'middle',
                    align: 'center',
                    width: '120px',
                    formatter: function (value) {
                        return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                    }
                }, {
                    field: 'Code',
                    title: 'Mã hoá đơn',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'SumMonney',
                    title: 'Số lượng',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'PaidMonney',
                    title: 'Giá trị trả',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'TotalMonney',
                    title: 'Doanh thu',
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
    if (model.type == "2") {
        var $tableProfitDetail = $('#tableProfitDetail');
        $tableProfitDetail.bootstrapTable({
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
            url: '/ReportSale/GetDataDetail',
            queryParams: function (p) {
                var createdDate = moment(new Date(parseInt(model.CreateDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: createdDate,
                        ToDate: createdDate,
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
                        return Sv.BootstrapTableSTT($tableProfitDetail, index);
                    }
                }, {
                    field: 'CreateDate',
                    title: 'Thời gian',
                    valign: 'middle',
                    align: 'center',
                    width: '120px',
                    formatter: function (value) {
                        return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                    }
                }, {
                    field: 'Code',
                    title: 'Mã hoá đơn',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'TotalMonney',
                    title: 'Tổng tiền',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'Discount',
                    title: 'Giảm giá HĐ',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'SumMonney',
                    title: 'Doanh thu thuần',
                    valign: 'middle',
                    align: 'right',
                    width: '120px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'totalMonneySource',
                    title: 'Giá vốn',
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
                }
            ]
        });
    }
    if (model.type == "5") {
        var $tableStaffDetail = $('#tableStaffDetail');
        $tableStaffDetail.bootstrapTable({
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
            url: '/ReportSale/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').parent().data("DateTimePicker").date(),
                        ToDate: $('#txtTDate').parent().data("DateTimePicker").date(),
                        BranchCode: branchCode,
                        Type: type,
                        UserName: model.UserName
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
                        return Sv.BootstrapTableSTT($tableStaffDetail, index);
                    }
                }, {
                    field: 'Code',
                    title: 'Mã hoá đơn',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'CreateDate',
                    title: 'Thời gian',
                    valign: 'middle',
                    align: 'center',
                    width: '120px',
                    formatter: function (value) {
                        return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "";
                    }
                }, {
                    field: 'CustomName',
                    title: 'Tên nhân viên',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'TotalQuantity',
                    title: 'Số lượng',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
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
                }
            ]
        });
    }
    if (model.type == "6") {
        var $tableBranchDetail = $('#tableBranchDetail');
        $tableBranchDetail.bootstrapTable({
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
            url: '/ReportSale/GetDataDetail',
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
                        return Sv.BootstrapTableSTT($tableBranchDetail, index);
                    }
                }, {
                    field: 'Code',
                    title: 'Mã hoá đơn',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'CreateDate',
                    title: 'Thời gian',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value) {
                        return value != null
                            ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm')
                            : "";
                    }
                }, {
                    field: 'CustomName',
                    title: 'Khách hàng',
                    valign: 'middle',
                    align: 'right',
                    width: '120px'
                }, {
                    field: 'TotalQuantity',
                    title: 'Số lượng',
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
                }
            ]
        });
    }
}
var initTable = function () {
    $tableTime.bootstrapTable({
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
        url: '/ReportSale/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableTime, index);
                }
            }, {
                field: 'CreateDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'TotalQuantity',
                title: 'Số lượng mua',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMonney',
                title: 'Doanh thu',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'ReturnSumMonney',
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
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/ReportSale/ShowModal";
                            var model = {
                                action: "View",
                                type: type,
                                CreateDate: row.CreateDate,
                                FromDate: row.CreateDate,
                                ToDate: row.CreateDate
                            };
                            Sv.BindPopup(url, model, function (rs) {
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
        url: '/ReportSale/GetDataReport',
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
                field: 'CreateDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'TotalMonney',
                title: 'Tổng tiền hàng',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Discount',
                title: 'Giảm giá HĐ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMonney',
                title: 'Doanh thu thuần',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'totalMonneySource',
                title: 'Giá vốn',
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
                                var url = "/Admin/ReportSale/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    CreateDate: row.CreateDate,
                                    FromDate: row.CreateDate,
                                    ToDate: row.CreateDate
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

    $tableDiscount.bootstrapTable({
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
        url: '/ReportSale/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableDiscount, index);
                }
            }, {
                field: 'Code',
                title: 'Mã HĐ',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CreateDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'FullName',
                title: 'Nhân viên',
                align: 'center',
                valign: 'middle',
                width: '150px'
            },
            {
                field: 'CustomName',
                title: 'Khách hàng',
                valign: 'middle',
                align: 'center',
                width: '120px'
            },
            {
                field: 'SumMonney',
                title: 'Giá trị HĐ',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Discount',
                title: 'Giảm giá HĐ',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });
    $tableReturnCustom.bootstrapTable({
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
        url: '/ReportSale/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableReturnCustom, index);
                }
            }, {
                field: 'Code',
                title: 'Mã phiếu',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CreatDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'InvoiceCode',
                title: 'Chứng từ',
                valign: 'middle',
                align: 'center',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMoney',
                title: 'Giá trị trả',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }
        ]
    });
    $tableStaff.bootstrapTable({
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
        url: '/ReportSale/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableStaff, index);
                }
            }, {
                field: 'UserName',
                title: 'Họ tên',
                valign: 'middle',
                align: 'center',
                width: '120px'
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
                field: 'ReturnSumMonney',
                title: 'Gía trị trả',
                align: 'right',
                valign: 'middle',
                width: '150px',
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
                                var url = "/Admin/ReportSale/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    UserName: row.UserName
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

    $tableBranch.bootstrapTable({
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
        url: '/ReportSale/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableBranch, index);
                }
            }, {
                field: 'BranchName',
                title: 'Chi nhánh',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'SumMonney',
                title: 'Doanh thu',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'ReturnSumMonney',
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
                                var url = "/Admin/ReportSale/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode
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
}

var bindEventExport = function (model) {
    var $btnExportDetail = $('#btnExportDetail');
    var branchCode = '';
    if ($('#txtBranchCode').val() != null) {
        for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
            branchCode += $('#txtBranchCode').val()[i] + ',';
        }
    }
    $btnExportDetail.on('click', function () {
        if (type == "1") {
            model.FromDate = moment(new Date(parseInt(model.FromDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
            model.ToDate = moment(new Date(parseInt(model.ToDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
            var dataTable = $('#formDetail').find('#tableTimeDetail').bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "2") {
            model.FromDate = moment(new Date(parseInt(model.FromDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
            model.ToDate = moment(new Date(parseInt(model.ToDate.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
            var dataTable = $('#formDetail').find('#tableProfitDetail').bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "5") {
            var dataTable = $('#formDetail').find('#tableStaffDetail').bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "6") {
            var dataTable = $('#formDetail').find('#tableBranchDetail').bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        window.location = '/ReportSale/ExportExcelDetail?' +
            'FromDate=' + model.FromDate +
            '&ToDate=' + model.ToDate +
            '&Type=' + type +
            '&BranchCode=' + model.BranchCode +
            '&UserName=' + model.UserName +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
}