var listStudent = [];
var funding = 0;
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
                title: 'Mã học viên',
                field: 'StudentCode',
                align: "left",
                width: "100px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên học viên',
                field: 'StudentName',
                align: "left",
                width: "150px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "center",
                width: "100px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Phí tham dự',
                field: 'Funding',
                align: "right",
                width: "100px",
                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Thanh toán',
                field: 'IsPaid',
                align: "right",
                width: "150px",
                formatter: function (value) {
                    if (value == "1") {
                        return "Đã thanh toán";
                    } else {
                        return "Chưa thanh toán";
                    }
                }
            }), Sv.BootstrapTableColumn("String", {
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
                            var url = "/Admin/ClassStudentEvent/ShowModalUpdate";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $('#formUpdate #txtClassOfCourseIdStudentId').prop("disabled", true);
                                $('#formUpdate #txtCourseId').prop("disabled", true);
                                jQuery(function () {
                                    $('#txtFunding').number(true, 0);
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
                }
                return {
                    total: res.total,
                    rows: res.data
                };
            },
        });
    }
    base.GetFormData = function () {
        var data = $('#formUpdate').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if (action == "Add") {
            var url = "/ClassStudentEvent/Create";
            if ($form.valid(true)) {
                Sv.AjaxPost({
                    Url: url,
                    Data: {
                        eventId: $('#formDetail #txtEventId').val(),
                        list: JSON.stringify(listStudent)
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
                    function error() {
                        //Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                        console.log(error);
                    });
            }
        }
        if (action == "Edit") {
            var url = "/ClassStudentEvent/Update";
            if ($('#formUpdate').valid(true)) {
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
                    function error() {
                        //Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                        console.log(error);
                    });
            }
        }
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.CourseId = $('#txtCourseId').val();
        obj.ClassId = $('#txtClassId').val();
        return obj;
    }
}

var tableDetail = function () {
    var $tableDetail = $('#tableDetail');
    $tableDetail.bootstrapTable({
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
        url: '/ClassStudentEvent/GetClassOfCourseStudent/',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    CourseId: $('#formDetail #txtCourseId').val(),
                    ClassId: $('#formDetail #txtClassOfCourseIdStudentId').val(),
                    EventId: $('#formDetail #txtEventId').val()
                }
            };
        },
        responseHandler: function (res) {
            funding = res.eventFunding.Funding;
            listStudent = res.data;
            for (var i = 0; i < listStudent.length; i++) {
                listStudent[i].IsPaid = false;
                listStudent[i].Funding = funding;
                listStudent[i].BirthDay = moment(new Date(parseInt(listStudent[i].BirthDay.slice(6, -2)))).format('YYYY/MM/DD HH:mm');
            }
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($tableDetail, index);
                }
            }, {
                title: 'Mã học viên',
                field: 'StudentCode',
                align: "left",
                width: "100px"
            }, {
                title: 'Tên học viên',
                field: 'StudentName',
                align: "left",
                width: "150px"
            }, Sv.BootstrapTableColumn("string", {
                title: 'Ngày sinh',
                field: 'BirthDay',
                align: "center",
                width: "100px",
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY');
                }
            }), {
                title: 'Phí tham dự',
                field: 'Funding',
                align: "right",
                width: "100px",
                formatter: function (value, row, index) {
                    var str = "";
                    str += "<input class='form-control input-sm funding input-number' style='text-align: right' name='Funding-" + index + "' value=" + (funding != null ? parseInt(funding).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : "0") + ">";
                    return str;
                },
                events: {
                    'keyup .funding': function (e, value, row, index) {
                        listStudent[index].Funding = parseInt($(e.target).val());
                        jQuery(function () {
                            $('.funding').number(true, 0);
                        });
                    }
                }
            }, {
                title: 'Thanh toán',
                field: 'IsPaid',
                align: "center",
                width: "150px",
                formatter: function (value, row, index) {
                    var str = "<select name='IsPaid-" + index + "' class='form-control input-sm IsPaid'>" +
                        "<option value='false'>Chưa thanh toán</option>" +
                        "<option value='true'>Đã thanh toán</option>" +
                        "</select>";
                    return str;
                },
                events: {
                    'change .IsPaid': function (e, value, row, index) {
                        listStudent[index].IsPaid = $(e.target).val();
                    }
                }
            }
        ]
    });

}

$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/ClassStudentEvent/GetData",
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
        $('#txtBranchCode').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/ClassStudentEvent/ShowModalCreate";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            tableDetail();
        });


        //listStudent = $('#tableDetail').bootstrapTable("getData");


    });
    unit.$boxDetails.on('change', 'select#txtCourseId', function () {
        $('#tableDetail').bootstrapTable("refresh");
    });
    unit.$boxDetails.on('change', 'select#txtClassOfCourseIdStudentId', function () {
        $('#tableDetail').bootstrapTable("refresh");
    });
    unit.$boxDetails.on('change', 'select#txtEventId', function () {
        $('#tableDetail').bootstrapTable("refresh");
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