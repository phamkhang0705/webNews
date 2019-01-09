$(document).ready(function () {

    $.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
    $('[data-toggle="tooltip"]').tooltip();

    //if (jQuery().multiSelect) {

    //    $('.multi-select').multiSelect({
    //        keepOrder: true,
    //        selectableHeader: "<div class='multiselect_head'>Available</div>",
    //        selectionHeader: "<div class='multiselect_head'>Selected</div>"
    //    });
    //}
    $('.multi-select').select2({
        placeholder: "",
        allowClear: true
    });
    
    // Custom select box elements
    $('select').not('.multi-select').select2();

    $('td>tr>select').not('.multi-select').select2();

    // Custom checkbox elements
    $('.toggle-checkbox').bootstrapSwitch({
        size: "small"
    });
    $("#searchModal").removeAttr('tabindex');
});
