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
    this.$model = [];
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
                width: "150px",
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Từ chi nhánh',
                field: 'FromBranchName',
                width: "150px",
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Đến chi nhánh',
                field: 'ToBranchName',
                width: "150px",
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày chuyển',
                field: 'Date',
                width: "150px",
                align: "left",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'ActiveName',
                width: "120px",
                align: "center"
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function () {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Chi tiết phiếu chuyển hàng'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/TransferProduct/ShowModal";
                            var model = {
                                Id: row.Id, Code: row.Code, Domain: row.Domain, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpenDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                tableDetail(model.Domain, model.Id);
                                Sv.SetupOnlyDate($('#divDate'));
                                bindEventExport(model);
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
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/TransferProduct/CancelTransferProduct";
        if (action == "Edit" && id == 0) {
            url = "/TransferProduct/UpdateTransferProduct";
        }
        if ($form.valid(true)) {
            if (action == "Edit" && id == 1) {
                Dialog.ConfirmCustom("",
                    "Bạn chắc chắn hủy phiếu chuyển này?",
                    function () {
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
                                    base.LoadTableSearch();
                                } else {
                                    Dialog.Alert(rs.Message, Dialog.Error);
                                }
                            },
                            function () {
                                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                            });
                    });
            } else {
                Dialog.ConfirmCustom("",
                    "Bạn chắc chắn cập nhật phiếu chuyển này?",
                    function () {
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
                                    base.LoadTableSearch();
                                } else {
                                    Dialog.Alert(rs.Message, Dialog.Error);
                                }
                            },
                            function () {
                                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                            });
                    });
            }
        }

    }
    this.OpenDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("select[id='txtType']").prop('disabled', true);
    }
    this.CloseDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("select[id='txtType']").prop('disabled', false);
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#searchModal').find('#txtCode').val();
        obj.FromBranchCode = $('#searchModal').find('#txtFromBranchCode').val();
        obj.ToBranchCode = $('#searchModal').find('#txtToBranchCode').val();
        obj.FromDate = $('#searchModal').find('#txtFromDate').val();
        obj.ToDate = $('#searchModal').find('#txtToDate').val();
        obj.FromStoreId = $('#searchModal').find('#txtFromStoreId').val();
        obj.ToStoreId = $('#searchModal').find('#txtToStoreId').val();

        var listActive = "";
        $("input[type='checkbox']").each(function () {
            if ($(this).is(':checked')) {
                var active = $(this).val();
                listActive += active + ',';
            }
        });
        obj.Active = listActive;

        return obj;
    }
}
var bindEventExport = function (model) {
    $('#btnExport').on('click', function () {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn xuất phiếu chuyển này?",
            function () {
                var dataTable = $('#tableDetail').bootstrapTable('getData');
                if (dataTable.length <= 0) {
                    Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                    return;
                }
                window.location = '/TransferProduct/ExportExcel?' +
                    'BranchCode=' + model.BranchCode +
                    '&Domain=' + model.Domain +
                    '&TransferProductId=' + model.Id +
                    '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
            });
    });
}
var tableDetail = function (domain, id) {
    var $tableDetail = $('#tableDetail');
    $tableDetail.bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 5,
        pageList: [5, 10, 15, 20, 30, 50, 100],
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
        formatNoMatches: function () {
            return 'Không tìm thấy dữ liệu theo điều kiện tìm kiếm. Vui lòng thử lại';
        },
        method: 'post',
        sidePagination: 'server',
        url: '/TransferProduct/GetTransferProductDetail',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                Domain: domain,
                TransferProductId: id
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($tableDetail, index);
                }
            }, {
                field: 'ProductCode',
                title: 'Mã hàng hóa',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'ProductName',
                title: 'Tên hàng hóa',
                align: 'center',
                valign: 'middle',
                width: '120px'
            }, {
                field: 'TotalProducts',
                title: 'Số lượng chuyển',
                align: 'right',
                valign: 'middle',
                width: '80px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            },
            {
                field: 'PriceTranfer',
                title: 'Giá chuyển nhận',
                align: 'right',
                valign: 'middle',
                width: '80px',
                formatter: function (value) {
                    return value != null ? (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }
        ]
    });
}
var getAllProductByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/TransferProduct/GetAllProductByBranch',
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
                    $(controlSelect).append('<option value="' +
                        value.ProductCode +
                        '">' +
                        value.ProductName +
                        '</option>');
                });
    },
        function (error) {
            Dialog.Alert('Tải sản phẩm thất bại', Dialog.Error);
        });
}

var getAllStoreByBranch = function (branchCode, controlSelect, optionAll) {
    Sv.AjaxPost({
        Url: '/TransferProduct/GetStoreByBranchCode',
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
                    $(controlSelect).append('<option value="' +
                        value.Id +
                        '">' +
                        value.Name +
                        '</option>');
                });
        $("#txtFromStoreId").trigger("change");
        $("#txtToStoreId").trigger("change");
    },
        function (error) {
            Dialog.Alert('Tải kho thất bại', Dialog.Error);
        });
}

$(document).ready(function () {

    var unit = new Unit();
    unit.$model = unit.GetFormSearchData();
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/TransferProduct/GetData",
        queryParams: function (p) {
            return {
                search: unit.$model,
                pageIndex: p.offset,
                pageSize: p.limit
            };
        },
        columns: unit.Columns()
    }));



    unit.$btnOpenSearch.click(function () {
        Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
        unit.$searchModal.modal({ backdrop: "static" });
        $('span.error').remove();
        unit.$searchModal.find('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
        unit.$searchModal.find('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
        ////Max date
        unit.$searchModal.find('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
        unit.$searchModal.find('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
        unit.$searchModal.on('change', 'select#txtFromBranchCode', function () {
            if ($('#formSearch #txtFromBranchCode').val() == "-1") {
                $(this).focus();
                if ($('#formSearch #txtFromBranchCode').parent().find("span.error").length == 0) {
                    $('#formSearch #txtFromBranchCode')
                        .before(
                            '<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh chuyển đi để tìm kiếm</span>');
                }
                return false;
            } else {
                $('span.error').remove();
            }
            getAllStoreByBranch($('#searchModal').find('select#txtFromBranchCode').val(), '#txtFromStoreId', false);

        });
        unit.$searchModal.on('change', 'select#txtToBranchCode', function () {
            if ($('#formSearch #txtToBranchCode').val() == "-1") {
                $(this).focus();
                if ($('#formSearch #txtToBranchCode').parent().find("span.error").length == 0) {
                    $('#formSearch #txtToBranchCode')
                        .before(
                            '<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh chuyển đến để tìm kiếm</span>');
                }
                return false;
            } else {
                $('span.error').remove();
            }
            getAllStoreByBranch($('#searchModal').find('select#txtToBranchCode').val(), '#txtToStoreId', false);
        });
    });
    $('#formSearch select#txtFromStoreId').val('').trigger('change');
    $('#formSearch select#txtToStoreId').val('').trigger('change');

    unit.$btnSearchSubmit.click(function () {
        if ($('#formSearch #txtFromBranchCode').val() == "-1") {
            $(this).focus();
            if ($('#formSearch #txtFromBranchCode').parent().find("span.error").length == 0) {
                $('#formSearch #txtFromBranchCode')
                    .before(
                        '<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh chuyển đi để tìm kiếm</span>');
            }
            return false;
        } if ($('#formSearch #txtToBranchCode').val() == "-1") {
            $(this).focus();
            if ($('#formSearch #txtToBranchCode').parent().find("span.error").length == 0) {
                $('#formSearch #txtToBranchCode')
                    .before(
                        '<span class="error" style="color:#ff0000">Vui lòng chọn chi nhánh chuyển đến để tìm kiếm</span>');
            }
            return false;
        }
        unit.$model = unit.GetFormSearchData();
        console.log(unit.$model);
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
        $('select#txtFromBranchCode').val('-1').trigger('change');
        $('select#txtToBranchCode').val('-1').trigger('change');
        $('select#txtFromStoreId').val('-1').trigger('change');
        $('select#txtToStoreId').val('-1').trigger('change');
    });
    $('#btnExportExcel').on('click', function () {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn xuất phiếu chuyển này?",
            function () {
                var dataTable = $('#table').bootstrapTable('getData');
                if (dataTable.length <= 0) {
                    Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
                    return;
                }
                var model = unit.$model;
                model.FromStoreId = model.FromStoreId == null ? '' : model.FromStoreId;
                model.ToStoreId = model.ToStoreId == null ? '' : model.ToStoreId;
                window.location = '/TransferProduct/ExportTransferProduct?' +
                    'Active=' + model.Active +
                    '&Code=' + model.Code +
                    '&FromBranchCode=' + model.FromBranchCode +
                    '&ToBranchCode=' + model.ToBranchCode +
                    '&FromDate=' + model.FromDate +
                    '&ToDate=' + model.ToDate +

                    '&FromStoreId=' + model.FromStoreId +
                    '&ToStoreId=' + model.ToStoreId +
                    '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
            });
    });
    unit.$boxDetails.on('click', 'button#btnOpen', function (e) {
        Dialog.ConfirmCustom("",
            "Bạn chắc chắn mở hóa đơn này?",
            function () {
                var id = unit.$boxDetails.find('input[type="hidden"][name="Id"]').val();
                window.location.href = '/Admin/TransferProduct/Add?id=' + id;
            });
    });
    //unit.$boxDetails.on('click', 'button#btnCopy', function (e) {
    //    Dialog.ConfirmCustom("",
    //        "Bạn chắc chắn sao chép hóa đơn này?",
    //        function () {
    //            var removeProductCode = unit.$boxDetails.find('input[type="hidden"][name="Code"]').val();
    //            window.location.href = '/Sales/Index?Code=' + removeProductCode;
    //        });
    //});

    unit.$btnOpenAdd.click(function () {
        window.location.href = "/Admin/TransferProduct/Add";
    });

    unit.$boxDetails.on('click', 'button#btnCancel', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 1);
    });
    unit.$boxDetails.on('click', 'button#btnSave', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });

});
