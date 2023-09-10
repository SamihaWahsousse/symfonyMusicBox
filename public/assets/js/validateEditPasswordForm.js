// // //****** Validation Form Registration*********/
// alert("bon");
const newPassword = document.getElementById(
	"reset_password_plainPassword_first"
);
const repeatedNewPassword = document.getElementById(
	"reset_password_plainPassword_second"
);
const formEditPassword = document.forms["reset_password"];
// const formEditPassword = document.getElementsByName("reset-password");
// console.log(formEditPassword);
const submitButton = document.getElementById("reset_password_Save");
const errorValidationField = document.getElementById("error");
const RegexPasswordValidation =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

formEditPassword.addEventListener("submit", (e) => {
	let messages = [];
	console.log(newPassword.value);
	if (
		newPassword.value === null ||
		repeatedNewPassword.value === null
	) {
		messages.push("- Password is required");
	}

	if (newPassword.value !== repeatedNewPassword.value) {
		messages.push("- Les deux mot de passe ne sont pas identiques");
	}
	if (!RegexPasswordValidation.test(newPassword.value)) {
		messages.push("- Password ne respecte pas la régles du password");
	}
	if (messages.length > 0) {
		e.preventDefault();
		errorValidationField.innerHTML = messages.join("<br>");
	}
});
