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
                title: 'Mã phiếu thu',
                field: 'PaymentCode',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Phiếu nhập',
                field: 'InvoiceCode',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreatedDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm') : "";
                }
            }),

            Sv.BootstrapTableColumn("string", {
                title: 'Tên nhân viên',
                field: 'UserName',
                align: "left"
            }),

            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Tổng tiền',
                field: 'TotalMoney'
            }),
            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Đã thanh toán',
                field: 'PaidMoney',
                formatter: function (value, row, index) {
                    return row.TotalMoney - row.RemainMoney;
                }
            }),
            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Nợ lại',
                field: 'RemainMoney'
            }),

            Sv.BootstrapTableColumn("string", {
                title: 'Tên NCC',
                field: 'Payments_Person',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngân hàng',
                field: 'BankCode',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Mô tả',
                field: 'Description',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                filed: 'Status',
                align: "left",
                width: '150px',
                title: 'Trạng thái',
                formatter: function (value, row, index) {
                    if (row.Status === 1) {
                        return 'Hoạt động';
                    }
                    else {
                        return 'Ngừng hoạt động';
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit === "1") {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PaymentVoucher/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                base.OpentDisable();
                            });
                        });
                    }
                }
            })];
        return obj;
    }

    this.OpentDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCode']").prop('disabled', true);
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total === 0) {
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
        var $form = $("#formDetail").on();
        var url = "/PaymentVoucher/Create";
        if (action === "Edit") {
            url = "/PaymentVoucher/Update";
        }
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    if (rs.Status === "01") {
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
        obj.Code = $('#txtPaymentCode').val();
        obj.Status = $("#txtSearchActive").val();
        obj.FromDate = $("#divFromDate").data('DateTimePicker').date();
        obj.ToDate = $("#divToDate").data('DateTimePicker').date();
        return obj;
    }
}

$(document).ready(function () {
    var unit = new Unit();
//    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));

    $("#formSearch").find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $("#formSearch").find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/PaymentVoucher/GetData",
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/PaymentVoucher/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
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
});