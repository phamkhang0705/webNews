
var Table = function () {
    var _this = this;
    this.id = "tabletest";
    this.url = "";
    this.METHOD = "GET";
    this.serverSide = true;
    this.filter = "asc";
    this.pageColection = [10, 20, 50, 100];

    var DATATYPE = {
        NUMBER: "number",
        TEXT: "text",
        SELECT: "select",
        CHECKBOX: "checkbox"
    }

    this.columns = [
        {
            field: 'ID',
            title: 'ID',
            width: '100px',
            align: 'right',
            valign: 'middle',
            type: "text",
            order: true
        },
        {
            field: 'Name',
            title: 'Name',
            width: '200px',
            align: 'center',
            valign: 'middle',
            //Bind data type select
            type: DATATYPE.TEXT,
            datalist: [],
            target: "ID",

            order: true,
            formatter: function (value) {
                return value != null ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
            },
            footerFormatter: function (data) {
                return data != null ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
            }
        }
    ];

    this.initDom = function () {
        var dom = "<table class=\"table t1style table-bordered\" id=\"" + _this.id + "\" style=\"margin: 0; padding: 0;\">";
        dom += "<thead>";
        dom += "<tr style=\"text-align:left;\">";
        _this.columns.forEach(function (item) {
            var style = item.class != undefined ? "class=\"" + item.class + "\"" : "";
            style += item.align != undefined ? " style=\"text-align:" + item.align + ";" : " style=\"";
            style += item.valign != undefined ? " vertical-align: " + item.valign + ";" : "";
            style += item.width != undefined ? " width: " + item.width + ";" : "";
            style += "\"";
            dom += "<th " + style + ">" + item.title + "</th>";
        });
        dom += "</tr>";
        dom += "</thead>";
        dom += "<tbody></tbody>";
        dom += "</table>";

        $("#" + _this.id).replaceWith(dom);
    }

    this.columnsConfig = [];
    this.initColumnConfig = function () {
        _this.columnsConfig = [];
        _this.columns.forEach(function (item) {
            var tmp = {
                "data": item.field,
                "class": item.class != undefined ? item.class : '',
                "orderable": item.order != undefined ? item.order : false,
                render: function (data, type, row) {
                    if (item.type != undefined && item.type === DATATYPE.SELECT) {
                        var ddl = "<select name='" + item.field + "' style='width:100px;border: 1px solid #aaa;border-radius: 4px;box-sizing: border-box;cursor: pointer;display: block;outline: none !important;height: 26px;background-color: #fff' data-id='" + row.target + "'" +
                                    " onchange='savetransactionchange(this,\"" + data + "\")'>";
                        for (var i = 0; i < item.datalist.length; i++) {
                            ddl = ddl + "<option value='" + item.datalist[i].Value + "'>" + item.datalist[i].Text + "</option>";
                        }
                        ddl += "</select>";
                        return ddl;
                    }
                    else if (item.type != undefined && item.type === DATATYPE.NUMBER) {
                        return data != null ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : 0;
                    } else {
                        return data.toString();
                    }
                }
            };
            _this.columnsConfig.push(tmp);
        });
    }
    //Init datatable
    this.init = function () {
        _this.initDom();
        _this.initColumnConfig();
        $("#" + _this.id).dataTable().fnDestroy();
        $("#" + _this.id).dataTable({
            "dom": '<"top"fl<"clear">>rt<"bottomtable"ip<"clear">>',
            "processing": true, // control the processing indicator.
            "serverSide": _this.serverSide, // recommended to use serverSide when data is more than 10000 rows for performance reasons
            "info": true,   // control table information display field
            "stateSave": true,  //restore table state on page reload,
            "lengthMenu": [_this.pageColection, _this.pageColection],    // use the first inner array as the page length values and the second inner array as the displayed options
            "ajax": {
                "url": _this.url,
                "type": "GET"
            },
            "columns": _this.columnsConfig,
            "order": [[0, _this.filter]]
        });
    }
}