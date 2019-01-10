var giftId = '';
var productId = '';
var storeId = '';
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
                title: 'Tên chương trình',
                field: 'Name',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Hàng hoá',
                field: 'ProductName',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Kho',
                field: 'StoreName',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Quà tặng/Gói quà tặng',
                field: 'TypeName',
                align: "left",
                width: "150px"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên quà tặng/Gói quà tặng',
                field: 'GiftOrGiftPackageName',
                align: "left",
                width: "180px"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày áp dụng',
                field: 'DateBegin',
                align: "center",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : '';
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày kết thúc',
                field: 'DateEnd',
                align: "center",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : '';
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giảm giá',
                field: 'Discount',
                align: "right",
                formatter: function (value, row) {
                    return (value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "");
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            giftId = row.GiftOrGiftPackageId;
                            productId = row.ProductId;
                            storeId = row.StoreId;
                            var url = "/Admin/Promotion/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                if ($('#formDetail select#txtType').val() == "1") {
                                    $('#txtGiftId').removeClass("hidden");
                                } else {
                                    $('#txtGiftPackageId').removeClass("hidden");
                                }
                                getAllStoreByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtStoreId', false);
                                Sv.SetupDateAndSetDefault($('#formDetail #divBeginDate'), row.DateBegin);
                                Sv.SetupDateAndSetDefault($('#formDetail #divEndDate'), row.DateEnd);
                                getAllGiftPackageByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftPackageId', true);
                                getAllGiftByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftId', true);

                                jQuery(function () {
                                    $('#formDetail #txtDiscount').number(true, 2);
                                });
                            });
                        });
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
        data.Id = $("#formDetail").find('input[type="hidden"][name="Id"]').val();
        data.Name = $("#formDetail").find('#txtName').val();
        data.BranchCode = $("#formDetail").find('#txtBranchCode').val();
        data.StoreId = $("#formDetail").find('#txtStoreId').val();
        data.Type = $("#formDetail").find('#txtType').val();
        data.Discount = $("#formDetail").find('#txtDiscount').val();
        data.ProductId = $("#formDetail").find('#txtProductId').val();
        data.DateBegin = $("#formDetail").find('#txtDateBegin').val();
        data.DateEnd = $("#formDetail").find('#txtDateEnd').val();
        data.GiftId = $("#formDetail").find('#txtProductId').val();
        data.GiftPackageId = $("#formDetail").find('#txtGiftPackageId').val();
        if ($('#formDetail #txtType').val() == "1") {
            data.GiftOrGiftPackageId = data.GiftId;
        } else {
            data.GiftOrGiftPackageId = data.GiftPackageId;
        }
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var product = $("#formDetail").find('#txtProductId').val();
        var gift = $("#formDetail").find('#txtGiftId').val();
        var giftPackage = $("#formDetail").find('#txtGiftPackageId').val();
        var discount = $("#formDetail").find('#txtDiscount').val();
        if (product != "-1") {
            if (gift == "-1" && giftPackage == "-1" && discount == "") {
                Dialog.Alert("Vui lòng chọn quà tặng/gói quà tặng hoặc giảm giá!");
                return false;
            }
        }
        var url = "/Promotion/Create";
        if (action == "Edit") {
            url = "/Promotion/Update";
        }
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
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
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.BranchCode = $('#txtBranchCode').val();
        obj.Name = $('#txtName').val();
        obj.Type = $('#txtType').val();
        obj.BeginDate = $('#txtBeginDate').val();
        obj.EndDate = $('#txtEndDate').val();
        obj.ProductId = $('#txtProductId').val();
        return obj;
    }
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
                    var selected = value.Id == storeId ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + ' >' + value.Name + '</option>');
                });
        $("#txtStoreId").trigger("change");
        getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), $('#modalDetails').find('select#txtStoreId').val(), '#formDetail #txtProductId', true);
    },
        function (error) {
            Dialog.Alert('Tải kho thất bại', Dialog.Error);
        });
}
var getAllProductByBranch = function (branchCode, storeId, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/Promotion/GetProductData',
        Data: { branchCode: branchCode, storeId: storeId }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Chọn hàng hoá</option>');
        if (!$.isEmptyObject(response))
            $.each(response,
                function (key, value) {
                    var selected = value.Id == productId ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + ' >' + value.ProductName + '</option>');
                });
        $('#formDetail #txtProductId').trigger('change');
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

var getAllGiftByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/Promotion/GetAllGiftByBranch',
        Data: { branchCode: branchCode }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Chọn quà tặng</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    var selected = value.Id == giftId ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + ' >' + value.Name + '</option>');
                });
        $('#txtGiftId').trigger('change');
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

var getAllGiftPackageByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/Promotion/GetAllGiftPackageByBranch',
        Data: { branchCode: branchCode }
    }, function (response) {
        $(controlSelect).empty();
        if (optionAll)
            $(controlSelect).append('<option value="-1">Chọn gói quà tặng</option>');
        if (!$.isEmptyObject(response.data))
            $.each(response.data,
                function (key, value) {
                    var selected = value.Id == giftId ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.Name + '</option>');
                    //$('#txtGiftPackageId').val().trigger('change');
                });
        $('#txtGiftPackageId').trigger('change');
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

$(document).ready(function () {
    var unit = new Unit();

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Promotion/GetData",
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
        $('#divBeginDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
        $('#divBeginDate').data("DateTimePicker").maxDate(Sv.DefaultDate().FormDate);
        $('#divEndDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
        $('#divEndDate').data("DateTimePicker").maxDate(Sv.DefaultDate().FormDate);
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        $('#txtBranchCode').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Promotion/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            var aaa = $('select#txtType').val();
            if ($('#formDetail select#txtType').val() == "1") {
                $('#txtGiftId').removeClass("hidden");
                $('#txtGifTId').val("-1").trigger('change');
            } else {
                $('#txtGiftPackageId').removeClass("hidden");
                $('#txtGiftPackageId').val("-1").trigger('change');
            }
            jQuery(function () {
                $('#formDetail #txtDiscount').number(true, 2);
            });
            getAllStoreByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtStoreId', false);
            getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtProductId', true);
            getAllGiftPackageByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftPackageId', true);
            getAllGiftByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftId', true);
            Sv.SetupDateAndSetDefault($('#formDetail #divBeginDate'), new Date());
            Sv.SetupDateAndSetDefault($('#formDetail #divEndDate'), new Date());
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

    unit.$boxDetails.on('change', 'select#txtBranchCode', function () {
        getAllStoreByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtStoreId', false);
        getAllProductByBranch($('#modalDetails').find('select#txtBranchCode').val(), $('#modalDetails').find('select#txtStoreId').val(), '#txtProductId', true);
        getAllGiftPackageByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftPackageId', true);
        getAllGiftByBranch($('#modalDetails').find('select#txtBranchCode').val(), '#txtGiftId', true);
    });

    unit.$boxDetails.on('change', 'select#txtType', function () {
        if ($('#formDetail #txtType').val() == '1') {
            if ($('#formDetail #txtGiftId').hasClass('hidden')) {
                $('#formDetail #txtGiftId').removeClass("hidden");
            }
            $('#formDetail #txtGiftPackageId').addClass("hidden");
        } else {
            if ($('#formDetail #txtGiftPackageId').hasClass('hidden')) {
                $('#formDetail #txtGiftPackageId').removeClass("hidden");
            }
            $('#formDetail #txtGiftId').addClass("hidden");
        }
    });
});