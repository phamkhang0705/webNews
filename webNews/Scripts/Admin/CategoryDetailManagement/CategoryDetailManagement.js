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
            }), Sv.BootstrapTableColumn("string", {
                title: 'Avatar',
                field: 'Avatar',
                align: "center",
                formatter: function (value, row, index) {
                    var url = row.Avatar.split("\\").pop(-1);
                    str = '<img class="img-preview" src="/Content/Cate/' + url + '" title="e" alt="" width="100" height="100" style="margin-bottom: 10px" />';
                    return str;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Mã danh mục',
                field: 'Code',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên danh mục',
                field: 'Name',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhóm',
                field: 'groupnames',
                align: "left"
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Từ tuổi',
                field: 'FromAge'
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Đến tuổi',
                field: 'ToAge'
            }),
            Sv.BootstrapTableColumn("NumberNull", {
                title: 'Số lượng',
                field: 'Quantity'
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
                            var url = "/Admin/CategoryDetailManagement/ShowModal";
                            var model = {
                                id: row.Id,
                                action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                base.SetupAmountMask();
                                base.OpentDisable(model.action);
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

    this.OpentDisable = function (action) {
        var $form = $("#modalDetails").on();
        if (action === "Edit") {
            $form.find("#txtCategoryId").prop('disabled', true);
        }
        $form.find("input[id='txtCode']").prop('disabled', true);
        $form.find("input[id='txtName']").prop('disabled', true);
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
        var obj = {};
        var description = CKEDITOR.instances['txtDescription'].getData();
        obj.Id = form.find('#txtCategoryDetailId').val();
        obj.CategoryId = form.find('#txtCategoryId').val();
        obj.Quantity = form.find('#txtQuantity').val();
        obj.Description = description;
        return obj;
    }
    //-- them sua xoa

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if ($form.valid()) {
            var dataForm = base.GetFormData();
            
            var url = "/CategoryDetailManagement/Create";
            if (action === "Edit") {
                url = "/CategoryDetailManagement/Update";
            }
            Sv.AjaxPost({
                Url: url,
                Data: dataForm
            }, function (rs) {
                if (rs.Status === "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    base.$boxDetails.find("#modalDetails").modal("hide");
                    
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
        obj.CategoryId = $('#txtCategoryId').val();
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/CategoryDetailManagement/GetData",
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
        $('#formSearch #txtCategoryId').val('').trigger('change');
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/CategoryDetailManagement/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            unit.SetupAmountMask();
            unit.OpentDisable(action);
            $('#formDetail #txtCategoryId').select2();
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
