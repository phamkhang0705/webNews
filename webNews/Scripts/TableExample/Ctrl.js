var $table = new Table();

$table.columns = [
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
$table.id = "tabletest";
$table.url = "/TableExample/GetData";
$table.init();