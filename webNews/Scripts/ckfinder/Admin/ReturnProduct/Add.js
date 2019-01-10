var active = 1;
var totalQuantity = 0;
var totalMoney = 0;
var totalSalePrice = 0;
var discountAmount = 0;
var discount = 0;
var discountPercent = 0;
var VAT = 0;

var recaculateInvoice = function () {
    discount = isNaN(parseFloat($("#txtDiscount0").val())) ? 0 : parseFloat($("#txtDiscount0").val());
    discountPercent = isNaN(parseFloat($("#txtDiscount1").val())) ? 0 : parseFloat($("#txtDiscount1").val());
    totalQuantity = Sv.Sum(productSelect, "Quantity");
    totalMoney = Sv.Sum(productSelect, "TotalMoney");
    discountAmount = 0;
    VAT = isNaN(parseFloat($("#txtVAT").val())) ? 0 : parseFloat($("#txtVAT").val());

    if (parseInt($("#txtDiscounType").val()) == 0) {
        $("#typeMoney").show();
        $("#typePercent").hide();
        discountAmount = discount;
    } else {
        $("#typePercent").show();
        $("#typeMoney").hide();
        discountAmount = totalMoney * discountPercent / 100;
    }
    totalSalePrice = (totalMoney - discountAmount) * (100 + VAT) / 100;

    $("#txtTotalQuantity").val(Sv.FormatMoney(totalQuantity));
    $("#txtTotalMoney").val(Sv.FormatMoney(totalMoney));
    $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    $("#txtRemainMoney").val(0);
    $("#txtPayMoney").val(totalSalePrice);
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
                title: 'Giá trả lại',
                field: 'ReturnPrice',
                align: "center",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputQuantity" name="inputQuantity" id="inputPrice' + row.ProductCode + '" style="text-align: right;" value="' + row.ReturnPrice + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = productSelect.filter(function (p) {
                            return p.ProductCode === row.ProductCode;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].ReturnPrice = parseFloat($("#inputPrice" + row.ProductCode).val());
                            pro[0].TotalMoney = pro[0].ReturnPrice * pro[0].Quantity;
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
                            pro[0].Quantity = $("#inputQuantity" + row.ProductCode).val();
                            pro[0].TotalMoney = pro[0].ReturnPrice * pro[0].Quantity;
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
                    var price = (item.ReturnPrice != null && item.ReturnPrice != undefined) ? item.ReturnPrice : 0;
                    var quantity = (item.Quantity != null && item.Quantity != undefined) ? item.Quantity : 0;
                    var html = '<span id="totalMoney' + item.ProductCode + '">' + Sv.FormatMoney(price * quantity) + '</span>';
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
                base.$searchModal.modal("hide"); ca
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
        data.Discount = data.DiscountType ? discountAmount : discount;
        data.SumMonney = totalSalePrice;
        data.RemainMoney = data.SumMonney - data.PaidMoney;
        data.AddToProvider = $("#chkAddToProvider").is(':checked');
        data.ProviderCode = $("#ProviderCode").val();
        data.BankCode = $("#txtBankAccount").val();

        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/ReturnProvider/Create";
        if (action == "Edit") {
            url = "/ReturnProvider/Update";
        }

        if (action == "Complete") {
            url = "/ReturnProvider/Create";
            active = 1;
        }

        if (action == "SaveTemp") {
            url = "/ReturnProvider/Create";
            active = 0;
        }



        // if ($form.valid(true)) {
        if (base.validate()) {
            Sv.Loading();
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success, "", function () {
                            window.location.href = "/Admin/ReturnProvider/Add";
                        });
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                },
                function () {
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        }

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
var productProvider = [];

var checkProductProvider = function (productCode) {
    var valid = true;
    var result = "Các sản phẩm sau không thuộc nhà cung cấp: ";

    if (productCode != null) {
        var check = productProvider.filter(function (p) {
            return p.ProductCode === productCode;
        });
        if (check == null || check.length == 0) {
            for (var i = 0; i < productSelect.length; i++) {
                if (productSelect[i].ProductCode == productCode) {
                    productSelect.splice(i, 1);
                }
            }
            valid = false;
            result += productCode;
            return "Sản phẩm " + productCode + " không thuộc nhà cung cấp!";
        }
        return true;
    } else {
        for (var i = 0; i < productSelect.length; i++) {
            var check = productProvider.filter(function (p) {
                return p.ProductCode === productSelect[i].ProductCode;
            });
            if (check == null || check.length == 0) {
                valid = false;
                result += productSelect[i].ProductName + "; ";
            }
        }
        if (!valid)
            return result;
        else
            return true;
    }

}

$(document).ready(function () {

    $('#divCreateDate').data("DateTimePicker").date(Sv.DefaultDate().Default);
    //Init only input number
    $("#txtPayMoney").number(true);
    $("#txtVAT").number(true, 0);
    $("#txtDiscount0").number(true, 0);
    $("#txtDiscount1").number(true, 0);
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
        var url = "/ReturnProvider/GetInvoice";
        if (params.type != null && params.type != undefined && params.type == 1) {
            url = "/InvoiceImport/GetInvoice";
        }
        Sv.AjaxPost({
            Url: url,
            Data: { code: params.code }
        },
            function (data) {
                if (data != null) {
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
                    $("#txtPayMoney").val(data.TotalMonney);
                    $("#txtRemainMoney").val(0);
                    $("#txtMethodPayment").val(data.PeymentMethod);
                    $("#txtBankAccount").val(data.BankAccount);
                    Sv.SetupDateAndSetDefault($('#divCreateDate'), data.CreateDate);
                    $("#txtNote").val(data.Note);
                    if (data.InvoiceDetails != null && data.InvoiceDetails != undefined) {
                        for (var i = 0; i < data.InvoiceDetails.length; i++) {
                            var pro = {};
                            pro.ProductCode = data.InvoiceDetails[i].ProductCode;
                            pro.ProductName = data.InvoiceDetails[i].ProductName;
                            pro.Quantity = data.InvoiceDetails[i].Quantity;
                            if (params.type != null && params.type != undefined && params.type == 1) {

                                pro.PriceSale = data.InvoiceDetails[i].Price;
                                pro.ReturnPrice = data.InvoiceDetails[i].Price;
                                pro.TotalMoney = data.InvoiceDetails[i].TotalMonney;
                            } else {
                                pro.PriceSale = data.InvoiceDetails[i].PriceEnd;
                                pro.ReturnPrice = data.InvoiceDetails[i].PriceEnd;
                                pro.TotalMoney = data.InvoiceDetails[i].TotalMoney;
                            }

                            productSelect.push(pro);
                        }
                    }
                    loadTableSearch();
                    recaculateInvoice();
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
            var tmp = JSON.parse(JSON.stringify(ui.item));
            tmp.Quantity = 1;
            tmp.ReturnPrice = tmp.PriceSale;
            tmp.TotalMoney = tmp.ReturnPrice * tmp.Quantity;

            var check = productSelect.filter(function (p) {
                return p.ProductCode === tmp.ProductCode;
            });
            if (check != null && check.length == 1) {
                check[0].Quantity += parseFloat(tmp.Quantity);
                check[0].TotalMoney = check[0].Quantity * check[0].ReturnPrice;
            }
            else {
                productSelect.push(tmp);
            }


            $("#txtSearchProduct").val("");
            var checkProduct = checkProductProvider(ui.item.ProductCode);
            if (checkProduct !== true) {
                Dialog.Alert(checkProduct, Dialog.Error);
                return;
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

            Sv.AjaxPost({
                Url: "/ReturnProvider/GetProductProvider",
                Data: { providerCode: ui.item.Name }
            },
                function (data) {
                    if (data != null) {
                        productProvider = data;
                        var check = checkProductProvider();
                        if (check !== true) {
                            Dialog.Alert(check, Dialog.Error);
                        }
                    }
                },
                function () {
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });

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
    });
    $("#txtVAT").keyup(function () {
        VAT = isNaN(parseFloat($("#txtVAT").val())) ? 0 : parseFloat($("#txtVAT").val());
        totalSalePrice = (totalMoney - discountAmount) * (100 + VAT) / 100;

        $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    });
    $("#txtDiscount0, #txtDiscount1").keyup(function () {
        recaculateInvoice();
        $("#txtSalePrice").val(Sv.FormatMoney(totalSalePrice));
    });

    $("#txtDiscounType").change(function () {
        recaculateInvoice();
    });

    $("#txtMethodPayment").change(function () {
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


    unit.$btnComplete.click(function () {
        unit.SubmitServer("Complete", 0);
    });
    unit.$btnSaveTemp.click(function () {
        unit.SubmitServer("SaveTemp", 0);
    });
    unit.$btnBack.click(function () {
        window.location.href = "/Admin/ReturnProvider";
    });

});
