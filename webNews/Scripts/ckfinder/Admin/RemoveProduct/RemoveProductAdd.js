var totalProduct = 0;
var recaculateInvoice = function () {
    totalProduct = Sv.Sum(productSelect, "Quantity");
    $("#lbTotalProduct").text(Sv.FormatMoney(totalProduct));
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
                title: 'Số lượng hủy',
                field: 'TotalProduct',
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
                            pro[0].Quantity = parseFloat($("#inputQuantity" + row.ProductCode).val());
                            recaculateInvoice();
                        }
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
        data.TotalProduct = totalProduct;
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/RemoveProduct/Create";
        if (action == "Complete") {
            url = "/RemoveProduct/Create";
            active = 1;
        }
        if (action == "SaveTemp") {
            url = "/RemoveProduct/Create";
            active = 2;
        }

        // if ($form.valid(true)) {
        if (base.validate()) {
            Sv.Loading();
            Sv.AjaxPost({
                Url: url,
                Data: {
                    listRPDetail: JSON.stringify(productSelect),
                    model: base.GetFormData(),
                    active: active
                }
            },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success, function () {
                            setTimeout(function () {
                                window.location.href = '/Admin/RemoveProduct';
                            },
                                3000);
                        });
                        base.$boxDetails.find("#modalDetails").modal("hide");
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                });
        }

    }

    this.validate = function () {
        if (productSelect.length < 1) {
            Dialog.Alert("Bạn chưa chọn sản phẩm", Dialog.Error);
            return false;
        }
        return true;
    }
}

var unit = new Unit();

var productSelect = [];

$(document).ready(function () {
    $('#divDate').data("DateTimePicker").date(Sv.DefaultDate().Default);
    ////Max date
    $('#divDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
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

    //Auto complete input
    $("#txtSearchProduct").autocomplete({
        minLength: 0,
        source: function (request, response) {
            $.ajax({
                url: "/RemoveProduct/GetProductData",
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
            var check = productSelect.filter(function (p) {
                return p.ProductCode === tmp.ProductCode;
            });
            if (check != null && check.length == 1) {
                check[0].Quantity += tmp.Quantity;
            }
            else {
                productSelect.push(tmp);
            }
            recaculateInvoice();
            loadTableSearch();
            return false;
        }
    })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.ProductName + "<br>" + (item.PriceSale != null ? item.PriceSale.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0) + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

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

    unit.$btnComplete.click(function () {
        unit.SubmitServer("Complete", 0);
    });
    unit.$btnSaveTemp.click(function () {
        unit.SubmitServer("SaveTemp", 0);
    });
    unit.$btnBack.click(function () {
        window.location.href = "/Admin/RemoveProduct";
    });

});
