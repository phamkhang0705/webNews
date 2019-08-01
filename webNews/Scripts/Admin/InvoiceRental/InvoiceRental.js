var invoiceCodeSearch;
var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$historyTable = $("#historyTable");
    this.$table2 = $("#deptImport");

    this.$btnSave = $("#btnSave");
    this.$btnCancel = $("#btnCancel");
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
                title: 'Mã phiếu',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreatedDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Khách hàng',
                field: 'CustomerName',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng số lượng',
                field: 'TotalQuantity',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng tiền',
                field: 'SumMoney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    if (data.Active === 0) {
                        return "Phiếu tạm";
                    } else if (data.Active === 1) {
                        return '<div class="alert alert-warning"><strong>Chờ giao</strong></div>';
                    } else if (data.Active === 2) {
                        return '<div class="alert alert-danger"><strong>Đã hủy</strong></div>';
                    } else if (data.Active === 3) {
                        return '<div class="alert alert-info"><strong>Đang thuê</strong></div>';
                    } else if (data.Active === 4) {
                        return '<div class="alert alert-success"><strong>Đã thu</strong></div>';
                    } else if (data.Active === 5) {
                        return '<div class="alert alert-complete"><strong>Hoàn thành</strong></div>';
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, row, index) {//
                    var str = "";
                    str += "<button data-code='%s' class='OpenViewItem btn btn-primary btn-in-table' title='Chi tiết'><i class='fa fa-eye'></i></button>";
                    if (row.Active == 0) {
                        if (base.$perEdit == 1) {
                            str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Chi tiết'><i class='fa fa-pencil-square-o'></i></button>";
                        }
                    }
                    if (row.Active == 0 || row.Active == 1) {
                        if (base.$perEdit == 1) {
                            str += "<button data-code='%s' class='CancelItem btn btn-primary btn-in-table' title='Hủy bỏ phiếu'><i class='fa fa-close'></i></button>";
                        }
                    }

                    return str;
                },
                events: {
                    'click .OpenViewItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/InvoiceRental/GetInvoiceDetail";
                            var model = {
                                id: row.Id, code: row.Code, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefault($('#divCreatedDate'), row.CreatedDate);
                                Sv.SetupDateAndSetDefault($('#divDeliveryDate'), row.DeliveryDate);
                                base.$boxDetails.find("#txtCreatedDate").prop('disabled', true);
                                base.$boxDetails.find("#txtDeliveryDate").prop('disabled', true);
                                if (row.Active == 0) {
                                    $("#btnDelete").show();
                                }
                                else if (row.Active == 1) {
                                    $("#btnSave").show();
                                    $("#btnTemp").show();
                                } else if (row.Active == 4) {
                                    $("#btnSave").show();
                                    $("#btnComplete").show();
                                }
                                $("#btnClose").show();
                                $('#txtNote').prop('disabled', true);
                            });
                        });
                    },
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("Edit", function () {
                            window.location = "/InvoiceRental/Add?code=" + row.Code;
                        });
                    },
                    'click .OpenHistoryItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            base.$modalSearch.modal({ backdrop: "static" });
                            invoiceCodeSearch = row.Code;
                            base.LoadHistoryTable();
                        });
                    },
                    'click .CancelItem': function (e, value, row, index) {
                        var url = "/Admin/InvoiceRental/CancelInvoice";
                        var msg = "Bạn có muốn hủy phiếu nhập này?";
                        if (row.Active == 0) {
                            url = "/Admin/InvoiceRental/Delete";
                            msg = "Bạn có muốn xóa phiếu nhập này?";
                        }


                        Dialog.ConfirmCustom("", msg, function () {
                            Sv.AjaxPost({
                                Url: url,
                                Data: { invoiceCode: row.Code }
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

                    }
                }
            })];
        return obj;
    }

    this.HisColumns = function () {
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
                title: 'Mã phiếu',
                field: 'Payments_Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'Payments_CreatDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Người tạo',
                field: 'Payments_UserName',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'HT thanh toán',
                field: 'Payments_Method',
                align: "center",
                width: '100px',
                valign: "middle",
                formatter: function (value, data, index) {
                    if (value == 1) {
                        return "Tiền mặt";
                    }
                    else if (value == 2) {
                        return "Thẻ";
                    }
                    else {
                        return "Ngân hàng";
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Payments_Active',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    if (value == 0) {
                        return "Phiếu tạm";
                    }
                    else if (value == 1) {
                        return "Hoạt động";
                    }
                    else {
                        return "Hủy phiếu";
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tiền chi',
                field: 'Payments_TotalMoney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
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

    this.LoadHistoryTable = function () {
        base.$historyTable.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total == 0) {
                    base.$historyTable.bootstrapTable('removeAll');
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
        var url = "/InvoiceRental/Create";
        if (action == "Edit") {
            url = "/InvoiceRental/Update";
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
                        window.location.href = "/InvoiceRental/Index";
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
        obj.ProviderCode = $('#txtSearchProviderCode').val();
        obj.BranchCode = $("#txtSearchBranchCode").val();
        obj.Status = $("#txtSearchActive").val();
        obj.FromDate = $("#divFromDate").data('DateTimePicker').date();
        obj.ToDate = $("#divToDate").data('DateTimePicker').date();
        return obj;
    }
    this.SetDateTime = function () {
        base.$searchModal.find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().StartOfMonth).format('DD/MM/YYYY HH:mm');
        base.$searchModal.find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate).format('DD/MM/YYYY HH:mm');
    }
}

var unit = new Unit();

$(document).ready(function () {
    unit.SetDateTime();
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/InvoiceRental/GetData",
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit

            };
        },
        columns: unit.Columns()
    }));

    unit.$historyTable.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/InvoiceRental/GetHistoryData",
        queryParams: function (p) {
            return {
                code: invoiceCodeSearch,
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.HisColumns()
    }));

    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
        unit.SetDateTime();
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });

    unit.$btnOpenAdd.click(function () {
        window.location.href = "/Admin/InvoiceRental/Add";
    });

    unit.$boxDetails.on('click', 'button#btnSave', function (e) {
        e.preventDefault();
        Sv.AjaxPost({
            Url: "/Admin/InvoiceRental/Update",
            Data: {
                invoiceCode: $("#Code").val(),
                status: -1,
                date: $('#txtCreateDate').val(),
                note: $("#txtNote").val()
            }
        },
            function (rs) {
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    unit.$boxDetails.find("#modalDetails").modal("hide");
                    unit.OpentDisable();
                    unit.LoadTableSearch();
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    });
    unit.$boxDetails.on('click', 'button#btnTemp', function (e) {
        e.preventDefault();
        Sv.AjaxPost({
            Url: "/Admin/InvoiceRental/Update",
            Data: {
                invoiceCode: $("#Code").val(),
                status: 0,
                date: $('#txtCreateDate').val(),
                note: $("#txtNote").val()
            }
        },
            function (rs) {
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    unit.$boxDetails.find("#modalDetails").modal("hide");
                    unit.OpentDisable();
                    unit.LoadTableSearch();
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    });
    unit.$boxDetails.on('click', 'button#btnComplete', function (e) {
        e.preventDefault();
        Sv.AjaxPost({
            Url: "/Admin/InvoiceRental/Update",
            Data: {
                invoiceCode: $("#Code").val(),
                status: 5,
                date: $('#txtCreateDate').val(),
                note: $("#txtNote").val()
            }
        },
            function (rs) {
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    unit.$boxDetails.find("#modalDetails").modal("hide");
                    unit.OpentDisable();
                    unit.LoadTableSearch();
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    });

    unit.$boxDetails.on('click', 'button#btnCancel', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
                "Bạn chắc chắn hủy hóa đơn này?",
                function () {
                    Sv.Loading();
                    Sv.AjaxPost({
                        Url: "/Admin/InvoiceRental/CancelInvoice",
                        Data: { invoiceCode: $("#Code").val() }
                    },
                    function (rs) {
                        Sv.EndLoading();
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.Message, Dialog.Success);
                            unit.$boxDetails.find("#modalDetails").modal("hide");
                            unit.OpentDisable();
                            unit.LoadTableSearch();
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
                "Bạn chắc chắn trả lại hàng không?",
                function () {
                    window.location = "/ReturnProvider/Add?code=" + $("#Code").val() + "&type=1";
                });
    });
    unit.$boxDetails.on('click', 'button#btnReOpen', function (e) {
        e.preventDefault();
        window.location = "/InvoiceRental/Add?code=" + $("#Code").val();
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
                "Bạn có muốn xóa phiếu nhập này?",
                function () {
                    Sv.Loading();
                    Sv.AjaxPost({
                        Url: "/Admin/InvoiceRental/Delete",
                        Data: { invoiceCode: $("#Code").val() }
                    },
                    function (rs) {
                        Sv.EndLoading();
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.Message, Dialog.Success);
                            unit.$boxDetails.find("#modalDetails").modal("hide");
                            unit.OpentDisable();
                            unit.LoadTableSearch();
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
