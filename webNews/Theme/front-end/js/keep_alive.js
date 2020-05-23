var i = 0;
function keepSession() {
    setInterval(function () {
        $.get("/Home/KeepResult", function (data) {
            i++;
        });
    }, 10000); // 30s gửi request một lần
}

$(document).ready(function () {
    keepSession();
});