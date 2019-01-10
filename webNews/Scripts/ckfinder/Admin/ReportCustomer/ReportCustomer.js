var offset = 0;
var limit = 0;

var $tableSale = $('#tableSale');
var $tableProduct = $('#tableProduct');
var $tableDebt = $('#tableDebt');
var $tableProfit = $('#tableProfit');

var $tableSaleDetail = $('#tableSaleDetail');

var branchCode = '';
var type = '';
var $boxDetails = $('#box-detail');

function showTableSale() {
    if ($('.rpSale').hasClass('hidden')) {
        $('.rpSale').removeClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if (!$('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
}
function showTableProduct() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if ($('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').removeClass('hidden');
    }
    if (!$('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').addClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
}
function showTableDebt() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if ($('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').removeClass('hidden');
    }
    if (!$('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').addClass('hidden');
    }
}
function showTableProfit() {
    if (!$('.rpSale').hasClass('hidden')) {
        $('.rpSale').addClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if (!$('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').addClass('hidden');
    }
    if ($('.rpProfit').hasClass('hidden')) {
        $('.rpProfit').removeClass('hidden');
    }
}

var loadTable = function () {
    if (type == "1") {
        showTableSale();
    }
    if (type == "2") {
        showTableProduct();
    }
    if (type == "3") {
        showTableDebt();
    }
    if (type == "4") {
        showTableProfit();
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
            $tableProduct.bootstrapTable("refresh");
        }
        if (type == "3") {
            $tableDebt.bootstrapTable("refresh");
        }
        if (type == "4") {
            $tableProfit.bootstrapTable("refresh");
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
            var dataTable = $tableSale.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "2") {
            var dataTable = $tableProduct.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "3") {
            var dataTable = $tableDebt.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }
        if (type == "4") {
            var dataTable = $tableProfit.bootstrapTable('getData');
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
        window.location = '/ReportCustomer/ExportExcel?' +
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
        var $tableSaleDetail = $('#tableSaleDetail');
        $tableSaleDetail.bootstrapTable({
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
            url: '/ReportCustomer/GetDataDetail',
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    search: {
                        FromDate: $('#txtFDate').val(),
                        ToDate: $('#txtTDate').val(),
                        BranchCode: branchCode,
                        Type: type,
                        CustomerCode: model.CustomerCode
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
                        return Sv.BootstrapTableSTT($tableSaleDetail, index);
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
                        return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
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
        url: '/ReportCustomer/GetDataReport',
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
                field: 'CustomerCode',
                title: 'Mã KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CustomName',
                title: 'Tên KH',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'TotalMonneySale',
                title: 'Doanh thu',
                align: 'right',
                valign: 'middle',
                width: '150px',
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
                            var url = "/Admin/ReportCustomer/ShowModal";
                            var model = {
                                action: "View",
                                type: type,
                                CustomerCode: row.CustomerCode,
                                FromDate: $('#txtFDate').val(),
                                ToDate: $('#txtTDate').val()
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
        url: '/ReportCustomer/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableProduct, index);
                }
            }, {
                field: 'CustomerCode',
                title: 'Mã KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CustomerName',
                title: 'Tên KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'TotalQuantityBuy',
                title: 'SL mua',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyBuy',
                title: 'Giá trị mua',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalQuantityReturn',
                title: 'Số lượng trả',
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
    $tableDebt.bootstrapTable({
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
        url: '/ReportCustomer/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableDebt, index);
                }
            }, {
                field: 'CustomerCode',
                title: 'Mã KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CustomerName',
                title: 'Tên KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'BeginMonneyDebt',
                title: 'Nợ đầu kỳ',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonneyDebt',
                title: 'Ghi nợ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonneyPaid',
                title: 'Ghi có',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyDebt',
                title: 'Nợ cuối kỳ',
                align: 'right',
                valign: 'middle',
                width: '150px',
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
        url: '/ReportCustomer/GetDataReport',
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
                field: 'CustomerCode',
                title: 'Mã KH',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'CustomerName',
                title: 'Tên KH',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'TotalMonney',
                title: 'Tổng tiền hàng',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Discount',
                title: 'Giảm giá',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'SumMonney',
                title: 'Tổng tiền phải thu',
                valign: 'middle',
                align: 'right',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonneyPaid',
                title: 'Tổng tiền đã thanh toán',
                valign: 'middle',
                align: 'right',
                width: '170px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyEnd',
                title: 'Tổng tiền còn nợ lại',
                valign: 'middle',
                align: 'right',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonneySource',
                title: 'Tiền vốn',
                valign: 'middle',
                align: 'right',
                width: '150px',
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
            model.FromDate = model.FromDate;
            model.ToDate = model.ToDate;
            var dataTable = $('#formDetail').find('#tableSaleDetail').bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                return;
            }
        }

        window.location = '/ReportCustomer/ExportExcelDetail?' +
            'FromDate=' + model.FromDate +
            '&ToDate=' + model.ToDate +
            '&Type=' + type +
            '&BranchCode=' + model.BranchCode +
            '&CustomerCode=' + model.CustomerCode +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
}