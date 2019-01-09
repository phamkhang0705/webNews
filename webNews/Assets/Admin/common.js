function LoadCombox(mycb, targetlink, fieldValue, fieldName) {
    $.ajax({
        url: targetlink,
        success: function (data) {
            mycb.empty();
            mycb.append($("<option> </option>").val('').html('--- Select All ---'));
            var obj = jQuery.parseJSON(data);
            $.each(obj, function () {
                mycb.append($("<option> </option>").val(this[fieldValue]).html(this[fieldName]));
            });
        }
    });
}

function LoadComboxbyParent(mycb, targetlink, fieldValue, fieldName, objSearch) {
    $.ajax({
        url: targetlink,
        data: objSearch,
        success: function (data) {
            mycb.empty();
            mycb.append($("<option> </option>").val('').html('--- Select All---'));
            var obj = jQuery.parseJSON(data);
            $.each(obj, function () {
                mycb.append($("<option> </option>").val(this[fieldValue]).html(this[fieldName]));
            });
        }
    });
}

var timeoutMessage;
function alert(message) {
    bootbox.alert(message);
}
function ShowMessage(message) {
   
    bootbox.alert(message);
    
    //var ulMessage = $("#Message");
    //ulMessage.empty();
    //$("#ControlMessage").removeClass("alert-success alert-danger");
    //1 là Error
    //còn lại là success

    //if (message.MessageType == 1) {
    //    $("#ControlMessage").addClass("alert-danger");
    //    for (var i = 0; i < message.Data.length; i++) {
    //        ulMessage.append($("<li></li>").html(message.Data[i]));
    //    }
        
        
    //} else {
    //    $("#ControlMessage").addClass("alert-success");
    //    ulMessage.append($("<li></li>").html(message.Value));
    //}
    //$("#ControlMessage").stop().slideDown(500);
    //if (!timeoutMessage) {
    //    timeoutMessage = setTimeout(function () {
    //        $("#ControlMessage").stop().slideUp();
    //        timeoutMessage = null;
    //    }, 5000);
    //}
    
}

var dlgLoading;
$(document).ready(function () {
    dlgLoading = dlgLoading || (function () {
        var pleaseWaitDiv = $('<div class="modal" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1>Processing...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
        return {
            showPleaseWait: function () {
                pleaseWaitDiv.modal();
            },
            hidePleaseWait: function () {
                pleaseWaitDiv.modal('hide');
            },

        };
    })();
});

function showLoadingDlg(sTitle) {
    if (!sTitle) sTitle = "Loading";
    ajaxindicatorstart(sTitle);
    //dlgLoading.showPleaseWait();
    /*
    if (!document.getElementById("div_loading_web"))
    { 
        $('body').append("<div id='div_loading_web'></div>");
    }
    if (!sTitle) sTitle = "Loading";
    $('#div_loading_web').dialog({ title: sTitle + '...<img src="/images/spinner.gif" />', position: { my: "center", at: "center", of: window }, modal: true, autoOpen: true, width: 600, height: 40, draggable: false, resizable: false });
    */
}
function closeLoadingDlg() {
    ajaxindicatorstop();

    //dlgLoading.hidePleaseWait();
    /*
    $('#div_loading_web').dialog("close");
    $('#div_loading_web').remove();   
    */
}
function ajaxindicatorstart(text) {
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="/Assets/Admin/images/ajax-loader.gif"><div>' + text + '</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width': '100%',
        'height': '100%',
        'position': 'fixed',
        'z-index': '10000000',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background': '#000000',
        'opacity': '0.7',
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px',
        'height': '75px',
        'text-align': 'center',
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'right': '0',
        'bottom': '0',
        'margin': 'auto',
        'font-size': '16px',
        'z-index': '10',
        'color': '#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}
function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}
function logout()
{
    showLoadingDlg("Logout...");
  
    $.ajax({
        method: "POST",
        url: "/Admin/Login/logout",
         success: function (data) {
            closeLoadingDlg();
            if (data.result == 1) {
                window.location.href = "/Admin/Login";
            }
            else alert("Error!");

        },
        error: function () {
            closeLoadingDlg();
            alert("Có lỗi trong quá trình xử lý!");
        }
    });
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};