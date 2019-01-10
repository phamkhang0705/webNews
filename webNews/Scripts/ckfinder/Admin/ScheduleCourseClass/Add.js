var crrId = 0;
var crrCourseClass = {};
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
    this.$btnOpenAdd = $("#btnSave");
    this.$btnSave = $("#btnSave");
    this.$btnBack = $("#btnBack");

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
                title: 'Mã chương trình đào tạo',
                field: 'Code',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Tên chương trình đào tạo',
                field: 'Name',
                align: "center",
                valign: "middle"
            }),
            Sv.BootstrapTableColumn("string", {
                title: 'Thao tác',
                align: "center",
                valign: "middle",
                width: "50px",
                formatter: function (value, item) {
                    var html = "<button data-code='%s' class='delete btn btn-primary btn-in-table' title='Xóa học viên'><i class='fa fa-remove'></i></button>";
                    return html;
                }, events: {
                    'click .delete': function (e, value, row) {
                        for (var i = 0; i < educationSelects.length; i++) {
                            if (educationSelects[i].Code == row.Code) {
                                educationSelects.splice(i, 1);
                            }
                        }
                        base.$table.bootstrapTable('load', educationSelects);
                    }
                }
            })];
        return obj;
    }

    this.LoadTableSearch = function () {
        base.$table.bootstrapTable('load', educationSelects);
    }
    base.GetFormData = function () {
        var data = {};
        data = Sv.getFormData($("#formDetail"));
        data.EducationPrograms = educationSelects;
        data.Id = crrId;

        return data;
    }
    //-- them sua xoa
    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/ScheduleCourseClass/Update";
        Sv.Loading();
        Sv.AjaxPost({
            Url: url,
            Data: base.GetFormData()
        },
            function (rs) {
                Sv.EndLoading();
                if (rs.ResponseCode == "01") {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Success);
                } else {
                    Dialog.Alert(rs.ResponseMessage, Dialog.Error);
                }
            },
            function () {
                Sv.EndLoading();
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }
}


var unit = new Unit();
var educationSelects = [];

$(document).ready(function () {
    unit.$table.bootstrapTable(Sv.BootstrapTableOptionClient({
        queryParams: function (p) {
            return {
                search: unit.GetFormSearchData(),
                pageIndex: p.offset,
                pageSize: p.limit

            };
        },
        columns: unit.Columns(),
        data: educationSelects
    }));

    unit.LoadTableSearch();


    var params = Sv.getAllUrlParams(window.location.href);
    if (params.id != null && params.id != undefined) {
        crrId = params.id;
        Sv.AjaxPost({
            Url: "/ScheduleCourseClass/Get",
            Data: { id: params.id }
            },
            function (data) {
                if (data != null) {
                    crrCourseClass = data;
                    console.log(data);
                    //Set data form
                    $("#courseName").html(data.CourseName);
                    $("#className").html(data.ClassName);
                    $("#teacherName").html(data.TeacherName);

                    $("#lesson").html(data.NumberOfSessions);
                    var fDate = '', tDate = '';
                    if (data.FromDate != null && data.FromDate != undefined) {
                        fDate = moment(new Date(parseInt(data.FromDate.slice(6, -2)))).format('DD/MM/YYYY');
                    }
                    if (data.ToDate != null && data.ToDate != undefined) {
                        tDate = moment(new Date(parseInt(data.ToDate.slice(6, -2)))).format('DD/MM/YYYY');
                    }
                    $("#fromDate").html(fDate);
                    $("#toDate").html(tDate);
                    if (data.Educations != null && data.Educations != undefined){
                        for (var i = 0; i < data.Educations.length; i++) {
                            var pro = {};
                            pro.Code = data.Educations[i].EducationProgramCode;
                            pro.Name = data.Educations[i].EducationProgramName;
                            pro.ClassOfCourseId = crrId;
                            pro.Id = data.Educations[i].Id;

                            educationSelects.push(pro);
                        }
                    }
                    unit.LoadTableSearch();
                }


            },
            function () {
                Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
            });
    }


    //Auto complete input
    $("#txtSearchStudent").autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "/ScheduleCourseClass/GetEducationData",
                    type: "POST",
                    dataType: "json",
                    data: { name: $("#txtSearchStudent").val() },
                    success: function (data) {
                        var returnData = $.map(data,
                            function(item) {
                                return item;
                            });
                        response(returnData.slice(0, 5));

                    }
                });
            },
            response: function (event, ui) {
                // ui.content is the array that's about to be sent to the response callback.
                if (ui.content.length === 0) {
                    $("#empty-message").text("No results found");
                } else {
                    $("#empty-message").empty();
                }
            },
            focus: function (event, ui) {
                $("#txtSearchStudent").val(ui.item.Name);
                return false;
            },
            select: function (event, ui) {
                $("#txtSearchStudent").val("");
                var tmp = JSON.parse(JSON.stringify(ui.item));

                var check = educationSelects.filter(function (p) {
                    return p.Code === tmp.Code;
                });
                if (check != null && check.length == 1) {
                    //Đã tồn tại học viên
                } else {
                    var st = {};
                    st.Code = tmp.Code;
                    st.Name = tmp.Name;
                    st.Id = tmp.Id;

                    educationSelects.push(st);
                }
                unit.LoadTableSearch();
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function (ul, item) {
            var inner_html = '<p>' + item.Code + "-" + item.Name + '</p>';
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append(inner_html)
                .addClass('ui-menu-item')
                .appendTo(ul);
        };

    unit.$btnSave.click(function () {
        unit.SubmitServer("Save", 0);
    });
    unit.$btnBack.click(function () {
        window.location.href = "/Admin/ScheduleCourseClass";
    });
});
