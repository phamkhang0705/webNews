var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$btnOpenSearch = $("#btnOpenSearch");
    this.$searchModal = $("#searchModal");
    this.$btnSearchSubmit = $("#btnSearchSubmit");
    this.$modalDetail = $("#modalDetails");
    base.$boxDetails = $("#box-detail");
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
                field: 'Code',
                width: "100px",
                align: "left"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên khách hàng',
                field: 'FullName',
                width: "150px",
                align: "left"
            }),
             Sv.BootstrapTableColumn("string", {
                 title: 'Giới tính',
                 field: 'Sex',
                 width: "80px",
                 align: "center",
                 formatter: function (value, data) {
                     if (data.Sex == true) {
                         return "Nam";
                     } else {
                         return "Nữ";
                     }
                 }
             }),
              Sv.BootstrapTableColumn("string", {
                 title: 'Ngày sinh',
                 field: 'BirthDay',
                 width: "120px",
                 align: "center",
                 formatter: function (value, data) {
                     if (data.CreateDate == null)
                         return '';
                     var dateString = data.CreateDate.substr(6);
                     var currentTime = new Date(parseInt(dateString));
                     var month = currentTime.getMonth() + 1;
                     var day = currentTime.getDate();
                     var year = currentTime.getFullYear();
                     return day + "/" + month + "/" + year;
                 }
             }),
               Sv.BootstrapTableColumn("string", {
                title: 'Điện thoại',
                field: 'Tel',
                width: "120px",
                align: "center"
               }),
                  Sv.BootstrapTableColumn("string", {
                      title: 'Tổng tiền bán',
                      field: 'SaleMoney',
                      width: "120px",
                      align: "right",
                      formatter: function (value, data) {                         
                          return $.number(data.SaleMoney);
                      }
                  }),
            Sv.BootstrapTableColumn("Number", {
                title: 'Nợ cần thu',
                field: 'SumMoney',
                width: "120px",
                align: "right",
                formatter: function (value, data) {
                    return $.number(data.SumMoney);
                }
            }),
           
            Sv.BootstrapTableColumn("String", {
                title: "Thao tác",
                align: "Center",
                width: '120px',
                formatter: function (value, data, index) {
                    var str = "";
                    str += "<button data-code='%s' class='OpenEditItemDetail btn btn-primary btn-in-table' title='Chi tiết'><i class='fa fa-info-circle'></i></button>";
                   
                    str += "<button data-code='%s' class='OpenEditItemTransactionHisory btn btn-primary btn-in-table' title='Lịch sử giao dịch'><i class='fa fa-hourglass-half'></i></button>";
                    str += "<button data-code='%s' class='OpenEditItemHistoryPayment btn btn-primary btn-in-table' title='Lịch sử thanh toán'><i class='fa fa-usd'></i></button>";
                  
                    return str;
                },
                events: {
                    'click .OpenEditItemHistoryPayment': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Customer/ShowModalHistoryPayment";
                            customerCode = row.Code;
                            var model = {
                                 action: "View"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                    'click .OpenEditItemTransactionHisory': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Customer/ShowModalTransactionHisory";
                            customerCode = row.Code;
                            var model = {
                                action: "View"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    },
                   
                    'click .OpenEditItemDetail': function (e, value, row) {
                        Sv.ChecPermission("View", function () {
                            var url = "/Admin/Customer/ShowModal";
                            var model = {
                                customerCode: row.Code, action: "View"
                            };
                            Sv.BindPopup(url, model, function (rs) {
                                base.$boxDetails.html(rs);
                                base.$boxDetails.find("#modalDetails").modal({ backdrop: "static" });
                            });
                        });
                    }
                }
            })];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            url: "/Admin/Customer/GetData",
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
   
    this.GetFormSearchData = function () {
        var obj = {};
        obj.Code = $('#txtCustomerCode').val();
        obj.FullName = $('#txtCustomerName').val();
        obj.SaleMoney = $('#txtSaleMoney').val();
        obj.SumMoney = $('#txtSumMoney').val();
        
        return obj;
    }

}
var customerCode = '';
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
        columns: unit.Columns()
    }));
    unit.LoadTableSearch();
    unit.$btnOpenSearch.click(function () {
        unit.$searchModal.modal({ backdrop: "static" });
    });
    unit.$btnSearchSubmit.click(function () {
        unit.LoadTableSearch();
    });
    $("#txtSaleMoney").number(true, 0);
    $("#txtSumMoney").number(true, 0);
});
