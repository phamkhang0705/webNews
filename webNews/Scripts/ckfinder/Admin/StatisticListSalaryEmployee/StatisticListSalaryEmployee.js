var Unit = function () {
    var base = this;
    this.$table = $("#table");
    this.$searchModal = $("#searchModal");
    this.$btnSearch = $("#btnSearch");
    base.$boxDetails = $("#box-detail");

    this.Columns = function () {
        var obj = [[
            Sv.BootstrapTableColumn("string", {
                align: "center",
                width: "50px",
                rowspan: 2,
                title: 'STT',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT(base.$table, index);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Mã',
                field: 'Code',
                rowspan: 2,
                align: "left",
                width: "100px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Họ tên',
                field: 'FullName',
                rowspan: 2,
                align: "left",
                width: "150px",
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Lương',
                colspan: 2,
                align: "center",
                width: "450px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'BHXH',
                colspan: 2,
                align: "center",
                width: "450px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'BHYT',
                colspan: 2,
                align: "center",
                width: "450px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'BHTN',
                colspan: 2,
                align: "center",
                width: "450px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Phí công đoàn',
                colspan: 2,
                align: "center",
                width: "450px"
            }), Sv.BootstrapTableColumn("string", {
                title: 'Phụ cấp',
                colspan: 2,
                align: "center",
                width: "450px",
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương giảng chính',
                field: 'MainTeachingTotalLearningSalary',
                rowspan: 2,
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương trợ giảng',
                field: 'TutorsSalary',
                rowspan: 2,
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
                }
            }), Sv.BootstrapTableColumn("string", {
                title: 'Lương dự giảng',
                field: 'AttendFacultyTeacherSalary',
                rowspan: 2,
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
                }
            })
            , Sv.BootstrapTableColumn("string", {
                title: 'Lương thực nhận',
                field: 'SalaryRealReciept',
                rowspan: 2,
                align: "right",
                width: "150px",
                formatter: function (value, row) {
                    return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
                }
            })
        ], [Sv.BootstrapTableColumn("string", {
            title: 'Lương thực nhận',
            field: 'BasicSalary',
            align: "left",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Lương BHXH',
            field: 'SocialInsuranceSalary',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Cá nhân',
            field: 'SocialInsurance_Personal',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Công ty',
            field: 'SocialInsurance_Company',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Cá nhân',
            field: 'HealthInsurance_Personal',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Công ty',
            field: 'HealthInsurance_Company',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Cá nhân',
            field: 'UnemploymentInsurance_Personal',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Công ty',
            field: 'UnemploymentInsurance_Company',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Cá nhân',
            field: 'CostUnion_Personal',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Công ty',
            field: 'CostUnion_Company',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Cá nhân',
            field: 'Allowance_Car',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        }), Sv.BootstrapTableColumn("string", {
            title: 'Công ty',
            field: 'Allowance_Tel',
            align: "right",
            width: "150px",
            formatter: function (value, row) {
                return (value!=null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0);
            }
        })
        ]];
        return obj;
    }
    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('refreshOptions', {
            url: "/Admin/StatisticListSalaryEmployee/GetData",
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
        obj.FromDate = $('#txtFDate').parent().data("DateTimePicker").date();
        obj.ToDate = $('#txtTDate').parent().data("DateTimePicker").date();
        obj.StaffName = $('#txtStaffName').val();
        obj.StaffCode = $('#txtStaffCode').val();
        return obj;
    }
}
$(document).ready(function () {
    var unit = new Unit();
    $('#divFromDate').data("DateTimePicker").date(Sv.SetMinDateMaxDate().FirstDay);
    $('#divToDate').data("DateTimePicker").date(Sv.SetMinDateMaxDate().LastDay);
    Sv.SetupDateTime($("#sFromDate"), $("#sToDate"));
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

    unit.$btnSearch.click(function () {
        unit.LoadTableSearch();
    });

    $('#btnExportExcel').on('click', function () {
        var dataTable = unit.$table.bootstrapTable('getData');
        if (dataTable.length <= 0) {
            Dialog.Alert('Không có dữ liệu để xuất file!', Dialog.Warning);
            return;
        }
        window.location = '/StatisticListSalaryEmployee/Export?' +
            'FromDate=' + $('#txtFDate').val() +
            '&ToDate=' + $('#txtTDate').val() +
            '&StaffCode=' + $('#txtStaffCode').val() +
            '&StaffName=' + $('#txtStaffName').val() +
            '&dateExport=' + moment(new Date()).format('DD/MM/YYYY HH:mm');
    });
});
