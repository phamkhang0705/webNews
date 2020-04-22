$(document).ready(function () {
    'use strict';

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
        FB.init({
            appId: '259898955411570', // App ID
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML
            version: 'v6.0'
        });
        FB.AppEvents.logPageView();
    };

    function Login() {
        FB.login(function (response) {
            console.log(response);
            if (response.authResponse) {
                getFacebookUserInfo();
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'email,user_photos'
        });
    }

    function getFacebookUserInfo() {
        FB.api('/me?fields=id,email,name,picture', function (response) {
            var token = $('input[name="__RequestVerificationToken"]').val();
            $.ajax({
                url: "/Home/Login",
                headers: { "__RequestVerificationToken": token },
                type: "POST",
                data: { 'name': response.name, 'email': response.email, id: response.id, 'picture': response.picture.data.url },
                success: function (data) {
                    if (data.success === "True") {
                        location.reload();
                    }
                },
                error: function (data) {
                    console.log(data);
                }
            });
        });
    }

    function Logout() {
        FB.logout(function () { document.location.reload(); });
    }


    $('.lbtSignInFacebook').click(function () {
        Login();
    });

    $('.lbtLogOutFacebook').click(function () {
        Logout();
        var token = $('input[name="__RequestVerificationToken"]').val();
        $.ajax({
            url: "/Home/LogOut",
            headers: { "__RequestVerificationToken": token },
            type: "POST",
            success: function (data) {
                if (data.success === "True") {
                    location.reload();
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
});