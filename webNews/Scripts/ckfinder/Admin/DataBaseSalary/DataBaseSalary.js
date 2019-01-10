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

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            url: "/Admin/DataBaseSalary/GetData",
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
                Url: "/DataBaseSalary/Delete",
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
            var url = "/DataBaseSalary/Create";
            if (action == "Edit") {
                url = "/DataBaseSalary/Update";
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
            else
            {
                Sv.EndLoading();
            }
        }     
    }
    
    this.GetFormSearchData = function () {
        var obj = {};      
        //obj.FullName = $('#txtStaffName').val();       
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
        columns: [[
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                rowspan: '2',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(unit.$table, index);
                }
            },
            //{
            //    field: 'StaffCode',
            //    title: 'Mã nhân viên',
            //    valign: 'middle',
            //    align: 'center', rowspan: '2',
            //    width: '120px'
            //}, {
            //    field: 'FullName',
            //    title: 'Tên nhân viên',
            //    valign: 'middle',
            //    align: 'center', rowspan: '2',
            //    width: '200px'
            //},
            {
                field: 'BranchName',
                title: 'Chi nhánh',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '200px'
            }, {
                colspan: 2,
                width: '240px',
                title: "Lương"
            }, {
                colspan: 2,
                width: '240px',
                title: "%BH"
            },
            {
                colspan: 2,
                width: '240px',
                title: "%BHYT"
            },
            {
                colspan: 2,
                width: '240px',
                title: "%BHTN"
            },
            {
                colspan: 2,
                width: '240px',
                title: "Phí công đoàn"
            },
            {
                colspan: 2,
                width: '240px',
                title: "Phụ cấp"
            }
            , {
                field: 'Active',
                title: 'Trạng thái',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '120px',
                formatter: function (value, data, index) {
                    if (data.Active == 1) {
                        return "Hoạt động";
                    } else {
                        return "Ngừng hoạt động";
                    }
                }
            }, {
                title: 'Thao tác',
                valign: 'middle',
                align: 'center', rowspan: '2',
                width: '120px',
                formatter: function (value, data, index) {//
                    var str = "";
                    if (unit.$perEdit == 1) {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    if (unit.$perDelete == 1) {
                        str += "<button data-code='%s' class='OpenDeleteItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-trash-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.Loading();
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/DataBaseSalary/ShowModal";
                            var model = {
                                id: row.Id, action: "Edit"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                Sv.EndLoading();
                                unit.$boxDetails.html(rs);
                                unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .OpenDeleteItem': function (e, value, row, index) {
                        Sv.ChecPermission("Delete", function () {
                            Dialog.ConfirmCustom("Xác nhận", 'Bạn có dữ liệu lương của nhân viên ' + (row.FullName == null ? 'này' : row.FullName) + '?', function () {

                                unit.SubmitServer("Delete", row.Id);
                            });
                        });
                    }
                }
            }
        ], [{
            field: 'BasicSalary',
            title: 'Lương thực nhận',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'SocialInsuranceSalary',
            title: 'Lương đóng BHXH',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'SocialInsurance_Personal',
            title: 'Cá nhân',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }, {
            field: 'SocialInsurance_Company',
            title: 'Công ty',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'HealthInsurance_Personal',
            title: 'Cá nhân',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'HealthInsurance_Company',
            title: 'Công ty',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'UnemploymentInsurance_Personal',
            title: 'Cá nhân',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'UnemploymentInsurance_Company',
            title: 'Công ty',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'CostUnion_Personal',
            title: 'Cá nhân',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'CostUnion_Company',
            title: 'Công ty',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'Allowance_Tel',
            title: 'Điện thoại',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                if (value == null)
                    return '';
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }
        , {
            field: 'Allowance_Car',
            title: 'Xăng xe',
            valign: 'middle',
            align: 'right',
            width: '120px',
            formatter: function (value, row) {
                if (value == null)
                    return '';
                return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            }
        }

        ]]
    }));
    unit.LoadTableSearch();
    unit.$btnOpenSearch.click(function () {
        $('#txtStaffName').val('');
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();       
    });

    unit.$btnOpenAdd.click(function () {
        Sv.Loading();
        var url = "/Admin/DataBaseSalary/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            Sv.EndLoading();
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
