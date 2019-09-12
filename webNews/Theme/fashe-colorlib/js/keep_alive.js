var i = 0;
function keepsession() {
    setInterval(function () {
        $.get("/Home/KeepResult", function (data) {
            i++;
            console.log("KeepAlive_" + i);
        });
    }, 1000 * 60 * 5); // 30s gửi request một lần
}

$(document).ready(function () {
    keepsession();
});