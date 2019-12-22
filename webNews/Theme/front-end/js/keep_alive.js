var i = 0;
function keepsession() {
    setInterval(function () {
        $.get("/Home/KeepResult", function (data) {
            i++;
            //            console.log("KeepAlive_" + i);
        });
    }, 3000); // 30s gửi request một lần
}

$(document).ready(function () {
    keepsession();
});