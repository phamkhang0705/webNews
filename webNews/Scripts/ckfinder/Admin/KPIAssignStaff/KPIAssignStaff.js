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
                title: 'Mã nhân viên',
                field: 'StaffCode',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên nhân viên',
                field: 'StaffName',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Từ ngày',
                field: 'FromDate',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Đến ngày',
                field: 'ToDate',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "center",
                width: "150px",
                formatter: function (value) {
                    if (value == "1") {
                        return "Áp dụng";
                    } else {
                        return "Không áp dụng";
                    }
                }
            })
            , Sv.BootstrapTableColumn("String", {
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
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/KPIAssignStaff/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), row.FromDate);
                                Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), row.ToDate);
                                $('#formDetail #txtStaffId').prop('disabled', true);
                                initTable(model.id, 1);
                            });
                        });
                    }
                }
            })
        ];
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

    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var listStudent = [];
        $("input[type='checkbox'].KpiId").each(function () {
            if ($(this).is(':checked')) {
                var KpiId = $(this).attr('KpiId');
                listStudent.push(KpiId);
            }
        });
        var $form = $("#formDetail").on();
        if (action == "Add") {
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: "/KPIAssignStaff/Create",
                    Data: {
                        FromDate: $('#txtFromDate').val(),
                        ToDate: $('#txtToDate').val(),
                        StaffId: $('#formDetail #txtStaffId').val(),
                        listStudent: JSON.stringify(listStudent)
                    }
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
        if (action == "Edit") {
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: "/KPIAssignStaff/Update",
                    Data: {
                        Id: $('#formDetail input[name="Id"]').val(),
                        FromDate: $('#txtFromDate').val(),
                        ToDate: $('#txtToDate').val(),
                        listStudent: JSON.stringify(listStudent)
                    }
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
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.StaffName = $('#txtStaffName').val();
        obj.StaffCode = $('#txtStafCode').val();
        return obj;
    }
}


$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/KPIAssignStaff/GetData",
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
        $('#txtStaffId').val('-1').trigger('change');
        $('#txtStudentId').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/KPIAssignStaff/ShowModal";
        var model = {
            id: 0, action: "Add"
        };

        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divFromDate'), new Date());
            Sv.SetupDateAndSetDefaultNotMaxDate($('#formDetail #divToDate'), new Date());

            initTable(model.id, 0);
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

var initTable = function (id, assign) {
    var $listKpiId = [];
    var $selectedList = [];
    $("#tableStudent").bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 10,
        pageList: [10, 15, 20, 30, 50, 100],
        paginationFirstText: 'Trang đầu',
        paginationPreText: 'Trước',
        paginationNextText: 'Sau',
        paginationLastText: 'Trang cuối',
        showHeader: true,
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return 'Tổng:' + totalRows;
        },
        formatRecordsPerPage: function (pageNumber) {
            return 'Hiển thị ' + pageNumber + ' dòng trên trang';
        },
        formatNoMatches: function () {
            return 'Không tìm thấy dữ liệu theo điều kiện tìm kiếm. Vui lòng thử lại';
        },
        method: 'post',
        sidePagination: 'server',
        url: '/KPIAssignStaff/GetStudentToKpi',
        queryParams: function (p) {
            return {
                pageIndex: p.offset,
                pageSize: p.limit,
                StaffId: $('#txtStaffId').val(),
                StudentId: $('#txtStudentId').val(),
                Id: id,
                IsAssign: assign
            };
        },
        responseHandler: function (res) {
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length; i++) {
                    $listKpiId.push(res.data[i]);
                }
            }
            if (res.selectedList.length > 0) {
                for (var i = 0; i < res.selectedList.length; i++) {
                    $selectedList.push(res.selectedList[i].StudentId);
                }

            }
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($("#tableStudent"), index);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã học viên',
                field: 'Code',
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên học viên',
                field: 'Name',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "right",
                width: "100px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Giới tính',
                field: 'Sex',
                align: "center",
                width: "100px",
                formatter: function (value) {
                    if (value == "1") {
                        return "Name";
                    }
                    else return "Nữ";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Phụ huynh',
                field: 'MotherOrFather',
                align: "center",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'SĐT/Số ĐT phụ huynh',
                field: 'Tel',
                align: "center",
                width: "100px"
            }), Sv.BootstrapTableColumn("String", {
                title: '<div class="checkbox"><label><input type="checkbox" class="form-control selectall" id="ckSelectAll"  style="height:25px"/><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>',
                align: 'center',
                width: '80px',
                valign: 'middle',
                formatter: function (value, row) {
                    var checked = "";
                    if ($selectedList.includes(row.Id)) {
                        checked = "checked";
                    }
                    var str = '<div class="checkbox">';
                    str += '<label>' +
                        '<input type="checkbox" class="form-control KpiId" KpiId="' + row.Id + '" id="row-' + row.Id + '" style="height:25px" ' + checked + '/>' +
                        ' <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                        '</label>';
                    str += '</div>';
                    return str;
                }
            })
        ]
    });
    $("input[type=checkbox].selectall").click(function () {
        if ($(this).is(':checked')) {
            $("input[type=checkbox].KpiId").each(function () {
                $(this).prop("checked", true);
            });
        }
        else {
            $("input[type=checkbox].KpiId").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
}