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
    totalQuantity = Sv.Sum(categorySelect, "Quantity");
    totalMoney = Sv.Sum(categorySelect, "TotalMoney");
    discountAmount = 0;
    VAT = Sv.round($("#txtVAT").val());

    if (parseInt($("#txtDiscounType").val()) === 0) {
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
        $("#chkAddTosupplier").prop('checked', true);
    } else {
        $("#chkAddTosupplier").prop('checked', false);
    }
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
                title: 'Mã danh mục',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên danh mục',
                field: 'Name',
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
                    html = '<input class="form-control inputChange inputPrice" name="inputPrice" id="inputPrice' + row.Code + '" style="text-align: right;" value="' + row.PriceInput + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return p.Code === row.Code;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].PriceInput = Sv.round($("#inputPrice" + row.Code).val());
                            pro[0].TotalMoney = Sv.round(pro[0].PriceInput * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Code).html(Sv.FormatMoney(pro[0].TotalMoney));
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
                    html = '<input class="form-control inputChange inputQuantity" name="inputQuantity" id="inputQuantity' + row.Code + '" style="text-align: right;" value="' + row.Quantity + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = categorySelect.filter(function (p) {
                            return p.Code === row.Code;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].Quantity = Sv.round($("#inputQuantity" + row.Code).val());
                            pro[0].TotalMoney = Sv.round(pro[0].PriceInput * pro[0].Quantity);
                            recaculateInvoice();
                            $("#totalMoney" + row.Code).html(Sv.FormatMoney(pro[0].TotalMoney));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng tiền',
                field: 'TotalMoney',
                align: "center",
                valign: "middle",
                formatter: function (value, item) {
                    var price = (item.PriceInput != null && item.PriceInput != undefined) ? item.PriceInput : 0;
                    var quantity = (item.Quantity != null && item.Quantity != undefined) ? item.Quantity : 0;
                    var html = '<span id="totalMoney' + item.Code + '">' + Sv.FormatMoney(Sv.round(price * quantity)) + '</span>';
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
                                if (categorySelect[i].Code === row.Code) {
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
        data.DiscountType = parseInt($("#txtDiscounType").val()) === "0" ? false : true;
        data.Active = active;
        data.TotalQuantity = totalQuantity;
        data.TotalMoney = totalMoney;
        data.CategoryItems = categorySelect;
        data.Discount = data.DiscountType ? discount : discountPercent;
        data.SumMoney = totalSalePrice;
        data.PaidMoney = $("#txtPayMoney").val();
        data.RemainMoney = Sv.round(data.SumMoney - data.PaidMoney);
        data.AddTosupplier = $("#chkAddTosupplier").is(':checked');
        data.SupplierCode = $("#txtSupplierCode").val();
        data.BankCode = $("#txtBankAccount").val();
        data.Code = $("#txtImportCode").val();
        data.CreateDate = $("#txtCreatedDate").val();
        data.VAT = $("#txtVAT").val();
        data.Note = $("#txtNote").val();
        data.PayMethod = $("#txtMethodPayment").val();
        data.Type = $("#txtType").val();

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
        if (categorySelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
            return;
        }
        else if ($("#txtSupplierCode").val() == "" || $("#txtSupplierCode").val() == null) {
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
                if (rs.Status === "01") {
                    Dialog.Alert(rs.Message, Dialog.Success, "", function () {
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
        if (categorySelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
        }
        else if ($("#txtSupplierCode").val() == "" || $("#txtSupplierCode").val() == null) {
            Dialog.Alert("Bạn chưa chọn nhà cung cấp", Dialog.Error);
        }
        return true;
    }
}

var unit = new Unit();

var categorySelect = [];

$(document).ready(function () {
    $('#divCreateDate').data("DateTimePicker").date(Sv.DefaultDate().Default);
    var loadTableSearch = function () {
        unit.$table.bootstrapTable('load', categorySelect);
        $(".inputQuantity").number(true, 0);
        $(".inputPrice").number(true, 0);
    }
    $("#txtSalePrice").attr("disabled", true);
    $("#txtRemainMoney").attr("disabled", true);

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
            Url: "/InvoiceImport/GetInvoice",
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
                $("#selectedSupplier").show();
                //Set data form
                $("#txtSupplierCode").val(data.SupplierCode);
                $("#txtSupplierName").html(data.SupplierName);

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
                if (data.InvoiceImportDetails != null && data.InvoiceImportDetails != undefined) {
                    for (var i = 0; i < data.InvoiceImportDetails.length; i++) {
                        var pro = {};
                        pro.Code = data.InvoiceImportDetails[i].CategoryCode;
                        pro.Name = data.InvoiceImportDetails[i].Name;
                        pro.PriceInput = data.InvoiceImportDetails[i].Price;
                        pro.Quantity = data.InvoiceImportDetails[i].Quantity;
                        pro.TotalMoney = data.InvoiceImportDetails[i].TotalMoney;
                        categorySelect.push(pro);
                    }
                }
                totalSalePrice = data.SumMoney;
                totalQuantity = data.TotalQuantity;
                totalMoney = data.TotalMoney;

                $("#txtSalePrice").attr("disabled", true);
                $("#txtRemainMoney").attr("disabled", true);
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
                url: "/InvoiceImport/GetCategoryData",
                type: "POST",
                dataType: "json",
                data: { categoryName: $("#txtSearchCategory").val() },
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
            var store = $('#txtType').val();
            tmp.Quantity = 1;
            tmp.PriceInput = store === "1" ? 0 : parseFloat(tmp.PriceInput);
            tmp.TotalMoney = tmp.PriceInput * tmp.Quantity;

            var check = categorySelect.filter(function (p) {
                return p.Code === tmp.Code;
            });
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
            var inner_html = '<p>' + item.Code + " - " + item.Name + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    $("#supplierSelect").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "/InvoiceImport/GetSupplierData",
                type: "POST",
                dataType: "json",
                data: { supplierName: $("#supplierSelect").val() },
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
            $("#supplierSelect").val(ui.item.CustomerName);
            return false;
        },
        select: function (event, ui) {
            $("#txtSupplierCode").val(ui.item.CustomerCode);
            $("#txtSupplierName").html(ui.item.CustomerName);
            $("#selectedSupplier").show();
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
        var pay = isNaN(parseFloat($("#txtPayMoney").val())) ? 0 : parseFloat($("#txtPayMoney").val());
        $("#txtRemainMoney").val(Sv.FormatMoney(totalSalePrice - pay));
        if (totalSalePrice - pay >= 0) {
            $("#chkAddTosupplier").prop('checked', true);
        } else {
            $("#chkAddTosupplier").prop('checked', false);
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

    $("#txtMethodPayment").change(function () {
        if (parseInt($("#txtMethodPayment").val()) == 1) {
            $("#grAccount").show();
        } else {
            $("#grAccount").hide();
        }
    });

    $("#txtSearchCategory").focusout(function () {
        $("#txtSearchCategory").val("");
    });
    $("#supplierSelect").focusout(function () {
        $("#supplierSelect").val("");
    });
    $("#btnAddsupplier").click(function () {
        Sv.ChecPermission("View", function () {
            var url = "/Admin/supplier/ShowModal";
            var model = {
                id: 0, action: "Add"
            };
            Sv.BindPopup(url, model, function (rs) {
                unit.$boxDetails.html(rs);
                unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            });
        });
    });

    $("#deletesupplier").click(function () {
        $("#txtSupplierCode").val("");
        $("#txtsupplierName").val("");
        $("#selectedsupplier").hide();
    });

    //Shortcut event
    shortcut.add("F9", function () {
        unit.SubmitServer("Complete", 0);
    });
    shortcut.add("F2", function () {
        $("#txtSearchCategory").focus();
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
});
