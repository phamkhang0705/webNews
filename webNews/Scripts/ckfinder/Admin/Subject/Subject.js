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
    this.$perDelete = $("#txtPerDelete").val();

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
                title: 'Mã môn học',
                field: 'Code',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên môn học',
                field: 'Name',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Hệ số',
                field: 'Factor',
                align: "left"
            }),
             Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                formatter: function (value, data, index) {
                    if (data.Active == 1) {
                        return "Đang giảng dạy";
                    } else {
                        return "Ngừng giảng dạy";
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    if (base.$perDelete == 1) {
                        str += "<button data-code='%s' class='OpenDeleteItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-trash-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/SubjectManagerment/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);                               
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .OpenDeleteItem': function (e, value, row, index) {
                        Sv.ChecPermission("Delete", function () {
                            Dialog.ConfirmCustom("Xác nhận", 'Bạn có xóa lớp học ' + (row.Name == null ? 'này' : row.Name) + '?', function () {

                                base.SubmitServer("Delete", row.Id);
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            url: "/Admin/SubjectManagerment/GetData",
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
        Sv.Loading();
        if (action == "Delete")
        {
            Sv.AjaxPost({
                Url: "/SubjectManagerment/Delete",
                Data: { Id:id}
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
                       Sv.EndLoading();
                       Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                   });
        }
        else
        {
            var $form = $("#formDetail").on();
            var url = "/SubjectManagerment/Create";
            if (action == "Edit") {
                url = "/SubjectManagerment/Update";
            }
            if ($form.valid(true)) {
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
                        Sv.EndLoading();
                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                    });
            }
        }     
    }
    
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#txtSubjectCode').val();
        obj.Name = $('#txtSubjectName').val();       
        obj.Active = $("#ddlActive :selected").val();
        return obj;
    }

}
$(document).ready(function () {
    var unit = new Unit();    
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({       
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
        $("#txtSubjectCode").val('');
        $("#txtSubjectName").val('');
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();       
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/SubjectManagerment/ShowModal";
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
