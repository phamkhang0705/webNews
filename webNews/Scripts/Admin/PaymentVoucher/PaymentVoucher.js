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
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table, index);
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Mã phiếu chi',
                field: 'PaymentCode',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Phiếu nhập',
                field: 'InvoiceCode',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreatedDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "";
                }
            }),

            Sv.BootstrapTableColumn("string", {
                title: 'Tên nhân viên',
                field: 'UserName',
                align: "left"
            }),

//            Sv.BootstrapTableColumn("NumberNull", {
//                title: 'Tổng tiền',
//                field: 'TotalMoney'
//            }),
            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Số tiền thanh toán',
                field: 'PaymentMoney'
            }),
//            Sv.BootstrapTableColumn("NumberNull", {
//                title: 'Nợ lại',
//                field: 'RemainMoney'
//            }),

            Sv.BootstrapTableColumn("string", {
                title: 'Tên NCC',
                field: 'Payments_Person',
                align: "left"
            }),
//            Sv.BootstrapTableColumn("string", {
//                title: 'Ngân hàng',
//                field: 'BankCode',
//                align: "left"
//            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Mô tả',
                field: 'Description',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                filed: 'Status',
                align: "left",
                width: '150px',
                title: 'Trạng thái',
                formatter: function (value, row, index) {
                    if (row.Status === 1) {
                        return 'Đã duyệt';
                    }
                    else if (row.Status === 0) {
                        return 'Chờ duyệt';
                    } else {
                        return 'Đã hủy';
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit === "1") {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                        if (data.Status === 0) {
                            str += "<button data-code='%s' class='OpenApproveItem btn btn-primary btn-in-table' title='Duyệt'><i class='fa fa-check'></i></button>";
                            str += "<button data-code='%s' class='OpenRejectItem btn btn-primary btn-in-table' title='Hủy'><i class='fa fa-trash'></i></button>";
                        }
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PaymentVoucher/ShowModal";
                            var model = {
                                id: row.Id, code: row.PaymentCode, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefault($('#divCreatedDate'), row.CreatedDate);
                                base.$boxDetails.find("#txtCreatedDate").prop('disabled', true);
                                base.$boxDetails.find("#txtBankAccount").prop('disabled', true);
                                if (row.InvoiceCode != null && row.InvoiceCode.length > 0) {
                                    base.$boxDetails.find(".invoice-money").show();
                                } else {
                                    base.$boxDetails.find(".invoice-money").hide();
                                }
                                base.OpentDisable();
                                base.SetupAmountMask();
                            });
                        });
                    },
                    'click .OpenApproveItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PaymentVoucher/Approve";
                            Dialog.ConfirmCustom("", "Bạn chắc chắn duyệt hóa đơn này?", function () {
                                Sv.AjaxPost({
                                    Url: url,
                                    Data: { paymentCode: row.PaymentCode }
                                },
                                function (rs) {
                                    if (rs.Status == "01") {
                                        Dialog.Alert(rs.Message, Dialog.Success);
                                        base.$boxDetails.find("#modalDetails").modal("hide");
                                        base.LoadTableSearch();
                                    }
                                },
                                function () {
                                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                                });
                            });
                        });
                    },
                    'click .OpenRejectItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PaymentVoucher/Cancel";
                            Dialog.ConfirmCustom("", "Bạn chắc chắn hủy hóa đơn này?", function () {
                                Sv.AjaxPost({
                                    Url: url,
                                    Data: { paymentCode: row.PaymentCode }
                                },
                                function (rs) {
                                    if (rs.Status == "01") {
                                        Dialog.Alert(rs.Message, Dialog.Success);
                                        base.$boxDetails.find("#modalDetails").modal("hide");
                                        base.LoadTableSearch();
                                    }
                                },
                                function () {
                                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                                });
                            });
                        });
                    }
                }
            })];
        return obj;
    }

    this.OpentDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCode']").prop('disabled', true);
        $form.find("input[id='txtTotalMoney']").prop('disabled', true);
        $form.find("input[id='txtRemainMoney']").prop('disabled', true);
        $form.find("input[id='txtPaidMoney']").prop('disabled', true);
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total === 0) {
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
        var remainMoney = $form.find('#txtRemainMoney').val();
        var paymentMoney = $form.find('#txtPaymentMoney').val();
        var invoiceCode = $form.find('#txtInvoiceCode').val();
        if (invoiceCode.length > 0 && paymentMoney > remainMoney) {
            Dialog.Alert("Số tiền cần thanh toán phải nhỏ hơn số tiền nợ lại", Dialog.Error);
            return;
        }
        if ($form.find('#txtMethodPayment').val() == 1) {
            if ($form.find('#txtBankAccount').val().length == 0) {
                Dialog.Alert("Bạn chưa chọn tài khoản", Dialog.Error);
                return;
            }
        }
        var url = "/PaymentVoucher/Create";
        if (action === "Edit") {
            url = "/PaymentVoucher/Update";
        }
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    if (rs.Status === "01") {
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
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#txtPaymentCode').val();
        obj.Status = $("#txtSearchActive").val();
        obj.FromDate = $("#divFromDate").data('DateTimePicker').date();
        obj.ToDate = $("#divToDate").data('DateTimePicker').date();
        return obj;
    }

    this.SetupAmountMask = function () {
        //Mask_groupSeparator: '.',
        //Mask_radixPoint: ',',
        //Mask_integerDigits: 11,
        //Mask_digits: 0,
        $('.amount-mask').on().inputmask({
            alias: 'decimal',
            placeholder: '',
            groupSeparator: '.',
            radixPoint: ',',
            autoGroup: true,
            digits: 0,
            allowPlus: false,
            allowMinus: false,
            autoUnmask: true,
            integerDigits: 11
        });
    }

    this.GetInvoiceImport = function (code) {
        Sv.AjaxPost({
            Url: '/PaymentVoucher/GetInvoiceImport',
            Data: {
                code: code
            }
        }, function (response) {
            if (response.Id != 0) {
                base.$boxDetails.find(".invoice-money").show();
                base.$boxDetails.find('#txtTotalMoney').val(response.TotalMoney);
                base.$boxDetails.find('#txtPaidMoney').val(response.PaidMoney);
                base.$boxDetails.find('#txtRemainMoney').val(response.RemainMoney);
                base.$boxDetails.find('#txtSupplierName').text(response.SupplierCode + " - " + response.SupplierName);
            } else {
                base.$boxDetails.find(".invoice-money").hide();
            }

        },
        function (error) {
            Dialog.Alert('Có lỗi trong quá trình xử lý', Dialog.Error);
        });
    }


}

$(document).ready(function () {
    var unit = new Unit();
    $("#formSearch").find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().StartOfMonth).format('DD/MM/YYYY HH:mm');
    $("#formSearch").find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate).format('DD/MM/YYYY HH:mm');
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/PaymentVoucher/GetData",
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/PaymentVoucher/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefault($('#divCreatedDate'), new Date());
            unit.$boxDetails.find("#txtCreatedDate").prop('disabled', true);
            unit.$boxDetails.find("#txtBankAccount").prop('disabled', true);
            unit.$boxDetails.find(".invoice-money").hide();
            unit.SetupAmountMask();
            unit.OpentDisable();
        });
    });

    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        unit.SubmitServer("Add", 0);
    });

    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });

    unit.$boxDetails.on('change', '#txtInvoiceCode', function (e) {
        e.preventDefault();
        unit.GetInvoiceImport($(this).val());

    });

    $("#txtMethodPayment").change(function () {
        if (parseInt($("#txtMethodPayment").val()) == 1) {
            $("#grAccount").show();
            $('#txtBankAccount').prop('disabled', false);
        } else {
            $("#grAccount").hide();
            $('#txtBankAccount').prop('disabled', true);
        }
    });
    unit.$boxDetails.on('change', '#txtMethodPayment', function (e) {
        e.preventDefault();
        if (parseInt($("#txtMethodPayment").val()) === 1) {
            $("#grAccount").show();
            $('#txtBankAccount').prop('disabled', false);
        } else {
            $("#grAccount").hide();
            $('#txtBankAccount').prop('disabled', true);
        }
    });
    unit.$boxDetails.on('change', '#txtBizAccountType', function (e) {
        e.preventDefault();
        var id = $(this).val();
        var credit = $(this).find(':selected').data('credit') || '';
        var debt = $(this).find(':selected').data('debit') || '';
        if (credit != '') {
            unit.$boxDetails.find('#txtCreditAccount').val(credit);
        }
        if (credit != '') {
            unit.$boxDetails.find('#txtDebitAccount').val(debt);
        }
    });
});