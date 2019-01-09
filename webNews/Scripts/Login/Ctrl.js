
$(document).ready(function () {
    setupValidate();
    ResetCapChar();
    $("#btnLogin").click(function () {

        loginToSystem();
    });
    $("#btnResetCapCha").click(function () {
        ResetCapChar();
    });
    $("form#formLogin input, form#formLogin select").keydown(function (e) {
        var k = e.keyCode;
        if (k == 13)
            loginToSystem();
    });
});
function EncodeHtml(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}


function setupValidate() {
    var $form = $("#formLogin").on();
    $form.validate({
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 30

            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 30
            },
            CaptchaCodeText: {
                required: true,
            },
            CapImageText: {
                required: true
            }
        },
        messages: {
            username: {
                required: language.Login.UserName_required,
                minlength: language.Login.UserName_Length,
                maxlength: language.Login.UserName_Length
            },
            password: {
                required: language.Login.PassWord_required,
                minlength: language.Login.PassWord_Length,
                maxlength: language.Login.PassWord_Length
            },
            CaptchaCodeText: {
                required: 'InValid',
                //le: 'Invalid value'
            },
            CapImageText: {
                required: language.required
            }
        },
        errorElement: 'span',
        errorClass: 'error',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
}

function loginToSystem() {
    if (!$("#formLogin").valid()) return;
    $("#btnLogin").attr("disabled", "disabled");
    showLoadingDlg();
    $.ajax({
        method: "POST",
        url: "/Login/Login",
        data: {
            username: $("#username").val(),
            password: $("#password").val(),
            capchar: $("#capchar").val()
        },
        success: function (data) {
            console.log(data);
            closeLoadingDlg();
            if (data.result.Status == "01") {
                var returnUrl = getParameterByName("ReturnUrl");

                if (!returnUrl)
                    window.location = "/Admin/DashBoard";
                else {
                    if (window.location.hostname != extractDomain(returnUrl)) {
                        window.location = "/Admin/DashBoard";
                    }
                    else {
                        window.location = returnUrl;
                    }
                }

            }
            else {
                ResetCapChar();
                $("#password").val('');
                $("#CaptchaCodeText").val('');
                Dialog.Alert(data.result.Message, Dialog.Error);
            }
        },
        error: function () {
            closeLoadingDlg();
            ResetCapChar();
            Dialog.Alert("Đăng nhập thất bại", Dialog.Error);
            $("#username").val('');
            $("#password").val('');
            $("#CaptchaCodeText").val('');
            $("#btnLogin").removeAttr("disabled");
        }
    });
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

//-------Reset capchar----
function ResetCapChar() {
    $.ajax({
        method: "POST",
        url: "/Login/ResetCapchar",
        data: $("#formLogin").serialize(),
        success: function (rs) {
            $("#hiddenCapchar").val(rs.CapImageText);
            $("#imgCapchar").attr("src", rs.CapImage);
            $("#btnLogin").removeAttr("disabled");
        },
        error: function () {
            alert("Erro Request");
        }
    });
}

//Fogot password
$("#forgotPass").click(function () {
    var $form1 = $("#f_forgetpass").on();
    if (!$form1.valid()) return;
    if ($form1.valid()) {
        var account = $("#fp_account").val();
        var email = $("#fp_email").val();
        var capchar = $("#capchar").val();

        var url = "/Login/ForgotPassword?userName=" + account + "&email=" + email + "&capchar=" + capchar;
        $.ajax({
            method: "POST",
            dataType: 'json',
            url: url,
            success: function (rs) {
                Dialog.Alert(rs.Msg, (rs.Status == "01" ? Dialog.Success : Dialog.Error), (rs.Status == "01" ? Dialog.Success : Dialog.Error), function () {
                    if (rs.Status == "01") {
                        logout();
                        window.location.href = "/Admin/Login";
                    }
                });


            },
            error: function (res) {
                Dialog.Alert("Có lỗi trong quá trình xử lý. Vui lòng thử lại!", Dialog.Error);
            }
        });
    }
});