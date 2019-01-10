var invoiceCodeSearch;
var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$historyTable = $("#historyTable");
    this.$table2 = $("#deptImport");

    this.$btnSave = $("#btnSave");
    this.$btnCancle = $("#btnCancle");
    this.$btnRefund = $("#btnRefund");
    this.$btnReOpen = $("#btnReOpen");
    this.$btnPrint = $("#btnPrint");
    this.$btnExport = $("#btnExport");
    this.$btnClose = $("#btnClose");
    this.$btnDelete = $("#btnDelete");


    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();

    this.$modalSearch = $("#historyModal");

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
                title: 'Mã khấu hao',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreatDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    if (value == null || value == undefined) return "";
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }

            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    if (data.Active == 0) {
                        return "Phiếu tạm";
                    }
                    else if (data.Active == 1) {
                        return "Hoạt động";
                    }
                    else {
                        return "Hủy phiếu";
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ghi chú',
                field: 'Description',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Chi tiết'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    str += "<button data-code='%s' class='CancleItem btn btn-primary btn-in-table' title='Hủy bỏ phiếu'><i class='fa fa-close'></i></button>";
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/DepreciationAsset/GetInvoiceDetail";
                            var model = {
                                id: row.Id, code: row.Code, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefault($('#divCreateDate'), row.CreatDate);
                                if (row.Active == 0) {
                                    $("#btnReOpen").show();
                                    $("#btnDelete").show();
                                    $("#btnClose").show();
                                }
                                else if (row.Active == 1) {
                                    $("#btnSave").show();
                                    $("#btnPrint").show();
                                    $("#btnRefund").show();
                                    $("#btnExport").show();
                                    $("#btnCancle").show();
                                    $("#btnClose").show();
                                } else {
                                    $("#btnExport").show();
                                    $("#btnPrint").show();
                                }
                            });
                        });
                    },
                    'click .OpenHistoryItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            base.$modalSearch.modal({ backdrop: "static" });
                            invoiceCodeSearch = row.Code;
                            base.LoadHistoryTable();
                        });
                    },
                    'click .CancleItem': function (e, value, row, index) {
                        var url = "/Admin/DepreciationAsset/CancleInvoice";
                        var msg = "Bạn có chắc chắn muốn hủy không?";
                        if (row.Active == 0){
                            url = "/Admin/DepreciationAsset/Delete";
                            msg = "Bạn có chắc chắn muốn xóa không?";
                        }
                        Dialog.ConfirmCustom("",
                            msg,
                            function () {

                                Sv.Loading();
                                Sv.AjaxPost({
                                    Url: url,
                                    Data: { invoiceCode: row.Code }
                                },
                                function (rs) {
                                    Sv.EndLoading();
                                    if (rs.Status == "01") {
                                        Dialog.Alert(rs.Message, Dialog.Success);
                                        base.$boxDetails.find("#modalDetails").modal("hide");
                                        base.OpentDisable();
                                        base.LoadTableSearch();
                                    }
                                },
                                function () {
                                    Sv.EndLoading();
                                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
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
        data.Id = $("#Id").val();
        data.Domain = $("#Domain").val();
        data.Code = $("#txtCode").val();
        data.Name = $("#txtName").val();
        data.Address = $("#txtAddress").val();
        data.Tel = $("#txtPhone").val();
        data.Active = $("#txtActive").val();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/DepreciationAsset/Create";
        if (action == "Edit") {
            url = "/DepreciationAsset/Update";
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
                        base.OpentDisable();
                        base.LoadTableSearch();
                    }
                },
                function () {
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        }

    }
    this.OpentDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCode']").prop('disabled', true);
    }
    this.CloseDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCode']").prop('disabled', false);
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#txtSearchCode').val();
        obj.Status = $("#txtSearchActive").val();
        obj.FromDate = $("#txtFDate").val();
        obj.ToDate = $("#txtTDate").val();
        return obj;
    }

}
var unit = new Unit();
$(document).ready(function () {
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/DepreciationAsset/GetData",
        queryParams: function (p) {
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
        unit.$searchModal.find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
        unit.$searchModal.find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
        ////Max date
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });

    unit.$btnOpenAdd.click(function () {
        window.location.href = "/Admin/DepreciationAsset/Add";
    });

    unit.$boxDetails.on('click', 'button#btnSave', function (e) {
        e.preventDefault();
        Sv.AjaxPost({
            Url: "/Admin/DepreciationAsset/Update",
                Data: {
                    invoiceCode: $("#Code").val(),
                    status: -1,
                    createDate: $('#txtCreateDate').val(),
                    note: $("#txtDescription").val()
                }
            },
            function (rs) {
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    base.$boxDetails.find("#modalDetails").modal("hide");
                    base.OpentDisable();
                    base.LoadTableSearch();
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    });
    unit.$boxDetails.on('click', 'button#btnCancle', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
            "Bạn có chắc chắn muốn hủy không?",
            function () {
                Sv.Loading();
                Sv.AjaxPost({
                    Url: "/Admin/DepreciationAsset/CancleInvoice",
                    Data: { invoiceCode: $("#txtCode").val() }
                },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.OpentDisable();
                        base.LoadTableSearch();
                    }
                },
                function () {
                    Sv.EndLoading();
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
            });
    });
    unit.$boxDetails.on('click', 'button#btnRefund', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
            "Bạn có chắc chắn muốn hủy không?",
            function () {
                Sv.Loading();
                Sv.AjaxPost({
                    Url: "/Admin/DepreciationAsset/Refund",
                    Data: { invoiceCode: $("#txtCode").val() }
                },
               function (rs) {
                   Sv.EndLoading();
                   if (rs.Status == "01") {
                       Dialog.Alert(rs.Message, Dialog.Success);
                       base.$boxDetails.find("#modalDetails").modal("hide");
                       base.OpentDisable();
                       base.LoadTableSearch();
                   }
               },
               function () {
                   Sv.EndLoading();
                   Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
               });
            });
    });
    unit.$boxDetails.on('click', 'button#btnReOpen', function (e) {
        e.preventDefault();
        window.location = "DepreciationAsset/Add?code=" + $("#Code").val();
    });
    unit.$boxDetails.on('click', 'button#btnPrint', function (e) {
        e.preventDefault();

    });
    unit.$boxDetails.on('click', 'button#btnExport', function (e) {
        e.preventDefault();

    });
    unit.$boxDetails.on('click', 'button#btnDelete', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
            "Bạn có chắc chắn muốn xóa không?",
            function () {
                Sv.Loading();
                Sv.AjaxPost({
                    Url: "/Admin/DepreciationAsset/Delete",
                    Data: { invoiceCode: $("#txtCode").val() }
                },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.OpentDisable();
                        base.LoadTableSearch();
                    }
                },
                function () {
                    Sv.EndLoading();
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
            });
    });
    unit.$boxDetails.on('click', 'button#btnClose', function (e) {
        e.preventDefault();
        unit.$boxDetails.find("#modalDetails").modal("hide");
    });
});
