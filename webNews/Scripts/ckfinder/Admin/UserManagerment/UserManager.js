
var Unit = function () {
    var base = this;

    //DuyDV -  Control 
    this.$table = $("#table");
    this.TypeAdd = "ADD";
    this.TypeEdit = "EDIT";
    this.TypeView = "VIEW";
    this.CustomerID = 0;
    this.UserNameNew = "";
    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$btnOpenAdd = $("#btnOpenAdd");
    this.$btnAcctionSave = $("#btnAcctionSave");
    this.$btnAcctionCancel = $("#btnAcctionCancel");
    this.$btnOpenExport = $("#btnOpenExport");
    this.$btnResetPassword = $("#btnResetPassword");

    this.$titleFormAddEdit = $("#titleFormAddEdit");
    this.$isSending = false;
    this.$searchModal = $("#searchModal");
    this.$addModal = $("#addModal");
    this.$exportModal = $("#exportModal");
    this.$formDetail = $("#formDetail");
    this.$formSearchToResetPassword = $("#formSearchToResetPassword");
    base.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
    this.$myFormValidate = {};

    this.$dialogResetPassword = $("#modalResetPassword");
    //DuyDV -  Config columns cho table 
    this.Columns = function () {
        var obj = [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                title: "STT",
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table, index);
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên tài khoản',
                field: 'UserName',
                width: '150px'
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                width: '150px',
                field: 'FullName',
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                width: '150px'
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Chức danh',
                field: 'RoleName',
                width: '150px'
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Email',
                field: 'Email',
                width: '150px'
            }),
             Sv.BootstrapTableColumn("string", {
                 title: 'Số điện thoại',
                 filed: 'Tel',
                 align: "left",
                 width: '100px'
             }),
           Sv.BootstrapTableColumn("string", {
               filed: 'Active',
               align: "left",
               width: '150px',
               title: 'Trạng thái',
               formatter: function (value, row, index) {
                   if (row.Active == 1) {
                       return 'Hoạt động';
                   }
                   else {
                       return 'Ngừng hoạt động';
                   }
               }
           }),
         Sv.BootstrapTableColumn("string", {
             title: 'Thao tác',
             align: "center",
             width: '150px',
             formatter: function (value, row, index) {
                 var button = '<button data-id="' + row.CustomerID + '" class="btn btn-primary btn-in-table btn-view-table hidden" title="View"><i class="fa fa-info-circle"></i></button>'
                     + '<button data-id="' + row.CustomerID + '" class="btn btn-primary btn-in-table btn-edit-table" title="Edit"><i class="fa fa-pencil-square-o"></i></button>'
                 + '<button data-id="' + row.CustomerID + '" class="btn btn-primary btn-in-table btn-delete-table hidden" title="Delete"><i class="fa fa-times"></i></button>';
                 return button;
             },
             events: {
                 'click .btn-view-table': function (e, value, row, index) {
                     Sv.ChecPermission("View", function () {
                         var url = "/Admin/UserManagement/ShowModal";
                         var model = { id: row.UserId, action: "View" };
                         Sv.BindPopup(url, model, function (rs) {
                             base.$boxDetails.html(rs);
                             $("#formDetail :input").prop("disabled", true);
                             base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                         });
                     });
                 },
                 'click .btn-edit-table': function (e, value, row, index) {
                     Sv.ChecPermission("View", function () {
                         var url = "/Admin/UserManagement/ShowModal";
                         var model = { id: row.UserId, action: "Edit" };
                         Sv.BindPopup(url, model, function (rs) {
                             base.$boxDetails.html(rs);
                             base.OpenDisable();
                             base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                         });
                     });
                 },
                 'click .btn-delete-table': function (e, value, row, index) {
                     //goi delete
                     Sv.ChecPermission("Delete", function () {
                         Dialog.ConfirmCustom(Lang.Status_Confirm, 'Bạn có muốn xóa user này?', function () {
                             base.SubmitServer("Delete", row.UserId);
                         });
                     });
                 }
             }
         })
        ];
        return obj;
    }
    this.OpenDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("select[id='txtCustomerType_Add']").prop('disabled', true);
        $form.find("select[id='txtParentCustomerID_ADD']").prop('disabled', true);
        $form.find("input[id='txtUserName']").prop('disabled', true);
    }
    this.ResetViewTable = function () {
        base.$table.bootstrapTable('resetView');
    };
    base.GetFormData = function () {
        var $form = $("#formDetail");
        var obj = {};
        obj.Tel = $form.find("input[id='txtTel']").val();
        obj.UserName = $form.find("input[id='txtUserName']").val();
        obj.Status = $form.find("select[id='txtStatus']").val();
        obj.FullName = $form.find("input[id='txtFullName']").val();
        obj.Email = $form.find("input[id='txtEmail']").val();
        obj.UserRole = $("#txtUserRole").val();
        obj.UserId = $("#txtUserId").val();
        obj.Password = $form.find("input[id='txtPassword']").val();

        return obj;
    }
    this.SubmitServer = function (action, userId) {
        var $form = $("#formDetail").on();
        //var data = base.GetFormData();
        //if (action != "Delete") {
        //    if (data.Item.ListRole <= 0) {
        //        alert('Bạn chưa chọn quyền nào');
        //        return false;
        //    }
        //}
        var url = "/UserManagement/Create";
        if (action == "Edit") {
            url = "/UserManagement/Update";
        }
        if (action == "Delete") {
            url = "/UserManagement/Delete";
            Sv.AjaxPost({
                Url: url,
                Data: { id: userId }
            },
                function (rs) {
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
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        } else {
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: url,
                    Data: base.GetFormData()
                },
                    function (rs) {
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.Message, Dialog.Success);
                            base.$boxDetails.find("#modalDetails").modal("hide");

                            Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
                            $searchModel = unit.GetFormSearchData();
                            base.LoadTableSearch();
                        }
                        else if (rs.Status == "02") {
                            base.$boxDetails.find("#showError").html(rs.Message);
                        } else {
                            base.$boxDetails.find("#showError").html('');
                            Dialog.Alert(rs.Message, Dialog.Error);
                        }
                    },
                    function () {
                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                    });
            }
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.Role = $("#txtSearchRole").val();
        obj.Status = $("#txtStatus").val();
        obj.UserName = $("#txtSearchUserName").val();
        obj.Tel = $("#txtSearchTel").val();
        obj.BranchCode = $("#txtSearchBranch").val();
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total == 0) {
                    base.$table.bootstrapTable('removeAll');
                    //Dialog.Alert(Lang.Message_DataSearch_Null_Lang, Dialog.Error);
                }
                return {
                    total: res.total,
                    rows: res.data
                };
            },
        });
    }
}

var unit;
var totaltable = 0;
var $searchModel;
$(document).ready(function () {
    unit = new Unit();
    $searchModel = unit.GetFormSearchData();
    unit.ResetViewTable();
    //DuyDV - Config Table tìm kiếm
    unit.$table.bootstrapTable(Sv.BootstrapTableOption1({
        url: "/Admin/UserManagement/Search",
        queryParams: function (p) {
            return {
                pageIndex: p.offset,
                pageSize: p.limit,
                filter: $searchModel
            };
        },
        columns: unit.Columns()
    }));

    //unit.IntApp();

    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
    });

    $("#btnSearchSubmit").click(function () {
        $searchModel = unit.GetFormSearchData();
        unit.LoadTableSearch();
    });

    $("#btnSearchRefresh").click(function () {
        Sv.ResetForm($("#formSearch"), true);
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/UserManagement/ShowModal";
        var model = { id: 0, action: "Add" };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
        });
    });

    unit.$btnOpenExport.click(function () {
        Sv.ChecPermission("Export", function () {
            var dataTable = unit.$table.bootstrapTable('getData');
            if (dataTable.length <= 0) {
                Dialog.Alert(language.Policy.exportErr, Dialog.Warning);
                return;
            }
            unit.$exportModal.modal({ backdrop: "static", });
            $("#formExport").attr('action', '/Admin/UserManagement/Export');
        });
    });

    $("#btnExportSubmit").click(function () {
        $("#formExport").submit();
        unit.$exportModal.modal("hide");
    });

    //--------Submit buttom form
    unit.$boxDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        unit.SubmitServer("Add", 0);
    });
    unit.$boxDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });

    $('#txtCustomerType').on('change', function () {
        getPartnerByCustomerType($(this).val(), '#txtParentCustomerID');
    });

    $('#txtCustomerType_Add').on('change', function () {
        getPartnerByCustomerType($(this).val(), '#txtParentCustomerID_ADD');
    });
});