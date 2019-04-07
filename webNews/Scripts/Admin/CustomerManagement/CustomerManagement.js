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
                title: 'Mã khách hàng',
                field: 'CustomerCode',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên khách hàng',
                field: 'CustomerName',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Số điện thoại',
                field: 'Phone',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Email',
                field: 'Email',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Facebook',
                field: 'Facebook',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tỉnh/Thành phố',
                field: 'ProvinceName',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Quận/Huyện',
                field: 'DistrictName',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Phường/Xã',
                field: 'WardName',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Địa chỉ',
                field: 'Address',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mô tả',
                field: 'Description',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                filed: 'Status',
                align: "left",
                width: '150px',
                title: 'Trạng thái',
                formatter: function (value, row, index) {
                    if (row.Status === 1) {
                        return 'Hoạt động';
                    }
                    else {
                        return 'Ngừng hoạt động';
                    }
                }
            }),
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '80px',
                formatter: function (value, data, index) {
                    var str = "";
                    if (base.$perEdit === "1") {
                        str += "<button data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/CustomerManagement/ShowModal";
                            var model = {
                                id: row.Id,
                                action: "Edit",
                                status: row.Status,
                                provinceId: row.ProvinceId,
                                districtId: row.DistrictId,
                                wardId: row.WardId
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $('#formDetail #txtStatus').val(model.status).select2();
                                base.OpentDisable();
                                //                                $('#formDetail #txtProvinceId').val(row.ProvinceId).trigger('change');
                                base.GetDistrictByProvinceId(row.ProvinceId, row.DistrictId, '#txtDistrictId', true);
                                //                                $('#formDetail #txtDistrictId').val(row.DistrictId).trigger('change');
                                base.GetWardByDistrictId(row.DistrictId, row.WardId, '#txtWardId', true);
                                //                                $('#formDetail #txtWardId').val(row.WardId).trigger('change');
                            });


                        });
                    }
                }
            })];
        return obj;
    }

    this.SetupAmountMask = function () {
        //Mask_groupSeparator: '.',
        //Mask_radixPoint: ',',
        //Mask_integerDigits: 11,
        //Mask_digits: 0,
        $('.amount-mask').on().inputmask({
            alias: 'decimal',
            placeholder: '',
            groupSeparator: '.',
            radixPoint: ',',
            autoGroup: true,
            digits: 0,
            allowPlus: false,
            allowMinus: false,
            autoUnmask: true,
            integerDigits: 11
        });
    }

    this.OpentDisable = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtCustomerCode']").prop('disabled', true);
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            responseHandler: function (res) {
                base.$searchModal.modal("hide");
                if (res.total === 0) {
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
        var formData = $('#formDetail').serialize();
        formData += "&CustomerCode=" + $('#formDetail #txtCustomerCode').val();
        return formData;
    }
    //-- them sua xoa

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if ($form.valid()) {
            var dataForm = base.GetFormData();

            var url = "/CustomerManagement/Create";
            if (action === "Edit") {
                url = "/CustomerManagement/Update";
            }

            Sv.AjaxPost({
                Url: url,
                Data: dataForm
            }, function (rs) {
                if (rs.Status === "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    base.$boxDetails.find("#modalDetails").modal("hide");
                    base.OpentDisable();
                    base.LoadTableSearch();
                } else {
                    Dialog.Alert(rs.Message, Dialog.Error);
                }
            }, function () {
                Dialog.Alert(language.Message_Error, Dialog.Error);
            });
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.CustomerCode = $('#txtCustomerCode').val();
        obj.CustomerName = $('#txtCustomerName').val();
        obj.Phone = $('#txtPhone').val();
        obj.Email = $('#txtEmail').val();
        obj.Facebook = $('#txtFacebook').val();
        obj.Status = $('#txtStatus').val();
        return obj;
    }

    this.GetDistrictByProvinceId = function (provinceId, districtId, controlSelect, optionAll) {
        Sv.AjaxPost({
            Url: '/CustomerManagement/GetDistrictByProvinceId',
            Data: {
                provinceId: provinceId
            }
        }, function (response) {
            var val = $(controlSelect).val();
            var selected = '';
            $(controlSelect).empty();
            if (optionAll)
                $(controlSelect).append('<option value="-1">Tất cả</option>');
            if (!$.isEmptyObject(response))
                $.each(response, function (key, value) {
                    selected = districtId === value.Id ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.name + '</option>');
                });
        },
        function (error) {
            Dialog.Alert('Tải quận huyện thất bại', Dialog.Error);
        });
    }

    this.GetWardByDistrictId = function (districtId, wardId, controlSelect, optionAll) {
        Sv.AjaxPost({
            Url: '/CustomerManagement/GetWardByDistrictId',
            Data: {
                districtId: districtId
            }
        }, function (response) {
            var val = $(controlSelect).val();
            var selected = '';
            $(controlSelect).empty();
            if (optionAll)
                $(controlSelect).append('<option value="-1">Tất cả</option>');
            if (!$.isEmptyObject(response))
                $.each(response, function (key, value) {
                    selected = wardId === value.Id ? "selected" : "";
                    $(controlSelect).append('<option value="' + value.Id + '"' + selected + '>' + value.name + '</option>');
                });
        },
        function (error) {
            Dialog.Alert('Tải phường/xã thất bại', Dialog.Error);
        });
    }
}


$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/CustomerManagement/GetData",
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
        $('#formSearch #txtStatus').val('-1').trigger('change');
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/CustomerManagement/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            unit.OpentDisable();
            $('#formDetail #txtStatus').val('-1').select2();
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

    unit.$boxDetails.on('change', '#txtProvinceId', function (e) {
        e.preventDefault();
        var provinceId = $('#txtProvinceId').val();
        unit.GetDistrictByProvinceId(provinceId, null, '#txtDistrictId', true);
    });

    unit.$boxDetails.on('change', '#txtDistrictId', function (e) {
        e.preventDefault();
        var districtId = $('#txtDistrictId').val();
        unit.GetWardByDistrictId(districtId, null, '#txtWardId', true);
    });
});
