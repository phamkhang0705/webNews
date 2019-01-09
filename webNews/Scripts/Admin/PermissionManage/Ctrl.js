//==================================================================
jQuery.validator.addMethod("permissioncode", function (value, element)
{
    if (value.length == 0)
        return true;
    var reg = "^([a-zA-Z0-9]){1,200}$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "");
jQuery.validator.addMethod("permissionname", function (value, element) {
    if (value.length == 0)
        return true;
    var v = value.trim().latinize().replace(/\s/g, "");
    var reg = "^[a-zA-Z]([a-zA-Z0-9\_\.])+$";
    reg = new RegExp(reg);
    if (reg.test(v)) {
        return true;
    } else {
        return false;
    };
}, "");
var Unit = function ()
{
    var base = this;

    //LongLD -  Control 
    this.$table = $("#table");
    base.$boxDetails = $("#box-detail");
    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$btnSearchData = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$btnOpenExport = $("#btnOpenExport");
    this.$btnSearchRefresh = $("#btnSearchRefresh");

    this.$searchModal = $("#modalSearch");
    this.$addModal = $("#modalAdd");
    this.$exportModal = $("#exportModal");
    this.$formExport = $("#formExport");
    this.$perAdd = $("#txtPerAdd").val();
    this.$perEdit = $("#txtPerEdit").val();
    this.$perDelete = $("#txtPerDelete").val();
    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                title: "STT",
                width: '50px',
                formatter: function (value, row, index)
                {
                    return (index+1);
                }
            }),
            Sv.BootstrapTableColumn("string", {
                field: 'PermissionName',
                title: "Tên quyền",
                width: '250px'
            }),
            Sv.BootstrapTableColumn("String", {
                field: 'Description',
                title: "Mô tả",
                width: '350px'               
            }),
            Sv.BootstrapTableColumn("String",
                {
                    align: "center",
                field: 'PermissionID',
                title: 'Thao tác',
                width: '100px',//ok
                formatter: function (value, data, index) {//
                    var str = "<button data-code='%s' class='OpenViewItem btn btn-primary btn-in-table' title='Xem chi tiết'><i class='fa fa-info-circle'></i></button>";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    if (base.$perDelete == 1) {
                        str += '<button id="btnDelete" class="btn btn-primary btn-in-table DeleteItem" title="Xóa"><i class="fa fa-times"></i></button> ';
                    }
                    return str;
                },
                events: {
                    'click .OpenViewItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PermissionManage/ShowModal";
                            var model = { id: row.Id, action: "View" };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/PermissionManage/ShowModal";
                            var model = { id: row.Id, action: "Edit" };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .DeleteItem': function (e, value, row, index) {
                        Sv.ChecPermission("Delete", function () {
                            Dialog.ConfirmCustom(Status_Confirm, 'Bạn có muốn xóa bản ghi này?', function () {
                                base.SubmitServer("Delete");
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            onLoadSuccess: function (data) {
                return false;
            },
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total == 0) {
                    Dialog.Alert(Message_DataSearch_Null_Lang, Dialog.Error, function () {
                        base.$table.bootstrapTable('removeAll');
                    });
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
    
    this.SubmitServer = function (action) {
        var $form = $("#formDetail").on();
        var url = "/Admin/PermissionManage/Create";
        if (action == "Edit") {
            url = "/Admin/PermissionManage/Update";
        }
        if (action == "Delete") {
            url = "/Admin/PermissionManage/Delete";
        }
        if ($form.valid(true)) {
            Sv.Loading();
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    Sv.EndLoading();
                    Dialog.Alert(rs.Message,
                        (rs.Status == "01" ? Dialog.Success : Dialog.Error),
                        function () {
                            if (rs.Status == "01") {
                                base.$boxDetails.find("#modalDetails").modal("hide");
                                base.LoadTableSearch();
                            }
                        });
                },
                function () {
                    Sv.EndLoading();
                    Dialog.Alert(ServerError_Lang, Dialog.Error);
                });
        }
    }
    this.GetFormPermissionManageData = function ()
    {
        var obj = $("#formAddPermissionManage").serialize();
        return obj;
    }
    this.ResetViewTable = function () {
        base.$table.bootstrapTable('resetView');
    };

    this.SetupDateTime = function () {
        
    };
    this.RuleValidateToAdd = function ()
    {
        var $form = $("#formAddPermissionManage");
        $form.validate({
            rules:
            {
                Description: {
                    required: true,
                    minlength: 1,
                    maxlength: 200,
                },
                PermissionName: {
                    required: true,
                    permissionname:true,
                    minlength: 3,
                    maxlength: 200
                }              
            },
            messages: {
                Description: {
                    required: 'Thông tin này bắt buộc nhập',
                 minlength: language.PermissionManage_Validate_Add_Description_MinLength,
                    maxlength: language.PermissionManage_Validate_Add_Description_MaxLength,
                },
                PermissionName: {
                    required: 'Thông tin này bắt buộc nhập',
                   minlength: language.PermissionManage_Validate_PermissionName_MinLength,
                    maxlength: language.PermissionManage_Validate_PermissionName_MaxLength,
                }                
            }
        });
    }
    this.RuleValidateToEdit = function () {
        var $form = $("#formAddPermissionManage");
        $form.validate({
            rules:
            {
                PermissionName: {
                    required: true,                    
                    minlength: 3,
                    maxlength: 200
                },
                Description: {
                    required: true,
                    minlength: 1,
                    maxlength: 200,
                }               
            },
            messages: {
                PermissionName: {
                    required: language.PermissionManage_Validate_Add_PermissionName_Required,
                    permissionname: language.PermissionManage_Validate_Add_ServiceCode_permissionname,
                    minlength: language.PermissionManage_Validate_PermissionName_MinLength,
                    maxlength: language.PermissionManage_Validate_PermissionName_MaxLength,
                },
                Description: {
                    required: language.PermissionManage_Validate_Add_ServiceCode_Required,
                    permissionname: language.PermissionManage_Validate_Add_ServiceCode_permissioncode,
                    minlength: language.PermissionManage_Validate_Add_ServiceCode_MinLength,
                    maxlength: language.PermissionManage_Validate_Add_ServiceCode_MaxLength,
                }
            }
        });
    }
    this.BindPopup = function (action, code, callback) {
        var model = {
            code: code,
            action: action
        }
        Sv.AjaxPost({
            Url: "/Admin/PermissionManage/ShowModal",
            Data: model
        }, function (rs) {
            if (rs.Status === "00") {
                Dialog.Alert(rs.Message, Dialog.Error);
            } else {
                base.$modalDetail.html(rs);
                Sv.SetupAmountMask();
                base.DocSo(action);
                if (action != "View")
                    base.SetupValidate();
                if (typeof callback == "function")
                    callback();
            }
        }, function () {
            Dialog.Alert(ServerError_Lang, Dialog.Error);
        });
    }
}
$(document).ready(function () {
    var unit = new Unit();
    unit.ResetViewTable();
    //lamlt - Config Table tìm kiếm
    unit.$table.bootstrapTable(Sv.BootstrapTableOption(
        {
            url: "/Admin/PermissionManage/Search",
        queryParams: function (p) {
            return {
                option: p,
                name: $("#keywordToSearch").val()
            };
        },
        columns: unit.Columns(),
        showFooter: false,
        pagination: true,
        detailView: false       
    }));
    //thêm event cho nút open hiện dialog search
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static", });
    });
    unit.$btnSearchRefresh.click(function () {
        $("#keywordToSearch").val("");
    });
    
    //thêm event cho nút add
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/PermissionManage/ShowModal";
        var model = { id: 0, action: "Add" };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
        });
    });
    //--------Submit buttom form
    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        unit.SubmitServer("Add");
    });
    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit");
    });
});