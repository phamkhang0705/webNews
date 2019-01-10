var invoiceCodeSearch;
var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$table1 = $("#importHistory");

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
                title: 'Mã NS',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Họ và tên',
                field: 'FullName',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giới tính',
                field: 'Sex',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    if (value == true) {
                        return "Nam";
                    } else {
                        return "Nữ";
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tình trạng hôn nhân',
                field: 'MaritalStatus',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Bộ phận',
                field: 'Type',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giáo viên',
                field: 'IsForeign',
                align: "center",
                valign: "middle",
                formatter: function (value, data, index) {
                    if (value == true) {
                        return "Giáo viên nước ngoài";
                    } else {
                        return "Giáo viên Việt Nam";
                    }
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "center",
                valign: "middle",
                formatter: function (value, data) {
                    if (value == null)
                        return '';
                    var dateString = value.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    return day + "/" + month + "/" + year;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Quê quán',
                field: 'HomeTown',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'CMTND',
                field: 'IdentityCard',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                valign: "middle",
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
                width: '100px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    //str += "<button data-code='%s' class='delete btn btn-primary btn-in-table' title='Xóa'><i class='fa fa-bar-chart'></i></button>";

                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Staff/ShowModal";
                            var model = {
                                id: row.Id, branch: row.BranchCode, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });

                                Sv.SetupDateAndSetDefault($('#divDate'), row.BirthDay);
                                Sv.SetupDateAndSetDefault($('#divDate1'), row.DateOfRecruitment);
                                Sv.SetupDateAndSetDefault($('#divDate2'), row.IdentityCard_Date);
                                //bind data to form detail

                            });
                        });
                    },
                    'click .delete': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            base.$modalHistory1.modal({ backdrop: "static" });
                            invoiceCodeSearch = row.Code;
                            base.LoadHistoryTable1();
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
        var data = Sv.getFormData($("#formDetail"));
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var formData = new window.FormData($('#formDetail')[0]);
        formData.append('file', $('input[type=file]')[0].files[0]);
        var url = "/Staff/Create";
        if (action == "Edit") {
            url = "/Staff/Update";
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
            //        Url: url,
            //        Data: base.GetFormData()
            //    },
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
        $form.find("input[id='txtUserName']").prop('readonly', true);
        $form.find("select[id='txtType']").prop('readonly', true);
    }
    this.CloseDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCode']").prop('disabled', false);
        $form.find("input[id='txtUserName']").prop('readonly', false);
        $form.find("select[id='txtType']").prop('readonly', false);
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj = $("#formSearch").serializeArray();
        return obj;
    }

    this.resetSearch = function () {
        Sv.ResetForm($("#formSearch"));
        $("#txtSearchActive").val("-1").trigger("change");
    }

}

var unit = new Unit();

$(document).ready(function () {

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Staff/GetData",
        queryParams: function (p) {
            return {
                search: Sv.getFormData($("#formSearch")),
                offset: p.offset,
                limit: p.limit

            };
        },
        columns: unit.Columns()
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
        var url = "/Admin/Staff/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefault($('#divDate'), new Date());
            Sv.SetupDateAndSetDefault($('#divDate1'), new Date());
            Sv.SetupDateAndSetDefault($('#divDate2'), new Date());
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
