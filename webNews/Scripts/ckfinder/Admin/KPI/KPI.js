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
                title: 'Tên',
                field: 'Name',
                align: "left",
                width: "150px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chỉ tiêu từ',
                field: 'ConditionFrom',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Chỉ tiêu đến',
                field: 'ConditionTo',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Tiền thưởng',
                field: 'ValueReward',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Dưới chỉ tiêu',
                field: 'DownConditionFrom',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tiền phạt',
                field: 'ValueFine',
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return value != null ? parseInt(value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Loại',
                field: 'Type',
                align: "left",
                width: "150px",
                formatter: function (value, row) {
                    if (value == "1") return "Bán hàng";
                    else if (value == "2") return "Đăng ký mới gói học phí";
                    else if (value == "3") return "Gia hạn gói học phí";
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Trạng thái',
                field: 'Active',
                align: "left",
                width: "100px",
                formatter: function (value, row) {
                    if (value == "2") return "Không áp dụng";
                    else if (value == "1") return "Áp dụng";
                }
            }), Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (base.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                        str += "<button data-code='%s' class='OpenDeleteItem btn btn-primary btn-in-table' title='Xóa'><i class='fa fa-remove'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/KPI/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                jQuery(function () {
                                    $('#txtConditionFrom').number(true, 0);
                                    $('#txtConditionTo').number(true, 0);
                                    $('#txtValueReward').number(true, 0);
                                    $('#txtDownConditionFrom').number(true, 0);
                                    $('#txtValueFine').number(true, 0);
                                });
                            });
                        });
                    },
                    'click .OpenDeleteItem': function (e, value, row, index) {
                        Dialog.ConfirmCustom("Xác nhận",
                            "Bạn có chắc chắn muốn xóa KPI này? ",
                            function () {
                                Sv.AjaxPost({
                                    Url: "/Admin/KPI/UpdateActive/",
                                    Data: {
                                        id: row.Id
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
        var data = $('#formDetail').serialize();
        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        if (checkForm($('#formDetail #txtConditionFrom').val(), $('#formDetail #txtConditionTo').val())) {
            var $form = $("#formDetail").on();
            var url = "/KPI/Create";
            if (action == "Edit") {
                url = "/KPI/Update";
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
        } else {

        }
    }
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Type = $('#txtType').val();
        obj.Name = $('#txtName').val();
        obj.Active = $('#txtActive').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/KPI/GetData",
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
        $('#txtType').val('-1').trigger('change');
        $('#txtActive').val('-1').trigger('change');
    });

    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/KPI/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            jQuery(function () {
                $('#txtConditionFrom').number(true, 0);
                $('#txtConditionTo').number(true, 0);
                $('#txtValueReward').number(true, 0);
                $('#txtDownConditionFrom').number(true, 0);
                $('#txtValueFine').number(true, 0);
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

var checkForm = function (conditionFrom, conditionTo) {
    if (conditionFrom != null && conditionTo != null) {
        if (conditionFrom > conditionTo) {
            Dialog.Alert('Chỉ tiêu từ phải nhỏ hơn hoặc bằng chỉ tiêu đến!', Dialog.Error);
            return false;
        }
    }
    return true;
}