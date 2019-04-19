var active = 1;
var totalQuantity = 0;
var totalMoney = 0;
var totalSalePrice = 0;
var discountAmount = 0;
var discount = 0;
var discountPercent = 0;
var VAT = 0;
var isReopen = false;

var recaculateInvoice = function () {
    discount = Sv.round($("#txtDiscount0").val());
    discountPercent = Sv.round($("#txtDiscount1").val());
    totalQuantity = Sv.Sum(productSelect, "Quantity");
    totalMoney = Sv.Sum(productSelect, "TotalMoney");
    discountAmount = 0;
    VAT = Sv.round($("#txtVAT").val());

    if (parseInt($("#txtDiscounType").val()) == 0) {
        $("#typeMoney").show();
        $("#typePercent").hide();
        discountAmount = discount;
    } else {
        $("#typePercent").show();
        $("#typeMoney").hide();
        discountAmount = Math.round(totalMoney * discountPercent) / 100;
    }

    totalSalePrice = Math.round(totalMoney + (totalMoney * VAT / 100) - discountAmount);    //làm tròn
    var paidMoney = totalSalePrice;

    $("#txtTotalQuantity").val(Sv.FormatMoney(totalQuantity));
    $("#txtTotalMoney").val(Sv.FormatMoney(totalMoney));
    $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    $("#txtRemainMoney").val(totalSalePrice - paidMoney);
    $("#txtPayMoney").val(paidMoney);

    if (totalSalePrice - paidMoney >= 0) {
        $("#chkAddToProvider").prop('checked', true);
    } else {
        $("#chkAddToProvider").prop('checked', false);
    }
}

var init = function() {
    unit.$searchModal.find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
}

var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$table1 = $("#importHistory");
    this.$table2 = $("#deptImport");

    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();
    this.$btnOpenAdd = $("#btnSave");
    this.$btnComplete = $(".btnComplete");
    this.$btnSaveTemp = $(".btnTempSave");
    this.$btnBack = $(".btnBack");

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
                title: 'Mã hàng hóa',
                field: 'ProductCode',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên hàng hóa',
                field: 'ProductName',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Đơn giá',
                field: 'PriceInput',
                align: "center",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputQuantity" name="inputQuantity" id="inputPrice' + row.ProductCode + '" style="text-align: right;" value="' + row.PriceInput + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = productSelect.filter(function (p) {
                            return p.ProductCode === row.ProductCode;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].PriceInput = Sv.round($("#inputPrice" + row.ProductCode).val());
                            pro[0].TotalMoney = Sv.round(pro[0].PriceInput * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.ProductCode).html(Sv.FormatMoney(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số lượng',
                field: 'Quantity',
                align: "center",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputQuantity" name="inputQuantity" id="inputQuantity' + row.ProductCode + '" style="text-align: right;" value="' + row.Quantity + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = productSelect.filter(function (p) {
                            return p.ProductCode === row.ProductCode;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].Quantity = Sv.round($("#inputQuantity" + row.ProductCode).val());
                            pro[0].TotalMoney =Sv.round(pro[0].PriceInput * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.ProductCode).html(Sv.FormatMoney(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng tiền',
                field: 'TotalMonney',
                align: "center",
                valign: "middle",
                formatter: function (value, item) {
                    var price = (item.PriceInput != null && item.PriceInput != undefined) ? item.PriceInput : 0;
                    var quantity = (item.Quantity != null && item.Quantity != undefined) ? item.Quantity : 0;
                    var html = '<span id="totalMoney' + item.ProductCode + '">' + Sv.FormatMoney(Sv.round(price * quantity)) + '</span>';
                    return html;
                }
            }),
                Sv.BootstrapTableColumn("string", {
                    title: 'Thao tác',
                    align: "center",
                    valign: "middle",
                    width: "50px",
                    formatter: function (value, item) {
                        var html = "<button data-code='%s' class='delete btn btn-primary btn-in-table' title='Xóa sản phẩm'><i class='fa fa-remove'></i></button>";
                        return html;
                    }, events: {
                        'click .delete': function (e, value, row) {
                            for (var i = 0; i < productSelect.length; i++) {
                                if (productSelect[i].ProductCode == row.ProductCode) {
                                    productSelect.splice(i, 1);
                                    break;
                                }
                            }
                            recaculateInvoice();
                            unit.$table.bootstrapTable('load', productSelect);
                            $(".inputQuantity").number(true, 0);
                        }
                    }
                })];
        return obj;
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");ca
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
    base.GetFormData = function () {
        var data = {};
        data = Sv.getFormData($("#formDetail"));
        data.DiscountType = parseInt($("#txtDiscounType").val()) == 0 ? false : true;
        data.Active = active;
        data.TotalQuantity = totalQuantity;
        data.TotalMoney = totalMoney;
        data.ProductItems = productSelect;
        data.Discount = data.DiscountType ? discount : discountPercent;
        data.SumMonney = totalSalePrice;
        data.PaidMoney = $("#txtPayMoney").val();
        data.RemainMoney = Sv.round(data.SumMonney - data.PaidMoney);
        data.AddToProvider = $("#chkAddToProvider").is(':checked');
        data.ProviderCode = $("#ProviderCode").val();
        data.BankCode = $("#txtBankAccount").val();
        data.Code = $("#txtImportCode").val();
        data.CreateDate = $("#txtCreateDate").val();

        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/InvoiceImport/Create";
        if (action == "Edit") {
            url = "/InvoiceImport/Update";
        }

        if (action == "Complete" && !isReopen) {
            url = "/InvoiceImport/Create";
            active = 1;
        }
        if (action == "Complete" && isReopen) {
            url = "/InvoiceImport/Open";
            active = 1;
        }

        if (action == "SaveTemp") {
            url = "/InvoiceImport/Create";
            active = 0;
        }
        if (productSelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
            return;
        }
        else if ($("#ProviderCode").val() == "" || $("#ProviderCode").val() == null) {
            Dialog.Alert("Bạn chưa chọn nhà cung cấp", Dialog.Error);
            return;
        }

        Sv.Loading();
        Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
            function (rs) {
                Sv.EndLoading();
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success, "", function() {
                        window.location.reload();
                    });
                } else {
                    Dialog.Alert(rs.Message, Dialog.Error);
                }
            },
            function () {
                Sv.EndLoading();
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }

    this.validate = function () {
        if (productSelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
        }
        else if ($("#ProviderCode").val() == "" || $("#ProviderCode").val() == null) {
            Dialog.Alert("Bạn chưa chọn nhà cung cấp", Dialog.Error);
        }
        return true;
    }
}

var unit = new Unit();

var productSelect = [];

$(document).ready(function () {
    $('#divCreateDate').data("DateTimePicker").date(Sv.DefaultDate().Default);
    var loadTableSearch = function () {
        unit.$table.bootstrapTable('load', productSelect);
        $(".inputQuantity").number(true, 0);
    }

    unit.$table.bootstrapTable(Sv.BootstrapTableOptionClient({
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit

            };
        },
        columns: unit.Columns(),
        data: productSelect
    }));


    var params = Sv.getAllUrlParams(window.location.href);
    if (params.code != null && params.code != undefined) {
        $("#txtImportCode").attr("disabled", "disabled");
        Sv.AjaxPost({
            Url: "/InvoiceImport/GetInvoice",
            Data: { code: params.code }
        },
        function (data) {
            if (data != null) {
                isReopen = true;
                console.log(data);
                $(".btnTempSave").attr("disabled", "disabled");
                $("#selectedProvider").show();
                //Set data form
                $("#ProviderCode").val(data.ProviderCode);
                $("#txtProviderName").html(data.ProviderName);

                $("#txtImportCode").val(data.Code);
                $("#txtTotalQuantity").val(data.TotalQuantity);
                $("#txtTotalMoney").val(data.TotalMonney);
                $("#txtDiscounType").val(data.DiscountType);
                if (data.DiscountType == 0) {
                    $("#typeMoney").show();
                    $("#typePercent").hide();
                    $("#txtDiscount0").val(data.Discount);
                } else {
                    $("#typeMoney").hide();
                    $("#typePercent").show();
                    $("#txtDiscount1").val(data.Discount);
                }
                $("#txtVAT").val(data.VAT);
                $("#txtSalePrice").val(data.SumMonney);
                $("#txtPayMoney").val(data.PaidMonney);
                $("#txtRemainMoney").val(data.RemainMonney);
                $("#txtMethodPayment").val(data.PeymentMethod);
                $("#txtBankAccount").val(data.BankAccount);
                Sv.SetupDateAndSetDefault($('#divCreateDate'), data.CreateDate);
                $("#txtNote").val(data.Note);
                if (data.InvoiceDetails != null && data.InvoiceDetails != undefined) {
                    for (var i = 0; i < data.InvoiceDetails.length; i++) {
                        var pro = {};
                        pro.ProductCode = data.InvoiceDetails[i].ProductCode;
                        pro.ProductName = data.InvoiceDetails[i].ProductName;
                        pro.PriceInput = data.InvoiceDetails[i].Price;
                        pro.Quantity = data.InvoiceDetails[i].Quantity;
                        pro.TotalMoney = data.InvoiceDetails[i].TotalMonney;

                        productSelect.push(pro);
                    }
                }
                loadTableSearch();

            }


        },
        function () {
            Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
        });
    }

    //Auto complete input
    $("#txtSearchProduct").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "/InvoiceImport/GetProductData",
                    type: "POST",
                    dataType: "json",
                    data: { productName: $("#txtSearchProduct").val() },
                    success: function (data) {
                        response($.map(data,
                            function (item) {
                                return item;
                            }));

                    }
                });
            },
            response: function (event, ui) {
                // ui.content is the array that's about to be sent to the response callback.
                if (ui.content.length === 0) {
                    $("#empty-message").text("No results found");
                } else {
                    $("#empty-message").empty();
                }
            },
            focus: function (event, ui) {
                $("#txtSearchProduct").val(ui.item.ProductName);
                return false;
            },
            select: function (event, ui) {
                $("#txtSearchProduct").val("");
                var tmp = JSON.parse(JSON.stringify(ui.item));
                tmp.Quantity = 1;
                tmp.TotalMoney = tmp.PriceInput * tmp.Quantity;

                var check = productSelect.filter(function (p) {
                    return p.ProductCode === tmp.ProductCode;
                });
                if (check != null && check.length == 1) {
                    check[0].Quantity += tmp.Quantity;
                    check[0].TotalMoney += tmp.TotalMoney;
                }
                else {
                    productSelect.push(tmp);
                }
                //reCaculate bill invoice
                recaculateInvoice();
                loadTableSearch();
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.ProductName + "<br>" + item.PriceSale + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    $("#providerSelect").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "/InvoiceImport/GetProviders",
                    type: "POST",
                    dataType: "json",
                    data: { providerName: $("#providerSelect").val() },
                    success: function (data) {
                        response($.map(data,
                            function (item) {
                                return item;
                            }));

                    }
                });
            },
            response: function (event, ui) {
                // ui.content is the array that's about to be sent to the response callback.
                if (ui.content.length === 0) {
                    $("#empty-message").text("No results found");
                } else {
                    $("#empty-message").empty();
                }
            },
            focus: function (event, ui) {
                $("#providerSelect").val(ui.item.Text);
                return false;
            },
            select: function (event, ui) {
                $("#ProviderCode").val(ui.item.Name);
                $("#txtProviderName").html(ui.item.Text);
                $("#selectedProvider").show();
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.Text + "<br>" + item.Name + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    //Event input of form detail
    $("#txtPayMoney").keyup(function () {
        var pay = isNaN(parseFloat($("#txtPayMoney").val())) ? 0 : parseFloat($("#txtPayMoney").val());
        $("#txtRemainMoney").val(Sv.FormatMoney(totalSalePrice - pay));
        if (totalSalePrice - pay >= 0) {
            $("#chkAddToProvider").prop('checked', true);
        } else {
            $("#chkAddToProvider").prop('checked', false);
        }
    });
    $("#txtVAT").keyup(function () {
        VAT = isNaN(parseFloat($("#txtVAT").val())) ? 0 : parseFloat($("#txtVAT").val());
        totalSalePrice = Math.round(totalMoney + (totalMoney * VAT / 100) - discountAmount);    //làm tròn

        $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
        recaculateInvoice();
    });
    $("#txtDiscount0").keyup(function () {
        recaculateInvoice();
        $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    });
    $("#txtDiscount1").keyup(function () {
        var value = isNaN(parseFloat($("#txtDiscount1").val())) ? 0 : parseFloat($("#txtDiscount1").val());
        if (value > 100) $("#txtDiscount1").val("100");
        if (value < 0) $("#txtDiscount1").val("0");

        recaculateInvoice();
        $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    });

    $("#txtDiscounType").change(function () {
        recaculateInvoice();
    });

    $("#txtMethodPayment").change(function() {
        if (parseInt($("#txtMethodPayment").val()) == 1) {
            $("#grAccount").show();
        } else {
            $("#grAccount").hide();
        }
    });

    $("#txtSearchProduct").focusout(function () {
        $("#txtSearchProduct").val("");
    });
    $("#providerSelect").focusout(function () {
        $("#providerSelect").val("");
    });
    $("#btnAddProvider").click(function () {
        Sv.ChecPermission("View", function () {
            var url = "/Admin/Provider/ShowModal";
            var model = {
                id: 0, action: "Add"
            };
            Sv.BindPopup(url, model, function (rs) {
                unit.$boxDetails.html(rs);
                unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            });
        });
    });

    $("#deleteProvider").click(function () {
        $("#ProviderCode").val("");
        $("#txtProviderName").val("");
        $("#selectedProvider").hide();
    });

    //Shortcut event
    shortcut.add("F9", function () {
        unit.SubmitServer("Complete", 0);
    });
    shortcut.add("F2", function () {
        $("#txtSearchProduct").focus();
    });

    //Init only input number
    $("#txtPayMoney").number(true, 0);
    $("#txtVAT").number(true, 0);
    $("#txtDiscount0").number(true, 0);
    $("#txtDiscount1").number(true, 0);

    unit.$btnComplete.click(function () {
        unit.SubmitServer("Complete", 0);
    });
    unit.$btnSaveTemp.click(function () {
        unit.SubmitServer("SaveTemp", 0);
    });
    unit.$btnBack.click(function () {
        window.location.href = "/Admin/InvoiceImport";
    });

    //Add provider
    var Provider = function() {
        this.GetFormData = function () {
            var data = {};
            data.Id = $("#Id").val();
            data.Domain = $("#Domain").val();
            data.Code = $("#txtCode").val();
            data.Name = $("#txtName").val();
            data.Address = $("#txtAddress").val();
            data.Tel = $("#txtPhone").val();
            data.Active = $("#txtActive").val();
            data.Fax = $("#txtFax").val();
            data.Tax = $("#txtTax").val();
            data.Email = $("#txtEmail").val();
            data.Website = $("#txtWebsite").val();
            data.Note = $("#txtNote").val();
            data.Type = $("#txtProviderType").val();
            return data;
        }

        this.reloadDataProvider = function() {

        };

        //-- them sua xoa
        this.SubmitServer = function (action, id) {
            var $form = $("#formDetail").on();
            var _this = this;

            if ($form.valid(true)) {
                Sv.Loading();
                Sv.AjaxPost({
                    Url: "/Provider/Create",
                        Data: this.GetFormData()
                    },
                    function (rs) {
                        Sv.EndLoading();
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.Message, Dialog.Success);
                            unit.$boxDetails.find("#modalDetails").modal("hide");
                            _this.reloadDataProvider();
                        } else {
                            Dialog.Alert(rs.Message, Dialog.Error);
                        }
                    },
                    function () {
                        Sv.EndLoading();
                        Dialog.Alert("Lỗi server", Dialog.Error);
                    });
            }
        }
    }

    var provider = new Provider();

    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        provider.SubmitServer("Add", 0);
    });

});
