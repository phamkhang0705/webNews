var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();

    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string",
                {
                    align: "center",
                    width: "50px",
                    title: 'STT',
                    formatter: function (value, row, index) {
                        return Sv.BootstrapTableSTT(base.$table, index);
                    }
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Mã hóa đơn',
                    field: 'Code',
                    width: "150px",
                    align: "left"
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Ngày tạo',
                    field: 'CreateDate',
                    width: "150px",
                    align: "left",
                    formatter: function (value) {
                        return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                    }
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Khách hàng',
                    field: 'CustomName',
                    width: "150px",
                    align: "left"
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Tổng cộng',
                    field: 'TotalMonney',
                    width: "150px",
                    align: "right",
                    formatter: function (value) {
                        return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                    }
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Khách đã trả',
                    field: 'PaidMonney',
                    width: "170px",
                    align: "right",
                    formatter: function (value) {
                        return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                    }
                }),
            Sv.BootstrapTableColumn("string",
                {
                    title: 'Còn nợ',
                    field: 'RemainMonney',
                    width: "120px",
                    align: "right",
                    formatter: function (value) {
                        return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                    }
                }), Sv.BootstrapTableColumn("string",
                {
                    title: 'Trạng thái',
                    field: 'Active',
                    width: "120px",
                    align: "left",
                    formatter: function (value, data) {
                        if (data.Active == 0) {
                            return "Phiếu tạm";
                        } else if (data.Active == 1) {
                            return "Phiếu đang hoạt động";
                        } else return "Hủy hóa đơn";
                    }
                }),
            Sv.BootstrapTableColumn("String",
                {
                    title: "Thao tác",
                    align: "Center",
                    width: '80px',
                    formatter: function () {
                        var str = "";
                        if (base.$perEdit == 1) {
                            str +=
                                "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Chi tiết hóa đơn'><i class='fa fa-pencil-square-o'></i></button>";
                            str +=
                                "<button data-code='%s' class='OpenHistory btn btn-primary btn-in-table' title='Lịch sử thanh toán'><i class='fa fa-hourglass-half '></i></button>";
                        }
                        return str;
                    },
                    events: {
                        'click .OpenEditItem': function (e, value, row) {
                            Sv.ChecPermission("View",
                                function () {
                                    var url = "/Admin/InvoiceOutport/ShowModal";
                                    var model = {
                                        Id: row.Id,
                                        Code: row.Code,
                                        BranchCode: row.BranchCode,
                                        Domain: row.Domain,
                                        action: "Edit"
                                    };
                                    Sv.BindPopup(url,
                                        model,
                                        function (rs) {
                                            base.$boxDetails.html(rs);
                                            base.OpenDisable();
                                            base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                            tableDetail(model.BranchCode, model.Domain, model.Id);
                                            tablepaymentHistory(model.BranchCode, model.Domain, model.Code);
                                            Sv.SetupDateAndSetDefault($('#divDate'), row.Date);
                                            bindEventExport(model);
                                        });
                                });
                        },
                        'click .OpenHistory': function (e, value, row) {
                            Sv.ChecPermission("View",
                                function () {
                                    var url = "/Admin/InvoiceOutport/ShowModalHistory";
                                    var model = {
                                        Id: row.Id,
                                        Code: row.Code,
                                        BranchCode: row.BranchCode,
                                        Domain: row.Domain,
                                        action: "Edit"
                                    };
                                    Sv.BindPopup(url,
                                        model,
                                        function (rs) {
                                            base.$boxDetails.html(rs);
                                            base.OpenDisable();
                                            base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                            tablepaymentHistory(model.BranchCode, model.Domain, model.Code);
                                            bindEventExport(model);
                                        });
                                });
                        }
                    }
                })
        ];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions',
            {
                responseHandler: function (res) {
                    base.$searchModal.modal("hide");
                    if (res.total == 0) {
                        base.$table.bootstrapTable('removeAll');
                    }
                    return {
                        total: res.total,
                        rows: res.data
                    };
                }
            });
    }
    base.GetFormData = function () {
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/InvoiceOutport/CancelInvoice";
        if (action == "Edit" && id == 0) {
            url = "/InvoiceOutport/UpdateInvoice";
        }
        if ($form.valid(true)) {
            if (action == "Edit" && id == 1) {
                Dialog.ConfirmCustom("",
                    "Bạn chắc chắn hủy hóa đơn này?",
                    function () {
                        Sv.Loading();
                        Sv.AjaxPost({
                            Url: url,
                            Data: base.GetFormData()
                        },
                            function (rs) {
                                Sv.EndLoading();
                                if (rs.Status == "01") {
                                    Dialog.Alert(rs.Message, Dialog.Success);
                                    base.$boxDetails.find("#modalDetails").modal("hide");
                                    base.LoadTableSearch();
                                } else {
                                    Dialog.Alert(rs.Message, Dialog.Error);
                                }
                            },
                            function () {
                                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                            });
                    });
            } else {
                Dialog.ConfirmCustom("",
                    "Bạn chắc chắn cập nhật hóa đơn này?",
                    function () {
                        Sv.Loading();
                        Sv.AjaxPost({
                            Url: url,
                            Data: base.GetFormData()
                        },
                            function (rs) {
                                Sv.EndLoading();
                                if (rs.Status == "01") {
                                    Dialog.Alert(rs.Message, Dialog.Success);
                                    base.$boxDetails.find("#modalDetails").modal("hide");
                                    base.LoadTableSearch();
                                } else {
                                    Dialog.Alert(rs.Message, Dialog.Error);
                                }
                            },
                            function () {
                                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                            });
                    });
            }
        }
    }
    this.OpenDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("select[id='txtType']").prop('disabled', true);
    }
    this.CloseDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("select[id='txtType']").prop('disabled', false);
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#searchModal').find('#txtCode').val();
        obj.BranchCode = $('#searchModal').find('#txtBranchCode').val();
        obj.FromSumMoney = $('#searchModal').find('#txtFromSumMoney').val();
        obj.ToSumMoney = $('#searchModal').find('#txtToSumMoney').val();
        obj.FromDate = $('#searchModal').find('#txtFromDate').val();
        obj.ToDate = $('#searchModal').find('#txtToDate').val();
        var storeId = $('#searchModal').find('#txtStoreId').val();
        obj.StoreId = '';
        if (storeId != null) {

            for (var i = 0; i < storeId.length; i++) {
                obj.StoreId += storeId[i] + ',';
            }
        }
        var listActive = "";
        $("input[type='checkbox']").each(function () {
            if ($(this).is(':checked')) {
                var active = $(this).val();
                listActive += active + ',';
            }
        });
        obj.Active = listActive;

        return obj;
    }
}
var bindEventExport = function (model) {
    $('#btnExport').on('click', function () {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn xuất hóa đơn này?",
            function () {
                var dataTable = $('#tableDetail').bootstrapTable('getData');
                if (dataTable.length <= 0) {
                    Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                    return;
                }
                window.location = '/InvoiceOutport/ExportExcel?' +
                    'BranchCode=' +
                    model.BranchCode +
                    '&Domain=' +
                    model.Domain +
                    '&InvoiceOutportId=' +
                    model.Id +
                    '&dateExport=' +
                    moment(new Date()).format('DD/MM/YYYY HH:mm');
            });
    });

    $('#btnExportHistory').on('click', function () {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn xuất hóa đơn này?",
            function () {
                var dataTable = $('#tablePaymentHistory').bootstrapTable('getData');
                if (dataTable.length <= 0) {
                    Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                    return;
                }
                window.location = '/InvoiceOutport/ExportPayment?' +
                    'BranchCode=' + model.BranchCode +
                    '&Domain=' + model.Domain +
                    '&Code=' + model.Code +
                    '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
            });
    });
}
var tableDetail = function (branchCode, domain, id) {
    var $tableDetail = $('#tableDetail');
    $tableDetail.bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 5,
        pageList: [5, 10, 15, 20, 30, 50, 100],
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
        url: '/InvoiceOutport/GetInvoiceOutPortDetail',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                BranchCode: branchCode,
                Domain: domain,
                InvoiceOutportId: id
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
                    return Sv.BootstrapTableSTT($tableDetail, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng hóa',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng hóa',
                align: 'center',
                valign: 'middle',
                width: '120px'
            }, {
                field: 'Price',
                title: 'Đơn giá',
                align: 'right',
                valign: 'middle',
                width: '80px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                field: 'Quantity',
                title: 'Số lượng',
                valign: 'middle',
                align: 'right',
                width: '100px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                field: 'Redure',
                title: 'Giảm giá',
                align: 'right',
                valign: 'middle',
                width: '80px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                field: 'TotalMonney',
                title: 'Thành tiền',
                valign: 'middle',
                align: 'right',
                width: '100px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }
        ]
    });
}
var tablepaymentHistory = function (branchCode, domain, code) {
    var $tablepaymentHistory = $('#tablePaymentHistory');
    $tablepaymentHistory.bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 5,
        pageList: [5, 10, 15, 20, 30, 50, 100],
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
        url: '/InvoiceOutport/GetPaymentToInvoiceCode',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                BranchCode: branchCode,
                Domain: domain,
                Code: code
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
                    return Sv.BootstrapTableSTT($tablepaymentHistory, index);
                }
            }, {
                field: 'Payments_Code',
                title: 'Mã phiếu',
                align: 'center',
                valign: 'middle',
                width: '150px',
                formatter: function (value, row) {
                    var str = '';
                    str += '<a href="#" class="ShowDetail" style="color:#ff0000" alt="Chi tiết phiếu">' + value + '</a>';
                    return str;
                },
                events: {
                    'click .ShowDetail': function (e, value, row) {
                        //Show detail of payment
                        $('#showPaymentDetail').removeClass('hidden');
                        $('#lbPaymentCode').text(row.Payments_Code);
                        $('#lbPaymentUserName').text(row.Payments_UserName);
                        $('#lbCreatedDate').text(row.Payments_CreatDate != null ? moment(new Date(parseInt(row.Payments_CreatDate.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "");
                        $('#lbTotalMonney').text(row.Payments_TotalMoney != null ? (parseInt(row.Payments_TotalMoney)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
                        $('#lbPaymentType').text(row.Payments_Type == "1" ? "Đã thanh toán" : "Chưa thanh toán");
                        $('#lbCustomName').text(row.UserFullName);
                        $('#lbBranchCode').text(row.Payments_BranchName);
                        $('#lbNote').text(row.Payments_Decription != null ? row.Payments_Decription : "");
                    }
                }
            }, {
                field: 'Payments_CreatDate',
                title: 'Thời gian',
                align: 'center',
                valign: 'middle',
                width: '120px',
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "";
                }
            }, {
                field: 'Payments_UserName',
                title: 'Người tạo',
                align: 'center',
                valign: 'middle',
                width: '80px'
            }, {
                field: 'Payments_Method',
                title: 'Phương thức TT',
                valign: 'middle',
                align: 'center',
                width: '100px',
                formatter: function (value) {
                    if (value == "1") {
                        return "Tiền mặt";
                    } else if (value == "2") {
                        return "Thẻ";
                    } else if (value == "3") {
                        return "Chuyển khoản";
                    }
                }
            }, {
                field: 'Payments_TotalMoney',
                title: 'Tiền thu',
                align: 'right',
                valign: 'middle',
                width: '80px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                field: 'Payments_Type',
                title: 'Trạng thái',
                valign: 'middle',
                align: 'center',
                width: '100px',
                formatter: function (value) {
                    if (value == "1") {
                        return "Đã thanh toán";
                    } else if (value == "2") {
                        return "Chưa thanh toán";
                    }
                }
            }
        ]
    });
}
var getAllProductByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/InvoiceOutport/GetAllProductByBranch',
        Data: {
            branchCode: branchCode
        }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' +
                        value.ProductCode +
                        '">' +
                        value.ProductName +
                        '</option>');
                });
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

var getAllStoreByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/InvoiceOutport/GetStoreByBranchCode',
        Data: {
            branchCode: branchCode
        }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Tất cả</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    $(controlSelect).append('<option value="' +
                        value.Id +
                        '">' +
                        value.Name +
                        '</option>');
                });
        $("#txtStoreId").trigger("change");
    },
        function (error) {
            Dialog.Alert('Tải kho thất bại', Dialog.Error);
        });
}

$(document).ready(function () {
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    var unit = new Unit();
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/InvoiceOutport/GetData",
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
        unit.$searchModal.find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
        unit.$searchModal.find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
        ////Max date
        unit.$searchModal.find('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
        unit.$searchModal.find('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
        jQuery(function () {
            $('#txtFromSumMoney').number(true, 0);
            $('#txtToSumMoney').number(true, 0);
        });
        //getAllStoreByBranch($('#searchModal').find('select#txtBranchCode').val(), '#txtStoreId', false);
        unit.$searchModal.on('change', 'select#txtBranchCode', function () {
            getAllStoreByBranch($('#searchModal').find('select#txtBranchCode').val(), '#txtStoreId', false);
        });
    });
    unit.$btnSearchSubmit.click(function () {
        if ($('#formSearch #txtBranchCode').val() == "-1") {
            $(this).focus();
            if ($('#formSearch #txtBranchCode').parent().find("span.error").length == 0) {
                $('#formSearch #txtBranchCode')
                    .before('<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh để tìm kiếm</span>');
            }
            return false;
        } else {
            $('span.error').remove();
        }
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
        $('select#txtBranchCode').val('-1').trigger('change');
        $('select#txtStoreId').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/InvoiceOutport/ShowModal";
        var model = {
            id: 0,
            action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            unit.CloseDisable();
        });
    });

    unit.$boxDetails.on('click', 'button#btnCancel', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 1);
    });
    unit.$boxDetails.on('click', 'button#btnSave', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });

    unit.$boxDetails.on('click', 'button#btnOpen', function (e) {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn mở hóa đơn này?",
            function () {
                var invoiceCode = unit.$boxDetails.find('input[type="hidden"][name="Code"]').val();
                window.location.href = '/Admin/Sales/Index?Code=' + invoiceCode;
            });
    });
    unit.$boxDetails.on('click', 'button#btnCopy', function (e) {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn sao chép hóa đơn này?",
            function () {
                var invoiceCode = unit.$boxDetails.find('input[type="hidden"][name="Code"]').val();
                window.location.href = '/Admin/Sales/Index?Code=' + invoiceCode;
            });
    });
    

    $('.modal').on("hidden.bs.modal", function (e) {
        if ($('.modal:visible').length) {
            $('.modal-backdrop').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) - 10);
            $('body').addClass('modal-open');
        }
    }).on("show.bs.modal", function (e) {
        if ($('.modal:visible').length) {
            $('.modal-backdrop.in').first().css('z-index', parseInt($('.modal:visible').last().css('z-index')) + 10);
            $(this).css('z-index', parseInt($('.modal-backdrop.in').first().css('z-index')) + 10);
        }
    });
});


var DeleteSpanError = function () {
    if ($('#formSearch #txtBranchCode').val() == "-1") {
        $(this).focus();
        if ($('#formSearch #txtBranchCode').parent().find("span.error").length == 0) {
            $('#formSearch #txtBranchCode')
                .before('<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh để tìm kiếm</span>');
        }
        return false;
    } else {
        $('span.error').remove();
    }
    if ($('#formSearch #txtStoreId').val() == '' || $('#formSearch #txtStoreId').val() == null) {
        $(this).focus();
        if ($('#formSearch #txtStoreId').parent().find("span.error").length == 0) {
            $('#formSearch #txtStoreId')
                .before('<span class="error" style="color:#ff0000">Vui lòng chọn kho để tìm kiếm</span>');
        }
        return false;
    } else {
        $('span.error').remove();
    }
}