﻿var Unit = function () {
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
                title: 'Mã khuyến mại',
                field: 'PromotionCode',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên khuyến mại',
                field: 'PromotionName',
                align: "left"
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Từ ngày',
                field: 'FromDate',
                align: "right",
                formatter: function (value) {
                    return value !== null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm:ss') : "";
                }
            }),
            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Đến ngày',
                field: 'ToDate',
                align: "right",
                formatter: function (value) {
                    return value !== null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm:ss') : "";
                }
            }), Sv.BootstrapTableColumn("string", {
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
                            var url = "/Admin/PromotionManagement/ShowModal";
                            var model = {
                                id: row.Id,
                                action: "Edit",
                                status: row.Status
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#divFromDate'), row.FromDate);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#divToDate'), row.ToDate);
                                $('#formDetail #txtStatus').val(model.status).select2();
                                base.OpentDisable();
                            });
                        });
                    }
                }
            })];
        return obj;
    }

    this.SetupAmountMask = function () {
        //Mask_groupSeparator: '.',
        //Mask_radixPoint: ',',
        //Mask_integerDigits: 11,
        //Mask_digits: 0,
        $('.amount-mask').on().inputmask({
            alias: 'decimal',
            placeholder: '',
            groupSeparator: '.',
            radixPoint: ',',
            autoGroup: true,
            digits: 0,
            allowPlus: false,
            allowMinus: false,
            autoUnmask: true,
            integerDigits: 11
        });
    }

    this.OpentDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtPromotionCode']").prop('disabled', true);
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
        var form = $('#formDetail').on();
        return form.serialize();
    }
    //-- them sua xoa

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if ($form.valid()) {
            
            var dataForm = base.GetFormData();
            var url = "/PromotionManagement/Create";
            if (action === "Edit") {
                url = "/PromotionManagement/Update";
            }

            Sv.AjaxPost({
                Url: url,
                Data: dataForm
            }, function (rs) {
                if (rs.Status === "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    base.$boxDetails.find("#modalDetails").modal("hide");
                    base.OpentDisable();
                    base.LoadTableSearch();
                } else {
                    Dialog.Alert(rs.Message, Dialog.Error);
                }
            }, function () {
                Dialog.Alert(language.Message_Error, Dialog.Error);
            });
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.PromotionCode = $('#txtPromotionCode').val();
        obj.PromotionName = $('#txtPromotionName').val();
        obj.FromDate = $('#txtFromDate').val();
        obj.ToDate = $('#txtToDate').val();
        obj.Status = $('#txtStatus').val();
        return obj;
    }
}


$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/PromotionManagement/GetData",
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
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
        $('#formSearch #txtStatus').val('-1').trigger('change');
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/PromotionManagement/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            unit.SetupAmountMask();
            Sv.SetupDateTime($('#divFromDate'), $('#divToDate'));
            $('#formDetail #txtStatus').val('-1').select2();
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
