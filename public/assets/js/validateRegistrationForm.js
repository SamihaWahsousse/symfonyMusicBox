// //****** Validation Form *********/
const userName = document.getElementById("register_name");
const userEmail = document.getElementById("register_email");
const userPassword = document.getElementById("register_password");
const formRegister = document.forms["register"];
const submitBtn = document.getElementById("register_submit");
const errorDiv = document.getElementById("error");
const RegexPassword =
	"/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/";
// submitBtn.disabled = true;
// catch errors befor submitting form
formRegister.addEventListener("submit", (e) => {
	let messages = [];
	if (userName.value === " " || userName.value === null) {
		messages.push("UserName is required");
	}

	// if (userPassword.value.length < 8) {
	// 	messages.push("Password must be longer than 8 characters");
	// }
	// if (userPassword.value.length > 50) {
	// 	messages.push("Password must be less than 50 characters");
	// }

	if (!userPassword.value === RegexPassword) {
		messages.push("Password Incorrect");
	}

	if (messages.length > 0) {
		e.preventDefault();
		errorDiv.innerHTML = messages.join(",");
	}
});
