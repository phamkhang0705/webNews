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
    this.$perDelete = $("#txtPerDelete").val();
    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table, index);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã tài sản',
                field: 'ProductCode',
                width: "100px",
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên tài sản',
                field: 'ProductName',
                width: "150px",
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhóm tài sản',
                field: 'CategoryName',
                width: "120px",
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhãn hiệu',
                field: 'BrandName',
                width: "120px",
                align: "left"
            })
            //, Sv.BootstrapTableColumn("Number", {
            //    title: 'Giá nhập',
            //    field: 'PriceInput',
            //    width: "150px",
            //    align: "right"
            //}), Sv.BootstrapTableColumn("Number", {
            //    title: 'Giá trị còn khấu hao',
            //    field: 'PriceSale',
            //    width: "150px",
            //    align: "right"
            //})

            , Sv.BootstrapTableColumn("Number", {
                title: 'Số lượng',
                field: 'Quantity',
                width: "150px",
                align: "right"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                width: "120px",
                align: "left",
                formatter: function (value, data) {
                    if (data.Active == 1) {
                        return "Đang kinh doanh";
                    } else {
                        return "Ngừng kinh doanh";
                    }
                }
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '200px',
                formatter: function (value, data, index) {
                    var str = "";
                    //str += "<button data-code='%s' class='OpenEditItemDetail btn btn-primary btn-in-table' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";

                    //str += "<button data-code='%s' class='OpenEditItemStorageCard btn btn-primary btn-in-table' title='Thẻ kho'><i class='fa fa-university'></i></button>";
                    //str += "<button data-code='%s' class='OpenEditItemInventory btn btn-primary btn-in-table' title='Tồn kho'><i class='fa fa-signal'></i></button>";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    if (base.$perDelete == 1) {
                        str += "<button data-code='%s' class='OpenEditItemDelete btn btn-primary btn-in-table' title='Xóa'><i class='fa fa-trash-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Asset/ShowModal";
                            var model = {
                                productCode: row.ProductCode, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .OpenEditItemDelete': function (e, value, row) {
                        Sv.ChecPermission("Delete", function () {
                            Dialog.ConfirmCustom("Xác nhận", 'Bạn có muốn ngừng kinh doanh tài sản ' + (row.ProductName == null ? 'này' : row.ProductName) + '?', function () {

                                base.SubmitServer("Delete", row.ProductId);
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            url: "/Admin/Asset/GetData",
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
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        Sv.Loading();
        var url = "/Asset/Delete";
        Sv.AjaxPost({
            Url: url,
            Data: { productId: id }
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
                    Sv.EndLoading();
                    Dialog.Alert("Có lỗi trong quá trình xử lý", Dialog.Error);
                });

    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.ProductCode = $('#txtProductCode').val();
        obj.ProductName = $('#txtProductName').val();
        obj.BrandName = $('#txtBrandName1').val();
        obj.CategoryCode = $('#ddlCategory :selected').val();
        obj.Active = $("#ddActive1 :selected").val();
        return obj;
    }

}
var productCode = '';
$(document).ready(function () {
    var unit = new Unit();
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        queryParams: function (p) {
            debugger;
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));
    unit.LoadTableSearch();
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Asset/ShowModal";
        var model = {
            id: 0,
            action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
        });
    });

});
