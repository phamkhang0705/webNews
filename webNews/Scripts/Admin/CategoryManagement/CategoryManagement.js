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
                title: 'Mã danh mục',
                field: 'Code',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Tên danh mục',
                field: 'Name',
                align: "left"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Nhóm',
                field: 'groupnames',
                align: "left"
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Từ tuổi',
                field: 'FromAge'
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Đến tuổi',
                field: 'ToAge'
            }),
            Sv.BootstrapTableColumn("string", {
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
                            var url = "/Admin/CategoryManagement/ShowModal";
                            var model = {
                                id: row.Id,
                                action: "Edit",
                                status: row.Status,
                                prices: row.prices,
                                groupids: row.groupids
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                base.SetupAmountMask();
                                base.FileAction();

                                var groupIds = model.groupids.split(',');
                                $('#formDetail #txtStatus').val(model.status).select2();
                                $('#formDetail #txtGroupId').val(groupIds).select2();
                                base.OpentDisable();
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.InitValidator = function () {
        var $form = $("#modalDetails").on();
        $form.find("input[id='txtFromAge']").number(true, 0);
        $form.find("input[id='txtToAge']").number(true, 0);
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
        $form.find("input[id='txtCode']").prop('disabled', true);
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
        var data = $('#formDetail').serializeArray();

        var dataForm = {};
        $(data).each(function (index, obj) {
            dataForm[obj.name] = obj.value;
        });

        return dataForm;
    }
    //-- them sua xoa

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var formData = new window.FormData($('#formDetail')[0]);
        var length = $form.find("input[name='UploadFile']").length;
        var files;
        for (var i = 0; i < length; i++) {
            files = $form.find("input[name='UploadFile']")[i].files;
            formData.append("lstfiles" + i, files[0]);
        }
        var dataForm = base.GetFormData();
        for (var key in dataForm) {
            formData.append(key, dataForm[key]);
        }
        var url = "/CategoryManagement/Create";
        if (action === "Edit") {
            url = "/CategoryManagement/Update";
        }
        if ($form.valid(true)) {
            $.ajax({
                url: url,
                type: 'Post',
                beforeSend: function () { },
                success: function (rs) {
                    if (rs.Status === "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
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
        }
    }

    this.GetFormSearchData = function () {
        var obj = {};
        obj.GroupId = $('#txtGroupId').val();
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Status = $('#txtStatus').val();
        obj.FromAge = $('#txtFromAge').val();
        obj.ToAge = $('#txtToAge').val();
        return obj;
    }

    this.FileAction = function () {
        var $form = $("#modalDetails").on();
        $form.on('click', '#btnAddFile', function (e) {
            var index = $form.find('.div-file').last().attr('index');
            index = parseInt(index);
            var _index = parseInt(index) + 1;
            var str = $('#divFile-1').html();
            var str1 = '<div class="col-xs-12 col-md-12 no-padding div-file" style="margin-top:5px" index="' + _index + '" id="divFile-' + _index + '">' + str + '</div>';
            $(str1).insertAfter($form.find('.div-file').last());
            $form.find('.div-file').each(function (index, element) {
                $(this).find('#btnDelete').removeClass('hidden');
            });
        });

        $form.on('click', '#btnDelete', function (e) {
            var $this = $(this);
            var divParent = $this.parent().parent();
            divParent.remove();
            unit.RefreshIndex(".div-file");
            if ($form.find('.div-file').length === 1) {
                $form.find('.div-file').find('#btnDelete').addClass('hidden');
            }
        });
    }

    this.RefreshIndex = function (selector) {
        var parent = $(selector).parent();
        parent.find(selector).each(function (i, e) {
            $(this).attr('index', i + 1);
            var id = $(this).attr('id');
            $(this).attr('id', id.split('-')[0] + "-" + (i + 1));
        });
    };
}


$(document).ready(function () {
    var unit = new Unit();
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
    unit.$table.bootstrapTable(Sv.BootstrapTableOption({
        url: "/Admin/CategoryManagement/GetData",
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
        $('#formSearch #txtGroupId').val('').trigger('change');
    });
    unit.$btnOpenAdd.click(function () {
        var url = "/Admin/CategoryManagement/ShowModal";
        var model = {
            id: 0, action: "Add"
        };
        Sv.BindPopup(url, model, function (rs) {
            unit.$boxDetails.html(rs);
            unit.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
            unit.SetupAmountMask();
            unit.FileAction();
            $('#formDetail #txtStatus').val('-1').select2();
            $('#formDetail #txtGroupId').select2();
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
