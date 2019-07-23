var active = 1;
var totalQuantity = 0;
var totalMoney = 0;
var totalDeposit = 0;
var totalTransport = 0;
var totalSalePrice = 0;
var discountAmount = 0;
var totalDepositDiscount = 0;
var discount = 0;
var discountPercent = 0;
var totalSumMoney = 0;
var VAT = 0;
var isReopen = false;
var changeDeposit = 0;
var changeTotalSale = 0;
var changePayment = 0;
var remainMoney = 0;
var isDiscountCustomer = false;
var recaculateInvoice = function () {
    discount = Sv.round($("#txtDiscount0").val());
    discountPercent = Sv.round($("#txtDiscount1").val());
    totalQuantity = Sv.Sum(categorySelect, "Quantity");
    totalMoney = Sv.Sum(categorySelect, "TotalMoney");
    totalDeposit = Sv.Sum(categorySelect, "Deposits_Money");
    totalTransport = Sv.Sum(categorySelect, "Transport_Money");
    discountAmount = 0;
    VAT = Sv.round($("#txtVAT").val());
    totalDepositDiscount = isDiscountCustomer == true ? Sv.round($("#txtTotalDepositDiscount").val()) : 0;
    var newDeposit = Sv.round($("#txtTotalDeposit").val());
    if (changeDeposit > 0) {
        totalDeposit = newDeposit;
    }
    var newSalePrice = Sv.round($("#txtSalePrice").val());

    if (parseInt($("#txtDiscounType").val()) === 0) {
        $("#typeMoney").show();
        $("#typePercent").hide();
        discountAmount = discount;
    } else {
        $("#typePercent").show();
        $("#typeMoney").hide();
        discountAmount = Math.round(totalMoney * discountPercent) / 100;
    }
    totalSumMoney = totalMoney + totalDeposit - (totalDeposit * totalDepositDiscount / 100) + totalTransport;
    if (changeTotalSale > 0) {
        //trường hợp combo tặng khách
        totalSalePrice = newSalePrice;
    } else {
        totalSalePrice = Math.round(totalSumMoney - (totalSumMoney * VAT / 100) - discountAmount);    //làm tròn
    }

    var newPayment = Sv.round($("#txtPayMoney").val());
    if (changePayment > 0) {
        remainMoney = newPayment;
    } else {
        remainMoney = totalSalePrice;
    }

    $("#txtTotalQuantity").val(totalQuantity);
    $("#txtTotalMoney").val(totalMoney);
    $("#txtTotalDeposit").val(totalDeposit);
    $("#txtTotalTransport").val(totalTransport);
    $("#txtSalePrice").val(totalSalePrice);
    $("#txtRemainMoney").val(remainMoney);
    $("#txtPayMoney").val(totalSalePrice - remainMoney);
}

var init = function () {
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
                title: 'Mã sản phẩm',
                field: 'ProductCode',
                align: "center",
                valign: "middle",
                width: "100px",
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên sản phẩm',
                field: 'ProductName',
                align: "center",
                width: "200px",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giá',
                field: 'Price',
                align: "center",
                width: "100px",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputPrice" name="inputPrice" id="inputPrice' + row.Id + '" style="text-align: right;" value="' + row.Price + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return (p.Id === row.Id) && (p.ProductCode === row.ProductCode);
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].Price = Sv.round($("#inputPrice" + row.Id).val());
                            pro[0].Deposits_Money = Sv.round($("#inputDeposit" + row.Id).val());
                            pro[0].Transport_Money = Sv.round($("#inputTransport" + row.Id).val());
                            pro[0].TotalMoney = Sv.round(pro[0].Price * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Id).html(Sv.NumberToString(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tiền cọc',
                field: 'Deposits_Money',
                align: "center", width: "100px",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputPrice" name="inputDeposit" id="inputDeposit' + row.Id + '" style="text-align: right;" value="' + row.Deposits_Money + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return (p.Id === row.Id) && (p.ProductCode === row.ProductCode);
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].Price = Sv.round($("#inputPrice" + row.Id).val());
                            pro[0].Deposits_Money = Sv.round($("#inputDeposit" + row.Id).val());
                            pro[0].Transport_Money = Sv.round($("#inputTransport" + row.Id).val());
                            pro[0].TotalMoney = Sv.round(pro[0].Price * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Id).html(Sv.NumberToString(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tiền vận chuyển',
                field: 'Transport_Money',
                align: "center", width: "100px",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputPrice" name="inputTransport" id="inputTransport' + row.Id + '" style="text-align: right;" value="' + row.Transport_Money + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return (p.Id === row.Id) && (p.ProductCode === row.ProductCode);
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].Price = Sv.round($("#inputPrice" + row.Id).val());
                            pro[0].Deposits_Money = Sv.round($("#inputDeposit" + row.Id).val());
                            pro[0].Transport_Money = Sv.round($("#inputTransport" + row.Id).val());
                            pro[0].TotalMoney = Sv.round(pro[0].Price * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Id).html(Sv.NumberToString(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số lượng',
                field: 'Quantity',
                align: "center", width: "100px",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputPrice" name="inputQuantity" id="inputQuantity' + row.Id + '" style="text-align: right;" value="' + row.Quantity + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return (p.Id === row.Id) && (p.ProductCode === row.ProductCode);
                        });
                        if (pro != null && pro.length > 0) {
                            var quantity = $('#inputQuantity' + row.Id).val();
                            pro[0].Price = Sv.round($("#inputPrice" + row.Id).val());
                            pro[0].Deposits_Money = Sv.round($("#inputDeposit" + row.Id).val());
                            pro[0].Transport_Money = Sv.round($("#inputTransport" + row.Id).val());
                            pro[0].TotalMoney = Sv.round(pro[0].Price * quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Id).html(Sv.NumberToString(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng tiền',
                field: 'TotalMoney',
                align: "center", width: "100px",
                valign: "middle",
                formatter: function (value, item) {
                    var price = (item.Price != null && item.Price != undefined) ? item.Price : 0;
                    var quantity = (item.Quantity != null && item.Quantity != undefined) ? item.Quantity : 0;
                    var html = '<span id="totalMoney' + item.Id + '">' + Sv.NumberToString(Sv.round(price * quantity)) + '</span>';
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
                            for (var i = 0; i < categorySelect.length; i++) {
                                if (categorySelect[i].Id === row.Id) {
                                    categorySelect.splice(i, 1);
                                    break;
                                }
                            }
                            recaculateInvoice();
                            unit.$table.bootstrapTable('load', categorySelect);
                            $(".inputQuantity").number(true, 0);
                            $(".inputPrice").number(true, 0);
                        }
                    }
                })];
        return obj;
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
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
        data.DiscountType = parseInt($("#txtDiscounType").val()) === 0 ? false : true;
        data.Active = active;
        data.TotalQuantity = totalQuantity;
        data.TotalMoney = totalMoney;
        data.CategoryItems = categorySelect;
        data.Discount = data.DiscountType ? discountPercent : discount;
        data.SumMoney = totalSalePrice;
        data.PaidMoney = $("#txtPayMoney").val();
        data.RemainMoney = Sv.round(data.SumMoney - data.PaidMoney);
        data.CustomerCode = $("#txtCustomerCode").val();
        data.BankCode = $("#txtBankAccount").val();
        data.Code = $("#txtImportCode").val();
        data.CreateDate = $("#txtCreatedDate").val();
        data.VAT = $("#txtVAT").val();
        data.Note = $("#txtNote").val();
        data.PayMethod = $("#txtMethodPayment").val();
        data.InvoiceType = $("#txtType").val();
        data.TotalDeposit = $("#txtTotalDeposit").val();
        data.TotalTransport = $("#txtTotalTransport").val();
        data.TotalDepositDiscount = $("#txtTotalDepositDiscount").val();
        data.DeliveryDate = $("#txtDeliveryDate").val();
        data.DeliveryAddress = $("#txtAddress").val();
        console.log(data);
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/InvoiceRental/Create";
        if (action == "Edit") {
            url = "/InvoiceRental/Update";
        }

        if (action == "Complete" && !isReopen) {
            url = "/InvoiceRental/Create";
            active = 1;
        }
        if (action == "Complete" && isReopen) {
            url = "/InvoiceRental/Open";
            active = 1;
        }

        if (action == "SaveTemp") {
            url = "/InvoiceRental/Create";
            active = 0;
        }
        if (categorySelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
            return;
        }
        else if ($("#txtCustomerCode").val() == "" || $("#txtCustomerCode").val() == null) {
            Dialog.Alert("Bạn chưa chọn khách hàng", Dialog.Error);
            return;
        }
        Sv.AjaxPost({
            Url: url,
            Data: base.GetFormData()
        },
            function (rs) {
                if (rs.Status === "01") {
                    Dialog.Alert(rs.Message, Dialog.Success, "", function () {
                        window.location.href = "/InvoiceRental/Index";
                    });
                } else {
                    Dialog.Alert(rs.Message, Dialog.Error);
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }

    this.validate = function () {
        if (categorySelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
        }
        else if ($("#txtCustomerCode").val() == "" || $("#txtCustomerCode").val() == null) {
            Dialog.Alert("Bạn chưa chọn nhà cung cấp", Dialog.Error);
        }
        return true;
    }
    this.getDeliveryDate = function () {
        var type = $('#txtType').val();
        var num_days = 0;
        switch (type) {
            case '2W':
                num_days = 15;
                break;
            case '1W':
                num_days = 8;
                break;
            case '1M':
                num_days = 31;
                break;
        }
        $('#txtDeliveryDate').val(moment().add(num_days, 'days').format('DD/MM/YYYY HH:mm'));
    }
}

var unit = new Unit();

var categorySelect = [];

$(document).ready(function () {
    Sv.SetupInputDate($('#txtCreatedDate'));
    Sv.SetupInputDate($('#txtDeliveryDate'));
    unit.getDeliveryDate();
    var loadTableSearch = function () {
        unit.$table.bootstrapTable('load', categorySelect);
        $(".inputQuantity").number(true, 0);
        $(".inputPrice").number(true, 0);
    }

    $("#txtRemainMoney").attr("disabled", true);
    $("#txtBankAccount").attr("disabled", true);
    $("#txtSalePrice").attr("disabled", true);
    var $example = $("#txtDiscounType").select2();
    $example.select2("close");
    unit.$table.bootstrapTable(Sv.BootstrapTableOptionClient({
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns(),
        data: categorySelect
    }));
    var params = Sv.getAllUrlParams(window.location.href);
    if (params.code != null && params.code != undefined) {
        $("#txtImportCode").attr("disabled", "disabled");
        Sv.AjaxPost({
            Url: "/InvoiceRental/GetInvoice",
            Data: { code: params.code }
        },
        function (data) {
            if (data != null) {
                isReopen = true;
                if (data.Active == 1) {
                    $(".btnComplete").prop("disabled", true);
                }
                console.log(data);
                $(".btnTempSave").attr("disabled", "disabled");
                $("#selectedCustomer").show();
                //Set data form
                $("#txtCustomerCode").val(data.CustomerCode);
                $("#txtCustomerName").html(data.CustomerName);

                $("#txtImportCode").val(data.Code);
                $("#txtTotalQuantity").val(data.TotalQuantity);
                $("#txtTotalMoney").val(data.TotalMoney);
                $("#txtDiscounType").val(data.DiscountType);
                if (data.DiscountType === 0) {
                    $("#typeMoney").show();
                    $("#typePercent").hide();
                    $("#txtDiscount0").val(data.Discount);
                } else {
                    $("#typeMoney").hide();
                    $("#typePercent").show();
                    $("#txtDiscount1").val(data.Discount);
                }
                $("#txtVAT").val(data.VAT);
                $("#txtSalePrice").val(data.SumMoney);
                $("#txtPayMoney").val(data.PaidMoney);
                $("#txtRemainMoney").val(data.RemainMoney);
                $("#txtMethodPayment").val(data.PayMethod);
                $("#txtBankAccount").val(data.BankAccount);
                Sv.SetupDateAndSetDefault($('#divCreatedDate'), data.CreatedDate);
                $("#txtNote").val(data.Note);
                $("#txtTotalDeposit").val(data.TotalDeposit);
                $("#txtTotalTransport").val(data.TotalTransport);
                if (data.InvoiceRentalDetails != null && data.InvoiceRentalDetails != undefined) {
                    for (var i = 0; i < data.InvoiceRentalDetails.length; i++) {
                        var pro = {};
                        pro.Id = data.InvoiceRentalDetails[i].ProductId;
                        pro.ProductId = data.InvoiceRentalDetails[i].ProductId;
                        pro.ProductCode = data.InvoiceRentalDetails[i].ProductCode;
                        pro.ProductName = data.InvoiceRentalDetails[i].ProductName;
                        pro.Price = data.InvoiceRentalDetails[i].Price;
                        pro.Quantity = data.InvoiceRentalDetails[i].Quantity;
                        pro.TotalMoney = data.InvoiceRentalDetails[i].TotalMoney;
                        pro.Deposits_Money = data.InvoiceRentalDetails[i].Deposits_Money;
                        pro.Transport_Money = data.InvoiceRentalDetails[i].Transport_Money;
                        categorySelect.push(pro);
                    }
                }
                totalSalePrice = data.SumMoney;
                totalQuantity = data.TotalQuantity;
                totalMoney = data.TotalMoney;
                totalDeposit = data.TotalDeposit;
                totalTransport = data.TotalTransport;

                $("#txtSalePrice").attr("disabled", true);
                $("#txtRemainMoney").attr("disabled", true);
                $("#txtType").val(data.InvoiceType).trigger('change');;
                loadTableSearch();
            }
        },
        function () {
            Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
        });
    }

    //Auto complete input
    $("#txtSearchCategory").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "/InvoiceRental/GetProductData",
                type: "POST",
                dataType: "json",
                data: { productName: $("#txtSearchCategory").val(), type: $('#txtType').val() },
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
            $("#txtSearchCategory").val(ui.item.Name);
            return false;
        },
        select: function (event, ui) {
            $("#txtSearchCategory").val("");
            var tmp = JSON.parse(JSON.stringify(ui.item));
            console.log(tmp);
            tmp.Quantity = 1;
            tmp.ProductId = tmp.Id;
            tmp.Price = parseFloat(tmp.Price);
            tmp.TotalMoney = tmp.Price * tmp.Quantity;

            var check = categorySelect.filter(function (p) {
                return (p.Id === tmp.Id) && (p.ProductCode === tmp.ProductCode);
            });
            console.log(check);
            if (check != null && check.length == 1) {
                check[0].Quantity += tmp.Quantity;
                check[0].TotalMoney += tmp.TotalMoney;
            }
            else {
                console.log(tmp);
                categorySelect.push(tmp);
            }
            //reCaculate bill invoice
            recaculateInvoice();
            loadTableSearch();
            return false;
        }
    })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p id="' + item.Id + '">' + item.Id + " - " + item.ProductCode + " - " + item.ProductName + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    $("#customerSelect").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "/InvoiceRental/GetCustomerData",
                type: "POST",
                dataType: "json",
                data: { customerName: $("#customerSelect").val() },
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
            $("#customerSelect").val(ui.item.CustomerName);
            return false;
        },
        select: function (event, ui) {
            $("#txtCustomerCode").val(ui.item.CustomerCode);
            $("#txtCustomerName").html(ui.item.CustomerName);
            $("#selectedCustomer").show();
            if (ui.item.num_trans > 0) {
                isDiscountCustomer = true;
                $('.TotalDepositDiscount').show();
                $('#txtDiscounType').val('1').trigger('change');
                $("#txtTotalDepositDiscount").prop("disabled", true);
            }
            return false;
        }
    })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.CustomerCode + "<br>" + item.CustomerName + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    //Event input of form detail
    $("#txtPayMoney").keyup(function () {
        changePayment++;
        //        var pay = isNaN(parseFloat($("#txtPayMoney").val())) ? 0 : parseFloat($("#txtPayMoney").val());
        //        $("#txtRemainMoney").val(Sv.FormatMoney(totalSalePrice - pay));
        recaculateInvoice();
    });

    $("#txtTotalDeposit").keyup(function () {
        changeDeposit++;
        recaculateInvoice();
    });

    $("#txtVAT").keyup(function () {
        VAT = isNaN(parseFloat($("#txtVAT").val())) ? 0 : parseFloat($("#txtVAT").val());
        totalSalePrice = Math.round(totalMoney + (totalMoney * VAT / 100) - discountAmount);    //làm tròn
        $("#txtSalePrice").val(totalSalePrice);
        recaculateInvoice();
    });
    $("#txtDiscount0").keyup(function () {
        recaculateInvoice();
        $("#txtSalePrice").val(totalSalePrice);
    });
    $("#txtDiscount1").keyup(function () {
        var value = isNaN(parseFloat($("#txtDiscount1").val())) ? 0 : parseFloat($("#txtDiscount1").val());
        if (value > 100) $("#txtDiscount1").val("100");
        if (value < 0) $("#txtDiscount1").val("0");

        recaculateInvoice();
        $("#txtSalePrice").val(totalSalePrice);
    });

    $("#txtDiscounType").change(function () {
        recaculateInvoice();
    });

    $("#checkboxChange").change(function () {
        if ($('#checkboxChange').prop('checked') == true) {
            $('#txtSalePrice').prop('disabled', false);
        } else {
            $('#txtSalePrice').prop('disabled', true);
        }
    });

    $("#txtSalePrice").keyup(function () {
        changeTotalSale++;
        recaculateInvoice();
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

    $("#txtSearchCategory").focusout(function () {
        $("#txtSearchCategory").val("");
    });
    $("#customerSelect").focusout(function () {
        $("#customerSelect").val("");
    });
    $("#btnAddCustomer").click(function () {
        Sv.ChecPermission("View", function () {
            var url = "/Admin/CustomerManagement/ShowModal";
            var model = {
                id: 0, action: "Add"
            };
            Sv.BindPopup(url, model, function (rs) {
                unit.$boxDetails.html(rs);
                unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            });
        });
    });

    $("#deleteCustomer").click(function () {
        $("#txtCustomerCode").val("");
        $("#txtCustomerName").val("");
        $("#selectedCustomer").hide();
    });

    //Shortcut event
    shortcut.add("F9", function () {
        unit.SubmitServer("Complete", 0);
    });
    shortcut.add("F2", function () {
        $("#txtSearchCategory").focus();
    });

    //Init only input number
    $("#txtTotalMoney").number(true, 0);
    $("#txtPayMoney").number(true, 0);
    $("#txtTotalDeposit").number(true, 0);
    $("#txtTotalTransport").number(true, 0);
    $("#txtSalePrice").number(true, 0);
    $("#txtVAT").number(true, 0);
    $("#txtDiscount0").number(true, 0);
    $("#txtDiscount1").number(true, 0);
    $("#txtRemainMoney").number(true, 0);


    unit.$btnComplete.click(function () {
        unit.SubmitServer("Complete", 0);
    });
    unit.$btnSaveTemp.click(function () {
        unit.SubmitServer("SaveTemp", 0);
    });
    unit.$btnBack.click(function () {
        window.location.href = "/Admin/InvoiceRental";
    });

    //Add customer
    var Customer = function () {
        this.GetFormData = function () {
            var formData = $('#formDetail').serialize();
            formData += "&CustomerCode=" + $('#formDetail #txtCustomerCode').val();
            return formData;
        }

        this.reloadDataProvider = function () {

        };

        //-- them sua xoa
        this.SubmitServer = function (action, id) {
            var $form = $("#formDetail").on();
            var _this = this;

            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: "/CustomerManagement/Create",
                    Data: this.GetFormData()
                },
                    function (rs) {
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.Message, Dialog.Success);
                            unit.$boxDetails.find("#modalDetails").modal("hide");
                            _this.reloadDataProvider();
                        } else {
                            Dialog.Alert(rs.Message, Dialog.Error);
                        }
                    },
                    function () {
                        Dialog.Alert("Lỗi server", Dialog.Error);
                    });
            }
        }
        this.GetDistrictByProvinceId = function (provinceId, districtId, controlSelect, optionAll) {
            Sv.AjaxPost({
                Url: '/CustomerManagement/GetDistrictByProvinceId',
                Data: {
                    provinceId: provinceId
                }
            }, function (response) {
                var val = $(controlSelect).val();
                var selected = '';
                $(controlSelect).empty();
                if (optionAll)
                    $(controlSelect).append('<option value="-1">Tất cả</option>');
                if (!$.isEmptyObject(response))
                    $.each(response, function (key, value) {
                        selected = districtId === value.Id ? "selected" : "";
                        $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.name + '</option>');
                    });
            },
            function (error) {
                Dialog.Alert('Tải quận huyện thất bại', Dialog.Error);
            });
        }

        this.GetWardByDistrictId = function (districtId, wardId, controlSelect, optionAll) {
            Sv.AjaxPost({
                Url: '/CustomerManagement/GetWardByDistrictId',
                Data: {
                    districtId: districtId
                }
            }, function (response) {
                var val = $(controlSelect).val();
                var selected = '';
                $(controlSelect).empty();
                if (optionAll)
                    $(controlSelect).append('<option value="-1">Tất cả</option>');
                if (!$.isEmptyObject(response))
                    $.each(response, function (key, value) {
                        selected = wardId === value.Id ? "selected" : "";
                        $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.name + '</option>');
                    });
            },
            function (error) {
                Dialog.Alert('Tải phường/xã thất bại', Dialog.Error);
            });
        }
    }

    var customer = new Customer();

    unit.$boxDetails.on('change', '#txtProvinceId', function (e) {
        e.preventDefault();
        var provinceId = $('#txtProvinceId').val();
        customer.GetDistrictByProvinceId(provinceId, null, '#txtDistrictId', true);
    });

    unit.$boxDetails.on('change', '#txtDistrictId', function (e) {
        e.preventDefault();
        var districtId = $('#txtDistrictId').val();
        customer.GetWardByDistrictId(districtId, null, '#txtWardId', true);
    });
    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        customer.SubmitServer("Add", 0);
    });
    $('#txtType').on('change', function (e) {
        unit.getDeliveryDate();
    });
});
