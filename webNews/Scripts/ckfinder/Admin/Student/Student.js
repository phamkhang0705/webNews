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
                title: 'Mã học viên',
                field: 'Code',
                align: "left",
                width: "150px"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên học viên',
                field: 'Name',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên tiếng anh',
                field: 'English_Name',
                align: "left",
                width: "150px"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "left",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giới tính',
                field: 'SexName',
                align: "left",
                //formatter: function (value) {
                //    if (value == true || value == "true") {
                //        return 'Nam';
                //    } else {
                //        return "Nữ"
                //    }
                //}
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số điện thoại',
                field: 'Tel',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Địa chỉ',
                field: 'Address',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Email',
                field: 'Email',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Loại học viên',
                field: 'Type',
                align: "left",
                width: "150px",
                formatter: function (value, data, index) {
                    if (value == "0") return 'Học viên tiềm năng';
                    if (value == "1") return 'Học viên đang học';
                    if (value == "2") return 'Học viên kết thúc';
                    if (value == "3") return 'Học viên đang chờ mở lớp';
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày tạo',
                field: 'CreateDate',
                align: "left",
                width: "150px",
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('YYYY/MM/DD HH:mm') : '';
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
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Student/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefault($('#divBirthDay'), row.BirthDay);
                                Sv.SetupDateAndSetDefault($('#divContactDate'), row.ContactDate);
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
            }
        });
    }
    base.GetFormData = function () {
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var formData = new window.FormData($('#formDetail')[0]);
        formData.append('file', $('input[type=file]')[0].files[0]);
        var url = "/Student/Create";
        if (action == "Edit") {
            url = "/Student/Update";
        }
        if ($form.valid(true)) {
            $.ajax({
                url: url,
                type: 'Post',
                beforeSend: function () { },
                success: function (rs) {
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.OpentDisable();
                        base.LoadTableSearch();
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                },
                data: formData,
                cache: false,
                contentType: false,
                dataType: "json",
                processData: false
            });
            //Sv.AjaxPost({
            //    Url: url,
            //    Data: formData
            //},
            //    function (rs) {
            //        if (rs.Status == "01") {
            //            Dialog.Alert(rs.Message, Dialog.Success);
            //            base.$boxDetails.find("#modalDetails").modal("hide");
            //            base.OpentDisable();
            //            base.LoadTableSearch();
            //        } else {
            //            Dialog.Alert(rs.Message, Dialog.Error);
            //        }
            //    },
            //    function () {
            //        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            //    });
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
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Type = $("#txtType").val();
        obj.Tel = $('#txtTel').val();
        obj.Sex = $('#txtSex').val();
        obj.Email = $('#txtEmail').val();
        obj.BranchCode = $('#txtBranchCode').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/Student/GetData",
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
        $('#searchModal #txtBranchCode').val('-1').trigger('change');
        $('#searchModal #txtSex').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/Student/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefault($('#divBirthDay'), new Date());
            Sv.SetupDateAndSetDefault($('#divContactDate'), new Date());
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
    unit.$boxDetails.on('change', '#txtAvata', function (e) {
        var file = $('input[type=file]')[0].files[0];
        Sv.GetImageBase64(file, $('#imgAvata'));
    });
});