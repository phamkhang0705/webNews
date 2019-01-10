var offset = 0;
var limit = 0;

var $tableInput = $('#tableInput');
var $tableProduct = $('#tableProduct');
var $tableDebt = $('#tableDebt ');

var $tableInputDetail = $('#tableInputDetail');
var $tableProductDetail = $('#tableProductDetail');

var branchCode = '';
var type = '';
var $boxDetails = $('#box-detail');

function showTableInput() {
    if ($('.rpInput').hasClass('hidden')) {
        $('.rpInput').removeClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if (!$('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').addClass('hidden');
    }
}
function showTableProduct() {
    if (!$('.rpInput').hasClass('hidden')) {
        $('.rpInput').addClass('hidden');
    }
    if ($('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').removeClass('hidden');
    }
    if (!$('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').addClass('hidden');
    }
}
function showTableDebt() {
    if (!$('.rpInput').hasClass('hidden')) {
        $('.rpInput').addClass('hidden');
    }
    if (!$('.rpProduct').hasClass('hidden')) {
        $('.rpProduct').addClass('hidden');
    }
    if ($('.rpDebt').hasClass('hidden')) {
        $('.rpDebt').removeClass('hidden');
    }
}
var loadTable = function () {
    if (type == "1") {
        showTableInput();
        $tableInput.bootstrapTable("refresh");
    }
    if (type == "2") {
        showTableProduct();
        $tableProduct.bootstrapTable("refresh");
    }
    if (type == "3") {
        showTableDebt();
        $tableDebt.bootstrapTable("refresh");
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
            $tableInput.bootstrapTable("refresh");
        }
        if (type == "2") {
            $tableProduct.bootstrapTable("refresh");
        }
        if (type == "3") {
            $tableDebt.bootstrapTable("refresh");
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
            dataTable = $tableInput.bootstrapTable('getData');
        }
        if (type == "2") {
            dataTable = $tableProduct.bootstrapTable('getData');
        }
        if (type == "3") {
            dataTable = $tableDebt.bootstrapTable('getData');
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
        window.location = '/ReportProvider/ExportExcel?' +
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
        var $tableInputDetail = $('#tableInputDetail');
        $tableInputDetail.bootstrapTable({
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
            url: '/ReportProvider/GetDataDetail',
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
                        return Sv.BootstrapTableSTT($tableInputDetail, index);
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
                        return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : '';
                    }
                }, {
                    field: 'QuantityInput',
                    title: 'SL hàng hoá',
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }, {
                    field: 'SumMonney',
                    title: 'Tổng',
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
        var $tableProductDetail = $('#tableProductDetail');
        $tableProductDetail.bootstrapTable({
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
            url: '/ReportProvider/GetDataDetail',
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
                        return Sv.BootstrapTableSTT($tableProductDetail, index);
                    }
                }, {
                    field: 'ProductCode',
                    title: 'Mã hàng hoá',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'ProductName',
                    title: 'Tên hàng hoá',
                    valign: 'middle',
                    align: 'center',
                    width: '120px'
                }, {
                    field: 'TotalQuantity',
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
                    align: 'right',
                    valign: 'middle',
                    width: '150px',
                    formatter: function (value, row) {
                        return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                }
            ]
        });
    }
}
var initTable = function () {
    $tableInput.bootstrapTable({
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
        url: '/ReportProvider/GetDataReport',
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
                    return Sv.BootstrapTableSTT($tableInput, index);
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
                align: 'right',
                width: '120px'
            }, {
                field: 'MonneyInput',
                title: 'Giá trị nhập',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'MonneyReturn',
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
            },
            {
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
                                var url = "/Admin/ReportProvider/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProviderCode
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
        url: '/ReportProvider/GetDataReport',
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
                field: 'ProviderCode',
                title: 'Mã NCC',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'ProviderName',
                title: 'Tên NCC',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'TotalQuantity',
                title: 'SL hàng hoá',
                align: 'right',
                valign: 'middle',
                width: '150px',
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
            },
            {
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
                                var url = "/Admin/ReportProvider/ShowModal";
                                var model = {
                                    action: "View",
                                    type: type,
                                    FromDate: $('#txtFDate').val(),
                                    ToDate: $('#txtTDate').val(),
                                    BranchCode: branchCode,
                                    Code: row.ProviderCode
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
        url: '/ReportProvider/GetDataReport',
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
                field: 'BeginMonneyDebt',
                title: 'Nợ đầu kỳ',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                field: 'MonneyDebt',
                title: 'Ghi nợ',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            },
            {
                field: 'MonneyPaid',
                title: 'Ghi có',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'TotalMonneyDebt',
                title: 'Nợ cuối kỳ',
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
    //var branchCode = '';
    //if ($('#txtBranchCode').val() != null) {
    //    for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
    //        branchCode += $('#txtBranchCode').val()[i] + ',';
    //    }
    //}
    $btnExportDetail.on('click', function () {
        var dataTable = [];
        if (type == "1") {
            dataTable = $('#formDetail').find('#tableInputDetail').bootstrapTable('getData');
        }
        if (type == "2") {
            dataTable = $('#formDetail').find('#tableProductDetail').bootstrapTable('getData');
        }
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }
        window.location = '/ReportProvider/ExportExcelDetail?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&Type=' + type +
            '&BranchCode=' + model.BranchCode +
            '&Code=' + model.Code +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
}