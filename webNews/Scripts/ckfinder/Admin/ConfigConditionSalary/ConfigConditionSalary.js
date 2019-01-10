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

    this.SubmitServer = function (action, id) {
        var $form = $("#formDetail").on();
        var url = "/ConfigConditionSalary/Update";
        if ($form.valid(true)) {
            Sv.AjaxPost({
                Url: url,
                Data: base.GetFormData()
            },
                function (rs) {
                    if (rs.Status == "01") {
                        Dialog.Alert(rs.Message, Dialog.Success);
                        base.$boxDetails.find("#modalDetails").modal("hide");
                    } else {
                        Dialog.Alert(rs.Message, Dialog.Error);
                    }
                },
                function () {
                    Dialog.Alert(Lang.ServerError_Lang, Dialog.Error);
                });
        }
    }
    base.GetFormData = function () {
        var data = $('#formDetail').serialize();
        return data;
    }
}

var unit = new Unit();
$(document).ready(function () {
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
        integerDigits: 12
    });
    $('.amount-mask2').on().inputmask({
        alias: 'decimal',
        placeholder: '',
        groupSeparator: language.Mask_groupSeparator,
        radixPoint: language.Mask_radixPoint,
        autoGroup: true,
        digits: language.Mask_digits,
        allowPlus: true,
        allowMinus: true,
        autoUnmask: true,
        integerDigits: language.Mask_integerDigits
    });
    $('.discount-mask').inputmask({
        alias: "percentage",
        placeholder: '',
        radixPoint: language.Mask_radixPoint,
        autoUnmask: true,
    });
    $('#btnEdit').on('click', function (e) {
        e.preventDefault();
        unit.SubmitServer("Edit", 0);
    });
});