var invoiceCodeSearch;
var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$table1 = $("#importHistory");
    this.$table2 = $("#deptImport");
    this.$historyTable = $("#historyTable");
    this.$historyTable2 = $("#historyTable2");

    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();

    this.$modalHistory1 = $("#historyModal");
    this.$modalHistory2 = $("#historyModal2");
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
                title: 'Mã nhà cung cấp',
                field: 'Code',
                align: "center",
                valign:"middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên nhà cung cấp',
                field: 'Name',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Địa chỉ',
                field: 'Address',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số điện thoại',
                field: 'Tel',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng mua',
                field: 'MoneyIn',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Nợ cần trả',
                field: 'SumMoney',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    return data.SumMoney > 0 ? data.SumMoney : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                valign:"middle",
                formatter: function (value, data, index) {
                    if (data.Active == true) {
                        return "Hoạt động";
                    } else {
                        return "Ngừng hoạt động";
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '120px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    str += "<button data-code='%s' class='OpenHistory1 btn btn-primary btn-in-table' title='Lịch sử nhập hàng'><i class='fa fa-hourglass-half'></i></button>";
                    str += "<button data-code='%s' class='OpenHistory2 btn btn-primary btn-in-table' title='Nợ cần trả'><i class='fa fa-usd'></i></button>";

                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Provider/ShowModal";
                            var model = {
                                id: row.Id, branch: row.BranchCode, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                //bind data to form detail
                                bindDetailFormb();

                            });
                        });
                    },
                    'click .OpenHistory1': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            base.$modalHistory1.modal({ backdrop: "static" });
                            invoiceCodeSearch = row.Code;
                            base.LoadHistoryTable1();
                        });
                    },
                    'click .OpenHistory2': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            base.$modalHistory2.modal({ backdrop: "static" });
                            invoiceCodeSearch = row.Code;
                            base.LoadHistoryTable2();
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadHistoryTable1 = function () {
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
    this.LoadHistoryTable2 = function () {
        base.$historyTable2.bootstrapTable('refreshOptions', {
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
    this.HisColumns1 = function () {
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
                field: 'CreateDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Người tạo',
                field: 'FullName',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tổng cộng',
                field: 'SumMonney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            })];
        return obj;
    }

    this.HisColumns2 = function () {
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
                title: 'Loại phiếu',
                field: 'ServiceType',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreateDate',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giá trị',
                field: 'SumMonney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Nợ cần thu',
                field: 'RemainMonney',
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
    base.GetFormData = function () {
        var data = {};
        data.Id = $("#Id").val();
        data.Domain = $("#Domain").val();
        data.Code = $("#txtCode").val();
        data.Name = $("#txtName").val();
        data.Address = $("#txtAddress").val();
        data.Tel = $("#txtPhone").val();
        data.Active = $("#txtActive").val();
        data.Fax = $("#txtFax").val();
        data.Tax = $("#txtTax").val();
        data.Email = $("#txtEmail").val();
        data.Website = $("#txtWebsite").val();
        data.Note = $("#txtNote").val();
        data.Type = $("#txtProviderType").val();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/Provider/Create";
        if (action == "Edit") {
            url = "/Provider/Update";
        }
        if ($form.valid(true)) {
            Sv.Loading();
            Sv.AjaxPost({
                    Url: url,
                    Data: base.GetFormData()
                },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.OpentDisable();
                        base.LoadTableSearch();
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                },
                function () {
                    Sv.EndLoading();
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
        obj.Name = $('#txtSearchName').val();
        obj.Phone = $('#txtSearchPhone').val();
        obj.Active = $("#txtSearchActive").val();
        obj.MoneyFrom = $("#txtMoneyFrom").val();
        obj.MoneyTo = $("#txtMoneyTo").val();
        obj.RemainFrom = $("#txtRemainFrom").val();
        obj.RemainTo = $("#txtRemainTo").val();
        return obj;
    }

    this.resetSearch = function () {
        Sv.ResetForm($("#formSearch"));
        $("#txtSearchActive").val("-1").trigger("change");
    }

}

var unit = new Unit();

var initTable = function (data) {
    $("#importHistory").bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 5,
        paginationFirstText: 'Trang đầu',
        paginationPreText: 'Trước',
        paginationNextText: 'Sau',
        paginationLastText: 'Trang cuối',
        showHeader: true,
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Tổng:' + totalRows;
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'Hiển thị ' + pageNumber + ' dòng trên trang';
        },
        data: data.ImportPayments == null ? [] : data.ImportPayments,
        sidePagination: 'client',
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            }, {
                title: 'Mã phiếu nhập',
                field: 'Code',
                align: "center",
                valign: "middle"
            }, {
                title: 'Ngày tạo',
                field: 'CreateDate',
                align: "center",
                valign: "middle"
            }, {
                title: 'Người tạo',
                field: 'UserName',
                align: "center",
                valign: "middle"
            },
            {
                title: 'Tổng tiền',
                field: 'TotalMonney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                title: 'Nợ cần trả',
                field: 'SumMoney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }
        ]
    });


    $("#deptImport").bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 5,
        paginationFirstText: 'Trang đầu',
        paginationPreText: 'Trước',
        paginationNextText: 'Sau',
        paginationLastText: 'Trang cuối',
        showHeader: true,
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Tổng:' + totalRows;
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'Hiển thị ' + pageNumber + ' dòng trên trang';
        },
        data: data.DeptPayments == null ? [] : data.DeptPayments,
        sidePagination: 'client',
        columns: [
            {
                align: "center",
                width: "50px",
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table1, index);
                }
            }, {
                title: 'Mã phiếu nhập',
                field: 'Code',
                align: "center",
                valign: "middle"
            }, {
                title: 'Loại phiếu',
                field: 'PaymentType',
                align: "center",
                valign: "middle"
            }, {
                title: 'Thời gian',
                field: 'CreateDate',
                align: "center",
                valign: "middle"
            }, {
                title: 'Giá trị',
                field: 'TotalMonney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }, {
                title: 'Nợ cần thu',
                field: 'RemainMonney',
                align: "center",
                valign: "middle",
                formatter: function (value) {
                    return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }
        ]
    });
}

var bindDetailFormb = function() {
    Sv.AjaxPost({
        Url: "/Admin/Provider/GetDetailData"
        },
        function (rs) {
            initTable(rs);
        },
        function () {
            Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
        });
}

$(document).ready(function () {
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Provider/GetData",
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
        url: "/Admin/Provider/GetPaymentHistory",
        queryParams: function (p) {
            return {
                providerCode: invoiceCodeSearch,
                offset: p.offset,
                limit: p.limit,
                type: 1
            };
        },
        columns: unit.HisColumns1()
    }));
    unit.$historyTable2.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Provider/GetPaymentHistory",
        queryParams: function (p) {
            return {
                providerCode: invoiceCodeSearch,
                offset: p.offset,
                limit: p.limit,
                type: 2
            };
        },
        columns: unit.HisColumns2()
    }));
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
        $("#txtMoneyFrom").number(true, "");
        $("#txtMoneyTo").number(true, "");
        $("#txtRemainFrom").number(true, "");
        $("#txtRemainTo").number(true, "");
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        unit.resetSearch();
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Provider/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            bindDetailFormb();
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
