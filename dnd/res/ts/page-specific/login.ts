$(document).ready(function ()
{
	$("#login-button").on("click", function ()
	{
		let pass = $("#login-password").val() as string;
		console.log("Unencrypted:")
		console.log("username: " + $("#login-username").val());
		console.log("password: " + pass);

		console.log("Encrypted:")
		console.log("username: " + CryptoJS.AES.encrypt($("#login-username").val() as string, pass).toString());
		console.log("password: " + CryptoJS.AES.encrypt(pass, pass).toString());
	});
});