//==================================================================
jQuery.validator.addMethod("RoleServicecode", function (value, element) {
    if (value.length == 0)
        return true;
    var reg = "^([a-zA-Z0-9]){2,30}$";
    reg = new RegExp(reg);
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    };
}, "");
var RoleService = function () {
    var base = this;


    this.$table = $("#table");

    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$btnSearchData = $("#btnSearchSubmit");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$btnOpenExport = $("#btnOpenExport");
    this.$btnSearchRefresh = $("#btnSearchRefresh");

    this.$searchModal = $("#modalSearch");
    this.$addModal = $("#modalAdd");
    this.$exportModal = $("#exportModal");
    this.$formExport = $("#formExport");
    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                title: "STT",
                width: '50px',
                formatter: function (value, row, index) {
                    return (index + 1);
                }
            }),
            Sv.BootstrapTableColumn("string", {
                field: 'Name',
                title: "Nhóm quyền",
                width: '400px'
            }),
            //Sv.BootstrapTableColumn("String", {
            //    field: 'Description',
            //    title: language.RoleService_grid_description,
            //    width: '300px'                
            //}),            
            Sv.BootstrapTableColumn("String",
                {
                    field: 'Id',
                    title: "Thao tác",
                    width: '90px',
                    align: 'center',
                    formatter: function (value, row, index) {

                        var str = "<button data-id='%s' id='btnViewRoleService' class='OpenViewItem btn btn-primary btn-in-table hidden' title='%s'><i class='fa fa-info-circle'></i></button>";
                        str = "<button data-id='%s' id='btnEditRoleService'  class='OpenEditItem btn btn-primary btn-in-table' title='%s'><i class='fas fa-edit'></i></button>";
                        str += "<button data-id='%s'  id='btnRemoveRoleService' class='OpenRemoveItem btn btn-primary btn-in-table hidden' title='%s'><i class='fa fa-times'></i></button>";
                        return Sv.Sprintf(str, row.Id, "Xem", row.Id, "Chỉnh sửa", row.Id, "Xóa"); //, data.CustomerCode, language.Table_BtnRemove);

                    },
                    events: {
                        'click .OpenRemoveItem': function (e, value, row, index) {
                            Sv.ChecPermission("DELETE", function () {
                                Dialog.ConfirmCustom("Bạn có chắc chắn xóa quyền không!", "Bạn có chắc chắn xóa quyền không!", function () {
                                    Sv.AjaxPost({
                                        Url: "/Admin/RoleManage/DeleteRole",
                                        Data: { id: row.Id }
                                    }, function (rs) {
                                        Dialog.Alert(rs.Message, (rs.Status == "01" ? Dialog.Success : Dialog.Error), (rs.Status == "01" ? Dialog.Success : Dialog.Error), function () {
                                            if (rs.Status == "01") {
                                                base.LoadTableSearch();
                                            }
                                        });
                                    }, function () {
                                        Dialog.Alert("Cập nhật quyền lỗi!", Dialog.Error, Dialog.Error);
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
                    Dialog.Alert(Lang.Message_DataSearch_Null_Lang, Dialog.Error);
                }
                return {
                    total: res.total,
                    rows: res.data
                };
            },
        });
    }

    this.GetDetail = function (action, code, callback) {
        var model = {
            code: code,
            action: action
        }
        Sv.AjaxPost({
            Url: "/Admin/RoleManage/BindPupop",
            Data: model
        }, function (rs) {
            if (rs.Status === "00") {
                base.$addModal.modal("hide");
                Dialog.Alert(rs.Message, Dialog.Error);

            } else {
                base.$addModal.html(rs);
                //console.log(rs);
                if (typeof callback == "function")
                    callback();
            }
        }, function () {
            Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
        });
    }

    this.SubmitForm = function (action) {
        var $form = $("#formAddRoleService");
        if ($form.valid()) {
            Sv.AjaxPost({
                Url: "/Admin/RoleManage/UpdateRole",
                Data: base.GetFormRoleServiceData()
            }, function (rs) {
                Dialog.Alert(rs.Message, (rs.Status == "01" ? Dialog.Success : Dialog.Error), (rs.Status == "01" ? Dialog.Success : Dialog.Error), function () {
                    if (rs.Status == "01") {
                        base.$addModal.find("#addModal").modal("hide");

                        $("#keywordToSearch").val("");
                        $searchModel = $("#keywordToSearch").val();
                        base.LoadTableSearch();
                    }
                });
            }, function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
        }
    }

    this.GetFormRoleServiceData = function () {
        var sList = "";
        $("input[ispermission]").each(function () {
            if ($(this).is(':checked')) {
                var perId = $(this).val();
                var funcId = $(this).attr("functionvalue");
                sList = sList + "^" + funcId + "-" + perId;
            }
        });
        var obj = { Id: parseInt($("#Id").val()), RoleName: $("#RoleName").val() };
        return { Id: obj.Id, RoleName: obj.RoleName, functionAndPermission: sList };
    }
    //LongLD - 
    this.ResetViewTable = function () {
        base.$table.bootstrapTable('resetView');
    };

    this.SetupDateTime = function () {

    };
    this.RuleValidateToAdd = function () {
        var $form = $("#formAddRoleService");
        $form.validate({
            rules:
            {
                RoleName: {
                    required: true,
                    maxlength: 100
                }
            },
            messages: {
                RoleName: {
                    required: language.RoleManage.RoleName_Required,
                    maxlength: language.RoleManage.RoleName_Maxlength

                }
            }
        });
        $("input[type=checkbox][isfunction=1]").click(function () {
            if ($(this).is(':checked')) {
                $("input[type=checkbox][functionvalue=" + $(this).val() + "]").each(function () {
                    $(this).prop("checked", true);
                });
            }
            else {
                $("input[type=checkbox][functionvalue=" + $(this).val() + "]").each(function () {
                    $(this).prop("checked", false);
                });
            }
        });

    }
    this.RuleValidateToEdit = function () {
        var $form = $("#formAddRoleService");
        $form.validate({
            rules:
            {
                ServicesName: {
                    required: true,
                    minlength: 3,
                    maxlength: 100
                }
            },
            messages: {
                ServicesName: {
                    required: language.RoleService_Validate_Add_ServiceName_Required,
                    minlength: language.RoleService_Validate_ServiceName_MinLength,
                    maxlength: language.RoleService_Validate_ServiceName_MaxLength,
                }
            }
        });

        //set up check all and un check all for forms
        $("input[type=checkbox][isfunction=1]").click(function () {
            if ($(this).is(':checked')) {
                $("input[type=checkbox][functionvalue=" + $(this).val() + "]").each(function () {
                    $(this).prop("checked", true);
                });
            }
            else {
                $("input[type=checkbox][functionvalue=" + $(this).val() + "]").each(function () {
                    $(this).prop("checked", false);
                });
            }
        });
    }

    this.FixHeaderTable = function () {
        var tableOffset = $("#table-1").offset().top;
        var $header = $("#table-1 > thead").clone();
        var $fixedHeader = $("#header-fixed").append($header);

        $(window).bind("scroll", function () {
            var offset = $(this).scrollTop();

            if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
                $fixedHeader.show();
            }
            else if (offset < tableOffset) {
                $fixedHeader.hide();
            }
        });
    }
}

//==================================================================
//	Description:  Action					
//	Author: lamlt
//==================================================================

var $searchModel;
var servicePayment = new RoleService();
$(document).ready(function () {

    servicePayment.ResetViewTable();
    //lamlt - Config Table tìm kiếm
    $searchModel = $("#keywordToSearch").val();
    servicePayment.$table.bootstrapTable(Sv.BootstrapTableOption1(
        {
            url: "/Admin/RoleManage/Search",
            queryParams: function (p) {
                return {
                    offset: p.offset,
                    limit: p.limit,
                    name: $searchModel
                };
            },
            columns: servicePayment.Columns(),
            showFooter: false,
            pagination: true,
            detailView: false
        }));
    //thêm event cho nút open hiện dialog search
    servicePayment.$btnOpenSearch.click(function () {
        servicePayment.$searchModal.modal({ backdrop: "static", });
        $("#keywordToSearch").focus();
    });
    servicePayment.$btnSearchRefresh.click(function () {
        $("#keywordToSearch").val("");
    });
    //servicePayment.FixHeaderTable();
    //thêm event cho nút add
    servicePayment.$btnOpenAdd.click(function () {
        Sv.ChecPermission("ADD", function () {
            servicePayment.GetDetail("Add", "-1", function () {
                servicePayment.$addModal.find("#addModal").modal({ backdrop: "static", });
                servicePayment.RuleValidateToAdd();
            });
        });
    });
    //thêm event cho nút search data tren modal search
    servicePayment.$btnSearchData.click(function () {
        $searchModel = $("#keywordToSearch").val();
        servicePayment.LoadTableSearch();
    });
    //set up cho click Exxport
    servicePayment.$btnOpenExport.click(function () {

        Sv.ChecPermission("EXPORT", function () {

            var dataTable = servicePayment.$table.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert(Lang.Message_NoData_Export_Lang, Dialog.Warning);
                return;
            }
            servicePayment.$exportModal.modal({ backdrop: "static", });
        });
    });
    // setup sự kiện cho nut click trên modal khi modal hiện khung edit
    servicePayment.$addModal.on('click', 'button#btnUpdateSubmit', function (e) {
        e.preventDefault();
        servicePayment.SubmitForm("Add");
    });
    servicePayment.$exportModal.on('click', 'button#btnExportSubmit', function (e) {
        e.preventDefault();
        //export to file
        servicePayment.$formExport.submit();
        servicePayment.$exportModal.modal("hide");
    });
    // setup sự kiện cho nut click trên grid table của bootstrap
    servicePayment.$table.on('click', '.OpenViewItem', function () {
        var code = $(this).attr("data-id");
        Sv.ChecPermission("VIEW", function () {
            servicePayment.GetDetail("View", code, function () {
                servicePayment.$addModal.find("#addModal").modal({ backdrop: "static", });
            });
        });
    });

    // setup sự kiện cho nut click trên grid table của bootstrap khi click edit
    servicePayment.$table.on('click', '.OpenEditItem', function () {
        var code = $(this).attr("data-id");
        Sv.ChecPermission("EDIT", function () {
            servicePayment.GetDetail("Edit", code, function () {
                servicePayment.$addModal.find("#addModal").modal({ backdrop: "static", });
                servicePayment.RuleValidateToEdit();
            });
        });

    });
    // setup sự kiện cho nut click trên grid table của bootstrap
});