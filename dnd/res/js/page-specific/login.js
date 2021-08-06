"use strict";
$(document).ready(function () {
    $("#login-button").on("click", function () {
        let pass = $("#login-password").val();
        console.log("Unencrypted:");
        console.log("username: " + $("#login-username").val());
        console.log("password: " + pass);
        console.log("Encrypted:");
        console.log("username: " + CryptoJS.AES.encrypt($("#login-username").val(), pass).toString());
        console.log("password: " + CryptoJS.AES.encrypt(pass, pass).toString());
    });
});
//# sourceMappingURL=login.js.map