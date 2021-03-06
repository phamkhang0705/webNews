﻿var offset = 0;
var limit = 0;

var $table = $('#table');
var $boxDetails = $('#box-detail');

$(document).ready(function () {
    $('#btnSearch').on('click', function () {
        if (!$('#frmAction').valid()) return;
        $table.bootstrapTable("refresh");
    });
    initTable();
});

var initTable = function () {
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
        url: '/StudentToBranch/GetListStudentToBranch',
        queryParams: function (p) {
            return {
                offset: p.offset,
                limit: p.limit,
                search: {
                    Code: $('#txtCode').val().trim(),
                    FullName: $('#txtFullName').val().trim(),
                    BranchCode: $('#txtBranchCode').val()
                }
            };
        },
        responseHandler: function (res) {
            return {
                total: res.total,
                rows: res.data
            };
        },
        columns: [[
            {
                title: 'STT',
                align: 'center',
                width: '50px',
                valign: 'middle',
                formatter: function (value, row, index) {
                    return Sv.BootstrapTableSTT($table, index);
                }
            }, {
                field: 'Code',
                title: 'Mã',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'FullName',
                title: 'Tên',
                valign: 'middle',
                align: 'center',
                width: '120px'
            }, {
                field: 'BirthDay',
                title: 'Ngày sinh',
                align: 'right',
                valign: 'middle',
                width: '150px',
                formatter: function (value) {
                    return value != null ? moment(new Date(parseInt(value.slice(6, -2)))).format('DD/MM/YYYY') : "";
                }
            }, {
                field: 'Sex',
                title: 'Giới tính',
                valign: 'middle',
                align: 'right',
                width: '120px',
                formatter: function (value) {
                    return value ? "Nam" : "Nữ";
                }
            }, {
                field: 'Address',
                title: 'Địa chỉ',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'Tel',
                title: 'Số điện thoại',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }, {
                field: 'Email',
                title: 'Email',
                valign: 'middle',
                align: 'right',
                width: '120px'
            }
        ]]
    });
}