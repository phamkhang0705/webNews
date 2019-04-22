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
                title: 'Avatar',
                field: 'Avatar',
                align: "center",
                formatter: function (value, row, index) {
                    var url = row.Avatar.split("\\").pop(-1);
                    str = '<img class="img-preview" src="/Content/Cate/' + url + '" title="e" alt="" width="100" height="100" style="margin-bottom: 10px" />';
                    return str;
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
                field: 'FromAge',
                formatter: function (value, row, index) {
                    var ageType = "";
                    if (row.AgeType === 1) {
                        ageType = "Tháng";
                    } else {
                        ageType = "Tuổi";
                    }
                    return value + " " + ageType;
                }
            }), Sv.BootstrapTableColumn("NumberNull", {
                title: 'Đến tuổi',
                field: 'ToAge',
                formatter: function (value, row, index) {
                    var ageType = "";
                    if (row.AgeType === 1) {
                        ageType = "Tháng";
                    } else {
                        ageType = "Tuổi";
                    }
                    return value + " " + ageType;
                }
            }),
              Sv.BootstrapTableColumn("string", {
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

                                var groupIds = model.groupids.split(',');
                                //                                $('#formDetail #txtStatus').val(model.status).select2();
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
        var form = $('#formDetail').on();
        var obj = {};
        var description = CKEDITOR.instances['txtDescription'].getData();
        var infor = CKEDITOR.instances['txtMoreInformation'].getData();
        obj.Id = form.find('#txtId').val();
        obj.Code = form.find('#txtCode').val();
        obj.Name = form.find('#txtName').val();
        obj.GroupId = form.find('#txtGroupId').val();
        obj.AgeType = form.find('#txtAgeType').val();
        obj.FromAge = form.find('#txtFromAge').val();
        obj.ToAge = form.find('#txtToAge').val();
        //        obj.Description = form.find('#txtDescription').val();
        obj.Description = description;
        obj.MoreInformation = form.find('#txtMoreInformation').val();
        obj.MoreInformation = infor;
        obj.Status = form.find('#txtStatus').val();
        var prices = $('#formDetail').find('#divPrice .price');
        var lstPrices = [];
        for (var i = 0; i < prices.length; i++) {
            var price = {};
            price.OrderTypeId = prices.eq(i).attr('id');
            price.Code = prices.eq(i).attr('name');
            price.Price = prices.eq(i).val() ? prices.eq(i).val(): 0;
            lstPrices.push(price);
        }

        var images = $('#formDetail').find('.div-image .img-preview');
        var lstImages = [];
        for (var i = 0; i < images.length; i++) {
            var image = {};
            image.Id = images.eq(i).attr('id');
            lstImages.push(image);
        }

        obj.prices = JSON.stringify(lstPrices);
        obj.ListFiles = lstImages.length > 0 ? JSON.stringify(lstImages) : [];
        return obj;
    }
    //-- them sua xoa

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        if ($form.valid()) {
            var formData = new FormData();
            var dataForm = base.GetFormData();
            formData.append("Id", dataForm.Id);
            formData.append("Code", dataForm.Code);
            formData.append("Name", dataForm.Name);
            formData.append("Status", dataForm.Status);
            formData.append("Description", dataForm.Description);
            formData.append("MoreInformation", dataForm.MoreInformation);
            formData.append("GroupId", dataForm.GroupId);
            formData.append("AgeType", dataForm.AgeType);
            formData.append("FromAge", dataForm.FromAge);
            formData.append("ToAge", dataForm.ToAge);
            formData.append("prices", dataForm.prices);
            formData.append("ListFiles", dataForm.ListFiles);
            var length = $form.find("input[name='UploadFile']").length;
            var files;
            for (var i = 0; i < length; i++) {
                files = $form.find("input[name='UploadFile']")[i].files;
                if (action === "add") {
                    if (files.length === 0) {
                        Dialog.Alert("Vui lòng chọn ảnh", Dialog.Error);
                        return;
                    }
                } else {
                    if (dataForm.ListFiles.length === 0) {
                        if (files.length === 0) {
                            Dialog.Alert("Vui lòng chọn ảnh", Dialog.Error);
                            return;
                        }
                    }
                }
                formData.append("lstfiles" + i, files[0]);
            }
            var url = "/CategoryManagement/Create";
            if (action === "Edit") {
                url = "/CategoryManagement/Update";
            }
            Sv.AjaxPostDemo({
                Url: url,
                Data: formData
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
        obj.GroupId = $('#txtGroupId').val();
        obj.Code = $('#txtCode').val();
        obj.Name = $('#txtName').val();
        obj.Status = $('#txtStatus').val();
        obj.FromAge = $('#txtFromAge').val();
        obj.ToAge = $('#txtToAge').val();
        return obj;
    }
    this.RefreshIndex = function (selector) {
        var $form = $("#formDetail").on();
        var parent = $form.find('.parent');
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

            //            $('#formDetail #txtStatus').val('-1').select2();
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
    unit.$boxDetails.on('click', '#btnAddFile', function (e) {
        var $form = $('#formDetail').on();
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
    unit.$boxDetails.on('click', '#btnDelete', function (e) {
        var $form = $('#formDetail').on();
        var $this = $(this);
        var divParent = $this.parent().parent();
        divParent.remove();
        unit.RefreshIndex(".div-file");
        if ($form.find('.parent .div-file').length === 1) {
            $form.find('.parent .div-file').find('#btnDelete').addClass('hidden');
        }
    });
    unit.$boxDetails.on('click', '#btnDeleteImg', function (e) {
        var $this = $(this);
        var divParent = $this.parent().parent();
        divParent.remove();
    });
});
