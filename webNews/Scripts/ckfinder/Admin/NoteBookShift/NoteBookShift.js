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
                title: 'Ca làm việc',
                field: 'Name',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhân viên trực ca',
                field: 'StaffName',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nội dung trực ca',
                field: 'Detail',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nội dung bàn giao',
                field: 'DetailHandover',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/NoteBookShift/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $('#formDetail #txtWorkingShiftsId').select2();
                                $('#formDetail #txtListStaffId').select2();
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
        //var data = $('#formDetail').serialize();
        var data = {};
        data.Id = $('#formDetail input[name="Id"]').val();
        data.Detail = $('#formDetail #txtDetail').val();
        data.DetailHandover = $('#formDetail #txtDetailHandover').val();
        data.WorkingShiftsId = $('#formDetail #txtWorkingShiftsId').val();
        var listStaff = '';
        if ($('#formDetail #txtListStaffId').val() != null) {
            for (var i = 0; i < $('#formDetail #txtListStaffId').val().length; i++) {
                listStaff += $('#formDetail #txtListStaffId').val()[i] + ',';
            }
        }
        data.ListStaffId = listStaff;
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/NoteBookShift/Create";
        if (action == "Edit") {
            url = "/NoteBookShift/Update";
        }
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
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
        }
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.WorkingShiftId = $('#searchModal #txtWorkingShiftId').val();
        obj.StaffId = $('#searchModal #txtStaffId').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/NoteBookShift/GetData",
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
        $('#searchModal #txtWorkingShiftsId').select2();
        $('#searchModal #txtListStaffId').select2();
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
        Sv.ResetForm($("#formSearch"), $("#sFromDate"), $("#sToDate"));
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/NoteBookShift/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            $('#formDetail #txtWorkingShiftsId').select2();
            $('#formDetail #txtListStaffId').val('-1').select2();
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