var invoiceCodeSearch;
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
                title: 'Mã chương trình đào tạo',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên chương trình đào tạo',
                field: 'Name',
                align: "left",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Mô tả',
                field: 'Description',
                align: "left",
                valign: "middle"
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

                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/EducationProgramSubject/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });

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
        var data = Sv.getFormData($("#formDetail"));

        var list = [];
        $("input[ischeck]").each(function () {
            if ($(this).is(':checked')) {
                var id = $(this).val();
                var lesson = isNaN(parseInt($("#lesson" + id).val())) ? 0 : parseInt($("#lesson" + id).val());

                list.push({
                    Id: id,
                    NumberOfLessons: lesson
                });
            }
        });
        data.Subjects = list;
        return data;
    }

    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/EducationProgramSubject/Update";

        if ($form.valid(true)) {
            Sv.Loading();
            Sv.AjaxPost({
                    Url: url,
                    Data: base.GetFormData()
                },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.ResponseCode == "01") {
                        Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.OpentDisable();
                        base.LoadTableSearch();
                    } else {
                        Sv.EndLoading();
                        Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                    }
                },
                function () {
                    Sv.EndLoading();
                    Dialog.Alert("Lỗi hệ thống", Dialog.Error);
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
        obj = $("#formSearch").serializeArray();
        return obj;
    }

    this.resetSearch = function () {
        Sv.ResetForm($("#formSearch"));
    }

}

var unit = new Unit();

$(document).ready(function () {

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/EducationProgram/GetData",
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
    });
    unit.$btnSearchSubmit.click(function () {


        unit.LoadTableSearch();
        unit.resetSearch();
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/EducationProgramSubject/ShowModal";
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
    $("input[ischeck]").each(function () {
        if ($(this).is(':checked')) {
            var id = $(this).val();
            var lesson = isNaN(parseInt($("#lesson" + id).val())) ? 0 : parseInt($("#lesson" + id).val());

            list.push({
                Id: id,
                NumberOfLessons: lesson
            });
        }
    });
    unit.$boxDetails.on('click', 'input#checkAll', function (e) {
        $("input[ischeck]").each(function () {
            $(this).prop('checked', unit.$boxDetails.find("#checkAll").prop("checked"));
        });
    });
});
