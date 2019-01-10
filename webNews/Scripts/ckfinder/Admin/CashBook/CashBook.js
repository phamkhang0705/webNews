var offset = 0;
var limit = 0;
var requestUrl = "/CashBook/Getdata";

var $table = $('#table');
var branchCode = '';
var paymentTypeCode = '';
var $boxDetails = $("#box-detail");
var $otherPersonDetails = $("#otherperson-detail");
var $paymentTypeDetails = $("#paymenttype-detail");
var type = 0;
var $isApprove = false;
var $paymentId = -1;
var $crrUser = "";

$(document).ready(function () {

    var getFormData = function() {
        var obj = $("#formDetail").serialize();
        obj.Type = type;
        return obj;
    }
    $('#divFromDate').data("DateTimePicker").date(Sv.DefaultDate().FormDate);
    $('#divToDate').data("DateTimePicker").date(Sv.DefaultDate().ToDate);
    $('#divFromDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);
    $('#divToDate').data("DateTimePicker").maxDate(Sv.DefaultDate().MaxDate);

    var params = Sv.getAllUrlParams(window.location.href);
    if (params.type != null && params.type != undefined && params.type != 1) {
        requestUrl = "/CashBook/Getdata1";
        type = params.type;
    }

    $('#btnSearch').on('click', function () {
        $table.bootstrapTable('refresh');
    });

    $('#txtBranchCode').on('change', function () {
        branchCode = "";
        if ($('#txtBranchCode').val() != null) {
            for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
                branchCode += $('#txtBranchCode').val()[i] + ',';
            }
        }
    });
    $('#txtPaymentTypeCode').on('change', function () {
        paymentTypeCode = "";
        if ($('#txtPaymentTypeCode').val() != null) {
            for (var i = 0; i < $('#txtPaymentTypeCode').val().length; i++) {
                paymentTypeCode += $('#txtPaymentTypeCode').val()[i] + ',';
            }
        }
    });

   var LoadTableSearch = function ($table, url, responseFnc) {
        $table.bootstrapTable('refreshOptions', {
            url: url,
            responseHandler: function (res) {
                return responseFnc(res);
            },
        });
    }

    $table.bootstrapTable({
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
        url: requestUrl,
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    FromDate: $('#txtFromDate').parent().data("DateTimePicker").date(),
                    ToDate: $('#txtToDate').parent().data("DateTimePicker").date(),
                    BranchCode: branchCode,
                    PaymentTypeCode: paymentTypeCode,
                    Method: $('#txtSearchPaymentMethod').val(),
                    Accounting: $('#txtSearchAccounting').val(),
                    Status: $("#txtStatus").val()
                }
            };
        },
        responseHandler: function (res) {
            $isApprove = res.isApprove;
            $crrUser = res.userName;
            if (res.dataReport != null){
                $("#Quydauky").html(Sv.FormatMoney(res.dataReport.Quydauky));
                $("#Tongthu").html(Sv.FormatMoney(res.dataReport.Tongthu));
                $("#Tongchi").html(Sv.FormatMoney(res.dataReport.Tongchi));
                $("#Tonquy").html(Sv.FormatMoney(res.dataReport.Tonquy));
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
                    return Sv.BootstrapTableSTT($table, index);
                }
            }, {
                field: 'Payments_Code',
                title: 'Mã phiếu',
                align: 'center',
                valign: 'middle',
                width: '150px'
            }, {
                field: 'Payments_CreatDate',
                title: 'Thời gian',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value) {
                    return moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY HH:mm');
                }
            }, {
                field: 'Payments_Person',
                title: 'Người nhận',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'Payments_TotalMoney',
                title: 'Giá trị',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    return (parseInt(value)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                }
            }, {
                field: 'Payments_Decription',
                title: 'Lý do',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'Payments_Active',
                title: 'Trạng thái',
                valign: 'middle',
                align: 'right',
                width: '120px',

                formatter: function (value, row) {
                    var re = "";
                    if (value == 0) {
                        re = "Từ chối";
                    }
                    else if (value == 1) {
                        re = type == 2 ? "Đã thu" : "Đã chi";
                    }
                    else if (value == 2) {
                        re = "Đã hủy";
                    }
                    else if (value == 3) {
                        re = "Chưa phê duyệt";
                    }
                    else if (value == 4) {
                        re = "Kế toán trưởng đã duyệt";
                    }
                    else if (value == 5) {
                        re = "GĐ tài chính đã duyệt";
                    }
                    return re;
                }
            },
            {
                title: "Thao tác",
                align: "Center",
                width: '100px',
                formatter: function (value, row, index) {//
                    var str = "";
                    if ($crrUser == row.Payments_UserName) {
                        str += "<button type='button' data-code='%s' class='OpenEditItem btn btn-primary btn-in-table' title='Sửa'><i class='fa fa-pencil-square-o'></i></button>";
                    }
                    
                    if (row.Payments_Type == 0 && $isApprove) {
                        str += "<button type='button' data-code='%s' class='OpenApproveItem btn btn-primary btn-in-table' title='Phê duyệt'><i class='fa fa-check-square-o'></i></button>";
                    }
                    if (row.Payments_Active != 3) {
                        //str +=
                            //"<button type='button' data-code='%s' class='cancleinvoice btn btn-primary btn-in-table' disabled title='Hủy phiếu'><i class='fa fa-remove'></i></button>";
                    } else {
                        str +=
                            "<button type='button' data-code='%s' class='cancleinvoice btn btn-primary btn-in-table' title='Hủy phiếu'><i class='fa fa-remove'></i></button>";
                    }
                    return str;
                },
                events: {
                    'click .OpenEditItem': function (e, value, row, index) {
                        Sv.Loading();
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/CashBook/ShowModal";
                            var model = {
                                id: row.Payments_Id, type: type, action: "Edit"
                            };
                            $paymentId = row.Payments_Id;
                            Sv.BindPopup(url, model, function (rs) {
                                Sv.EndLoading();
                                $boxDetails.html(rs);
                                $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                Sv.SetupDateAndSetDefault($('#divDate'), row.Payments_CreatDate);

                                $("#txtCode").prop("disabled", "disabled");
                                $("#txtTotalMoney").number(true);
                            });
                        });
                    },
                    'click .OpenApproveItem': function (e, value, row, index) {
                        Sv.Loading();
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/CashBook/ShowModal";
                            var model = {
                                id: row.Payments_Id, action: "Approve"
                            };
                            $paymentId = row.Payments_Id;
                            Sv.BindPopup(url, model, function (rs) {
                                Sv.EndLoading();
                                $boxDetails.html(rs);
                                $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                                $("#formDetail :input").attr("disabled", true);
                                $("#txtTotalMoney").number(true);
                                $boxDetails.find("#txtNote").prop("disabled", "");
                            });
                        });
                    },
                    'click .cancleinvoice': function (e, value, row, index) {
                        Sv.ChecPermission("View", function () {
                            if (confirm("Bạn có chắc chắn muốn hủy không?")) {
                                Sv.AjaxPost({
                                        Url: "/CashBook/Delete",
                                        Data: { code : row.Code }
                                    },
                                    function(rs) {
                                        if (rs.Status == "01") {
                                            Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                                            $boxDetails.find("#modalDetails").modal("hide");
                                            base.LoadTableSearch();
                                        } else {
                                            Dialog.Alert(rs.Message, Dialog.Error);
                                        }
                                    },
                                    function() {
                                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                                    });
                            }
                        });
                    }
                }
            }
        ]
    });

    var loadPersonType = function() {
        Sv.AjaxPost({
                Url: "/CashBook/GetPersons",
                Data: { type: $("#txtPersonType").val() }
            },
            function (rs) {
                var html = '';
                try {
                    for (var i = 0; i < rs.length; i++) {
                        html += '<option value="' + rs[i].Name + '">' + rs[i].Text + '</option>';
                    }

                } catch (e) {

                }
                $("#txtPerson").html(html);
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }

    var loadPaymentType = function() {
        Sv.AjaxPost({
            Url: "/CashBook/GetPaymentTypes",
                Data: { type: type }
            },
            function (rs) {
                var html = '<option value="">Chọn loại phiếu</option>';
                try {
                    for (var i = 0; i < rs.length; i++) {
                        html += '<option value="' + rs[i].Id + '">' + rs[i].PaymentTypeName + '</option>';
                    }

                } catch (e) {

                }
                $("#txtPaymentType").html(html);
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }

    $("#box-detail").on('change', 'select#txtPersonType', function () {
        var _type = $("#txtPersonType").val();

        if (_type == 4) {
            $("#addOtherPerson").prop("disabled", "");
        } else {
            $("#addOtherPerson").prop("disabled", "disabled");
        }

        loadPersonType();
    });

    $("#box-detail").on('change', 'select#txtPaymentType', function () {
        var _type = $("#txtPaymentType").val();

        if (_type == null || _type == "") {
            $("#editPaymentType").prop("disabled", "disabled");
        } else {
            $("#editPaymentType").prop("disabled", "");
        }
    });
    $("#box-detail").on('change', 'select#txtMethod', function () {
        var _type = $("#txtMethod").val();

        if (_type == 2) {
            $("#grBankAccount").show();
        } else {
            $("#grBankAccount").hide();
        }
    });

    $("#openAdd").on('click', function() {
                var url = "/Admin/CashBook/ShowModal";
                var model = {
                    id: 0, action: "Add", type : type
                };
                Sv.BindPopup(url, model, function (rs) {
                    $boxDetails.html(rs);
                    $boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                    Sv.SetupDateAndSetDefault($('#divDate'), Sv.DefaultDate().Default);
                    $("#txtTotalMoney").number(true, 0);
                    $("#txtCode").prop("disabled", "");
                });
            });

    $("#box-detail").on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        if ($("#txtPerson").val() == "" || $("#txtPerson").val() == null) {
            Dialog.Alert("Người dùng không được để trống!", Dialog.Error);
            return;
        }
        if (parseFloat($("#txtTotalMoney").val()) == 0 || parseFloat($("#txtTotalMoney").val()) < 0) {
            Dialog.Alert("Số tiền không hợp lệ!", Dialog.Error);
            return;
        }
        if ($("#txtPaymentType").val() == "") {
            Dialog.Alert("Vui lòng chọn loại phiếu!", Dialog.Error);
            return;
        }

        Sv.AjaxPost({
            Url: "/CashBook/Create",
            Data: getFormData()
        },
        function (rs) {
            if (rs.Status == "01") {
                Dialog.Alert(rs.Message, Dialog.Success);
                $boxDetails.find("#modalDetails").modal("hide");
                LoadTableSearch();
            } else {
                Dialog.Alert(rs.Message, Dialog.Error);
            }
        },
        function () {
            Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
        });
    });

    $("#box-detail").on('click', 'button#btnEdit', function (e) {
        e.preventDefault();

        Sv.AjaxPost({
                Url: "/CashBook/Update",
                Data: getFormData()
            },
            function (rs) {
                if (rs.Status == "01") {
                    Dialog.Alert(rs.Message, Dialog.Success);
                    $boxDetails.find("#modalDetails").modal("hide");
                    LoadTableSearch();
                } else {
                    Dialog.Alert(rs.Message, Dialog.Error);
                }
            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    });

    $('#btnCancle').on('click', function () {
                Sv.AjaxPost({
                        Url: "/CashBook/Delete",
                        Data: getFormData()
                    },
                    function (rs) {
                        if (rs.Status == "01") {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                            $boxDetails.find("#modalDetails").modal("hide");
                            LoadTableSearch();
                        } else {
                            Dialog.Alert(rs.Message, Dialog.Error);
                        }
                    },
                    function () {
                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                    });
            });

    //=========================APPROVE AND REJECT PAYMENT==========================================
    $("#box-detail").on('click', 'button#btnReject', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
            "Xác nhận từ chối phiếu?",
            function () {
                Sv.Loading();
                Sv.AjaxPost({
                        Url: "/CashBook/RejectPayment",
                        Data: getFormData()
                    },
                    function (rs) {
                        Sv.EndLoading();
                        if (rs.ResponseCode == "01") {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                            $boxDetails.find("#modalDetails").modal("hide");
                            LoadTableSearch();
                        } else {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                        }
                    },
                    function () {
                        Sv.EndLoading();
                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                    });
            });
        
    });

    $("#box-detail").on('click', 'button#btnApprove', function (e) {
        e.preventDefault();
        Dialog.ConfirmCustom("",
            "Xác nhận phê duyệt phiếu?",
            function () {
                Sv.Loading();
                Sv.AjaxPost({
                    Url: "/CashBook/ApprovePayment",
                    Data: { id: $paymentId }
                    },
                    function (rs) {
                        Sv.EndLoading();
                        if (rs.ResponseCode == "01") {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                            $boxDetails.find("#modalDetails").modal("hide");
                            LoadTableSearch();
                        } else {
                            Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                        }
                    },
                    function () {
                        Sv.EndLoading();
                        Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                    });
            });
    });


    //=========================Add, Edit paymentType and Other Person==============================
    $otherPersonDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        Sv.Loading();
        Sv.AjaxPost({
                Url: "/CashBook/AddOtherPerson",
                Data: {
                    PersonName: $("#txtPersonName").val(),
                    Address: $("#txtAddress").val(),
                    Tel: $("#txtTel").val(),
                    Fax: $("#txtFax").val(),
                    Description: $("#txtDescription").val()
                }
            },
            function(rs) {
                Sv.EndLoading();
                if (rs.ResponseCode == "01") {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                    $("#otherperson-detail #formDetail1").modal("hide");
                    loadPersonType();
                } else {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                }
            },
            function() {
                Sv.EndLoading();
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });


    });

    $paymentTypeDetails.on('click', 'button#btnAdd', function (e) {
        e.preventDefault();
        Sv.Loading();
        Sv.AjaxPost({
                Url: "/CashBook/AddPaymentType",
                Data: $("#modalDetailsPayment #formDetail").serialize()
            },
            function (rs) {
                Sv.EndLoading();
                if (rs.ResponseCode == "01") {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                    $("#modalDetailsPayment #formDetail").modal("hide");
                    loadPaymentType();
                } else {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                }
            },
            function () {
                Sv.EndLoading();
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });

    });

    $paymentTypeDetails.on('click', 'button#btnEdit', function (e) {
        e.preventDefault();
        Sv.Loading();
        Sv.AjaxPost({
                Url: "/CashBook/UpdatePaymentType",
                Data: $("#modalDetailsPayment #formDetail").serialize()
            },
            function (rs) {
                Sv.EndLoading();
                if (rs.ResponseCode == "01") {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                    $("#modalDetailsPayment #modalDetails").modal("hide");
                } else {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                }
            },
            function () {
                Sv.EndLoading();
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });

    });

    $("#box-detail").on('click', 'button#addPaymentType', function (e) {
        e.preventDefault();
        Sv.ChecPermission("View", function () {
            var url = "/Admin/CashBook/ShowModalPaymentType";
            var model = {
                id: 0, Action: "Add"
            }
            Sv.BindPopup(url, model, function (rs) {
                Sv.EndLoading();
                $paymentTypeDetails.html(rs);
                $paymentTypeDetails.find("#modalDetailsPayment").modal({ backdrop: "static" });
            });
        });
        
    });

    $("#box-detail").on('click', 'button#editPaymentType', function (e) {
        e.preventDefault();
        Sv.ChecPermission("View", function () {
            var url = "/Admin/CashBook/ShowModalPaymentType";
            var model = {
                id: $("#txtPaymentType").val(), Action: "Edit"
            }
            Sv.BindPopup(url, model, function (rs) {
                Sv.EndLoading();
                $paymentTypeDetails.html(rs);
                $paymentTypeDetails.find("#modalDetailsPayment").modal({ backdrop: "static" });
            });
        });
    });

    $("#box-detail").on('click', 'button#addOtherPerson', function (e) {
        e.preventDefault();
        Sv.ChecPermission("View", function () {
            var url = "/Admin/CashBook/ShowModalOtherPerson";
            var model = {Action: "Add"}
            Sv.BindPopup(url, model, function (rs) {
                Sv.EndLoading();
                $otherPersonDetails.html(rs);
                $otherPersonDetails.find("#modalDetail1s").modal({ backdrop: "static" });
            });
        });
    });

    //=========================End Add, Edit paymentType and Other Person==========================

    //EXPORT EXCELL
    $('#btnExportExcel').on('click', function () {
        var dataTable = $table.bootstrapTable('getData');
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }

        var branchCode = '';
        if ($('#txtBranchCode').val() != null) {
            for (var i = 0; i < $('#txtBranchCode').val().length; i++) {
                branchCode += $('#txtBranchCode').val()[i] + ',';
            }
        }
        window.location = '/ReportEndOfDay/ExportExcel?' +
            'ReportDate=' + $('#txtDate').val() +
            '&Type=' + $('#txtType').val() +
            '&BranchCode=' + branchCode +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
});