var totalProduct = 0;
var recaculateInvoice = function () {
    totalProduct = Sv.Sum(productSelect, "QuantityTranfer");
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
    this.$txtToBranchCode = $('#txtToBranchCode');

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
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tồn kho nơi nhận',
                field: 'QuantityDes',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số lượng',
                field: 'TotalProduct',
                align: "center",
                valign: "middle",
                formatter: function (value, row, index) {
                    var html = "";
                    html = '<input class="form-control inputChange inputQuantityTranfer" name="QuantityTranfer" id="inputQuantityTranfer' + row.ProductCode + '" style="text-align: right;" value="' + row.QuantityTranfer + '"/>';
                    return html;
                },
                events: {
                    'keyup .inputChange': function (e, value, row) {
                        var pro = productSelect.filter(function (p) {
                            return p.ProductCode === row.ProductCode;
                        });
                        if (pro != null && pro.length > 0) {
                            pro[0].QuantityTranfer = parseFloat($("#inputQuantityTranfer" + row.ProductCode).val());
                            recaculateInvoice();
                        }
                    }
                }
            }), Sv.BootstrapTableColumn("string", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function () {
                    var str = "";
                    str +=
                        "<button data-code='%s' class='OpenDeleteItem btn btn-primary btn-in-table' title='Xóa'><i class='fa fa-remove'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenDeleteItem': function (value, row, index) {
                        Dialog.ConfirmCustom("Xác nhận",
                            "Bạn có chắc chắn xóa hàng hóa này? ",
                            function () {
                                productSelect.splice(index, 1);
                                $('#table').bootstrapTable('load', productSelect);
                            });
                    }
                }
            }
            )];
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
        var url = "/TransferProduct/Create";
        if (action == "Complete" && id == 0) {
            url = "/TransferProduct/Create";
            active = 1;
        }
        if (action == "SaveTemp" && id == 0) {
            url = "/TransferProduct/Create";
            active = 2;
        }
        if (action == "Complete" && id == 1) {
            url = "/TransferProduct/UpdateTransferProductTempSave";
            active = 1;
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
                                window.location.href = '/Admin/TransferProduct';
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
    this.GetQuantityToBranch = function (branchCode, storeId) {
        Sv.AjaxPost({
            Url: "/TransferProduct/GetProductData",
            Data: {
                productName: '',
                branchCode: branchCode,
                storeId: storeId
            }
        }, function (rs) {
            productSelectStoreId = rs;
            if (productSelect != null && productSelect.length > 0)
                for (var i = 0; i < productSelect.length; i++) {
                    productSelect[i].QuantityDes = 0;
                    if (productSelectStoreId != null && productSelectStoreId.length > 0) {
                        for (var j = 0; j < productSelectStoreId.length; j++) {
                            if (productSelect[i].ProductCode == productSelectStoreId[j].ProductCode) {
                                productSelect[i].QuantityDes = productSelectStoreId[j].Quantity;
                            }
                        }
                    }

                }
            loadTableSearch();
        });
    }
    this.GetAllStoreByBranch = function (branchCode, controlSelect, optionAll) {
        Sv.AjaxPost({
            Url: '/TransferProduct/GetStoreByBranchCode',
            Data: {
                branchCode: branchCode
            }
        }, function (response) {
            var val = $(controlSelect).val();
            var selected = '';
            $(controlSelect).empty();
            if (optionAll)
                $(controlSelect).append('<option value="-1">Tất cả</option>');
            if (!$.isEmptyObject(response.data))
                $.each(response.data, function (key, value) {
                    selected = response.data = val ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '" ' + selected + '>' + value.Name + '</option>');
                });
            $("select#txtToStoreId").trigger("change");
            //$("select#txtToStoreId").val(val).trigger("change");
            base.GetQuantityToBranch($('select#txtToBranchCode').val(), $('select#txtToStoreId').val());
        },
            function (error) {
                Dialog.Alert('Tải kho thất bại', Dialog.Error);
            });
    }
}

var unit = new Unit();

var productSelect = [];
var productSelectStoreId = [];

$(document).ready(function () {

    LoadTableDetail();
    LoadBranchAndStore(); if ($('#txtAction').val() == "Edit") {
        Sv.SetupDateAndSetDefault($('#txtDate'), $('#txtDate').val());
    } else {
        $('#divDate').data("DateTimePicker").date(Sv.DefaultDate().Default);
        ////Max date
        $('#divDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
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
                url: "/TransferProduct/GetProductData",
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
            tmp.QuantityTranfer = 1;
            var check = productSelect.filter(function (p) {
                return p.ProductCode === tmp.ProductCode;
            });
            if (check != null && check.length == 1) {
                check[0].QuantityTranfer += tmp.QuantityTranfer;
            }
            else {
                productSelect.push(tmp);
            }
            unit.GetQuantityToBranch($('select#txtToBranchCode').val(), $('select#txtToStoreId').val());
            recaculateInvoice();
            loadTableSearch();
            return false;
        }
    })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.ProductName + "<br>" + (item.PriceSale != null ? (parseInt(item.PriceSale)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0) + '</p>';
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
        var action = $('#txtAction').val();
        if (action == "Edit") {
            unit.SubmitServer("Complete", 1);
        } else {
            unit.SubmitServer("Complete", 0);
        }
    });
    unit.$btnSaveTemp.click(function () {
        unit.SubmitServer("SaveTemp", 0);
    });
    unit.$btnBack.click(function () {
        if ($('#txtAction').val() == "Edit") {
            window.location.href = window.location.href
        } else {
            window.location.href = "/Admin/TransferProduct";
        }

    });


    unit.$txtToBranchCode.change(function () {
        LoadBranchAndStore();
    });
    //LoadBranchAndStore();
});

var LoadBranchAndStore = function () {
    unit.GetAllStoreByBranch($('select#txtToBranchCode').val(), '#txtToStoreId', false);
}

var loadTableSearch = function () {
    unit.$table.bootstrapTable('load', productSelect);
    $(".inputQuantityTranfer").number(true, 0);
}

var LoadTableDetail = function () {
    var transId = $('input[type="hidden"][name="Id"]').val();
    Sv.AjaxPost({
        Url: '/TransferProduct/GetTransferProductDtl',
        Data: {
            id: transId
        }
    }, function (response) {
        productSelect = response.data;
        for (var i = 0; i < productSelect.length; i++) {
            productSelect[i].QuantityTranfer = productSelect[i].QuantityTransfer;
        }
        loadTableSearch();
        recaculateInvoice();
    });
}