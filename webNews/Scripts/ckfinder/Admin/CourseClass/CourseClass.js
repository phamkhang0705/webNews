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
                title: 'Lớp học',
                field: 'ClassName',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Khóa học',
                field: 'CourseName',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Giáo viên',
                field: 'TeacherName',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Từ ngày',
                field: 'FromDate',
                align: "center",
                formatter: function (value, data) {
                    if (data.FromDate == null)
                        return '';
                    var dateString = data.FromDate.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    return day + "/" + month + "/" + year;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Đến ngày',
                field: 'ToDate',
                align: "center",
                formatter: function (value, data) {
                    if (data.ToDate == null)
                        return '';
                    var dateString = data.ToDate.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    return day + "/" + month + "/" + year;
                }
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số tiền khóa học',
                field: 'AmountOfMoney',
                align: "center"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Số buổi học',
                field: 'NumberOfSessions',
                align: "center"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                formatter: function (value, data, index) {
                    if (data.Status == 1) {
                        return "Kết thúc";
                    } else if (data.Status == 2) {
                        return "Đang học";
                    } else if (data.Status == 3) {
                        return "Trong tiến trình";
                    } else if (data.Status == 4) {
                        return "Trong kế hoạch";
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
                        str += "<button data-code='%s' class='OpenDeleteItem btn btn-primary btn-in-table' title='Xóa'><i class='fa fa-trash-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/CourseClass/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });

                                $(".inputnumber").number(true, 0);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#divFDate'), row.FromDate);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#divTDate'), row.ToDate);
                            });
                        });
                    },
                    'click .OpenDeleteItem': function (e, value, row, index) {
                        Sv.ChecPermission("Delete", function () {
                            Dialog.ConfirmCustom("Xác nhận", 'Bạn có xóa map lớp học và khóa học?', function () {

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
            url: "/Admin/CourseClass/GetData",
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.Total == 0) {
                    base.$table.bootstrapTable('removeAll');
                }
                return {
                    total: res.Total,
                    rows: res.DataList
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
        if (action == "Delete") {
            Sv.Loading();
            Sv.AjaxPost({
                    Url: "/CourseClass/Delete",
                    Data: { Id: id }
                },
                function (rs) {
                    Sv.EndLoading();
                    if (rs.ResponseCode == "01") {
                        Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                        base.LoadTableSearch();
                    } else {
                        Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                    }
                },
                function () {
                    Sv.EndLoading();
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        }
        else {
            var $form = $("#formDetail").on();
            var url = "/CourseClass/Create";
            if (action == "Edit") {
                url = "/CourseClass/Update";
            }
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
                            base.LoadTableSearch();
                        } else {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Error);
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
        obj.ClassId = $('#sClassId :selected').val();
        obj.TeacherId = $('#sTeacherId :selected').val();
        obj.CourseId = $('#sCourseId :selected').val();
        obj.Status = $("#sStatus :selected").val();
        return obj;
    }

}
$(document).ready(function () {
    var unit = new Unit();

    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                offset: p.offset,
                limit: p.limit

            };
        },
        columns: unit.Columns()
    }));
    unit.LoadTableSearch();
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/CourseClass/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            
            Sv.SetupOnlyDate($('#divFDate'));
            Sv.SetupOnlyDate($('#divTDate'));
            $(".inputnumber").number(true, 0);
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
