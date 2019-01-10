var active = 1;
var realTotalQuantity = 0;
var totalQuantity = 0;

var isReopen = false;

var recaculateInvoice = function () {
    realTotalQuantity = Sv.Sum(productSelect, "RealTotalQuantity");
    totalQuantity = Sv.Sum(productSelect, "TotalQuantity");

    $("#txtTotalQuantity").html(Sv.FormatMoney(realTotalQuantity));
}

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
                title: 'Tồn kho',
                field: 'Quantity',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Kiểm thực tế',
                field: 'RealTotalQuantity',
                align: "center",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputQuantity" name="inputQuantity" id="inputQuantity' + row.ProductCode + '" style="text-align: right;" value="' + row.RealTotalQuantity + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = productSelect.filter(function (p) {
                            return p.ProductCode === row.ProductCode;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].RealTotalQuantity = $("#inputQuantity" + row.ProductCode).val();
                            pro[0].QuantityFail = pro[0].RealTotalQuantity - pro[0].Quantity;
                            recaculateInvoice();
                            $("#quantityFail" + row.ProductCode).html(Sv.FormatMoney(pro[0].QuantityFail));
                        }
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Chênh lệch',
                field: 'QuantityFail',
                align: "center",
                valign: "middle",
                formatter: function (value, item) {
                    var html = '<span id="quantityFail' + item.ProductCode + '">' + Sv.FormatMoney(item.RealTotalQuantity - item.Quantity) + '</span>';
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
        data.Active = active;
        data.TotalQuantity = realTotalQuantity;
        data.Code = $("#txtImportCode").val();

        data.ProductItems = productSelect;

        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/StoreCheck/Create";
        if (action == "Edit") {
            url = "/StoreCheck/Update";
        }

        if (action == "Complete" && !isReopen) {
            url = "/StoreCheck/Create";
            active = 1;
        }
        if (action == "Complete" && isReopen) {
            url = "/StoreCheck/Open";
            active = 1;
        }

        if (action == "SaveTemp") {
            url = "/StoreCheck/Create";
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
                        Dialog.Alert(rs.Message, Dialog.Success,"",function() {
                            window.location.reload();
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
                Url: "/StoreCheck/GetInvoice",
                Data: { code: params.code }
            },
            function(data) {
                if (data != null) {
                    isReopen = true;
                    console.log(data);
                    $(".btnTempSave").attr("disabled", "disabled");
                    //Set data form
                    $("#txtImportCode").val(data.Code);
                    $("#txtTotalQuantity").html(data.TotalQuantity);

                    Sv.SetupDateAndSetDefault($('#divCreateDate'), data.CreateDate);
                    $("#txtNote").val(data.Note);

                    for (var i = 0; i < data.ProductItems.length; i++) {
                        var pro = {};
                        pro.ProductCode = data.ProductItems[i].ProductCode;
                        pro.ProductName = data.ProductItems[i].ProductName;
                        pro.Quantity = data.ProductItems[i].Quantity;
                        pro.TotalQuantity = data.ProductItems[i].TotalQuantity;
                        pro.RealTotalQuantity = data.ProductItems[i].RealTotalQuantity;
                        pro.QuantityFail = data.ProductItems[i].RealTotalQuantity - data.ProductItems[i].TotalQuantity;

                        productSelect.push(pro);
                    }
                    recaculateInvoice();

                    loadTableSearch();

                }


            },
            function() {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    } else {
        Sv.SetupDateAndSetDefault($('#divCreateDate'), Sv.DefaultDate().FormDate);
    }

    //Auto complete input
    $("#txtSearchProduct").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "/StoreCheck/GetProductData",
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
                tmp.RealTotalQuantity = 0;
                var check = productSelect.filter(function (p) {
                    return p.ProductCode === tmp.ProductCode;
                });
                if (check != null && check.length == 1) {
                    return;
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
            var inner_html = '<p>' + item.ProductName + "<br>" + "Đơn giá: " + item.PriceSale + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    //Event input of form detail
    $("#txtSearchProduct").focusout(function () {
        $("#txtSearchProduct").val("");
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
        window.location.href = "/Admin/StoreCheck";
    });

});
