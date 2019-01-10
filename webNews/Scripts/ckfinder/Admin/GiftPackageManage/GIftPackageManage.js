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
                title: 'Mã gói quà tặng',
                field: 'Code',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên gói quà tặng',
                field: 'Name',
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Chi nhánh',
                field: 'BranchName',
                align: "left"
            }),
            //Sv.BootstrapTableColumn("string", {
            //    title: 'Danh sách quà tặng',
            //    field: 'ListGift',
            //    align: "left",
            //    formatter: function(value, data, index) {

            //    }
            //}), 
                Sv.BootstrapTableColumn("string", {
                    title: 'Trạng thái',
                    field: 'Active',
                    align: "left",
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
                            var url = "/Admin/GiftPackageManage/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.OpentDisable();
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $tableGift();
                                $('#formDetail').find('#txtBranchCode').on('change', function () {
                                    $('#tableGift').bootstrapTable('refresh');
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
        //var data = $('#formDetail').serialize();
        var listGiftId = "";
        $("input[type='checkbox'].giftId").each(function () {
            if ($(this).is(':checked')) {
                var giftId = $(this).attr('giftId');
                listGiftId += giftId + '#';
            }
        });
        var data = {};
        data.Id = $("#formDetail").find('input[type="hidden"][name="Id"]').val();
        data.Code = $("#formDetail").find('#txtCode').val();
        data.Name = $("#formDetail").find('#txtName').val();
        data.BranchCode = $("#formDetail").find('#txtBranchCode').val();
        data.Active = $("#formDetail").find('#txtActive').val();
        data.ListGiftId = listGiftId.substring(0, listGiftId.length - 1);
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/GiftPackageManage/Create";
        if (action == "Edit") {
            url = "/GiftPackageManage/Update";
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
                        base.OpentDisable();
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
        obj.Code = $('#txtGiftPackageCode').val();
        obj.BranchCode = $('#txtBranchCode').val();
        obj.Name = $('#txtGiftPackageName').val();
        obj.Active = $("#txtGiftPackageActive").val();
        return obj;
    }

}
var $tableGift = function () {
    var $listGiftId = [];
    $('#tableGift').bootstrapTable({
        locale: 'vi',
        classes: 'table table-condensed',
        pagination: true,
        height: 'auto',
        pageSize: 15,
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
        url: '/GiftPackageManage/GetAllGift',
        queryParams: function (p) {
            return {
                branchCode: $("#formDetail").find('#txtBranchCode').val(),
                id: $("#formDetail").find('input[name="Id"][type="hidden"]').val()
            };
        },
        responseHandler: function (res) {
            if (res.listGift.length > 0) {
                for (var i = 0; i < res.listGift.length; i++) {
                    $listGiftId.push(res.listGift[i]);
                }
            }
            return {
                total: res.total,
                rows: res.data
            };

        },
        columns: [
            {
                title: '<div class="checkbox"><label><input type="checkbox" class="form-control selectall" id="ckSelectAll"  style="height:25px"/><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var checked = "";
                    if ($listGiftId.includes(row.Id)) {
                        checked = "checked";
                    }
                    var str = '<div class="checkbox">';
                    str += '<label>' +
                        '<input type="checkbox" class="form-control giftId" giftId="' + row.Id + '" id="row-' + row.Id + '" style="height:25px" ' + checked + '/>' +
                        ' <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>' +
                        '</label>';
                    str += '</div>';
                    return str;
                },
                events: {
                }
            }, {
                field: 'Code',
                title: 'Mã qùa tặng',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'Name',
                title: 'Tên quà tặng',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }
        ]
    });

    $("input[type=checkbox].selectall").click(function () {
        if ($(this).is(':checked')) {
            $("input[type=checkbox].giftId").each(function () {
                $(this).prop("checked", true);
            });
        }
        else {
            $("input[type=checkbox].giftId").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/GiftPackageManage/GetData",
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
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/GiftPackageManage/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            $tableGift();
            $('#formDetail').find('#txtBranchCode').on('change', function () {
                $('#tableGift').bootstrapTable('refresh');
            });
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
