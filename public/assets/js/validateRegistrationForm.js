// //****** Validation Form Registration*********/
const userName = document.getElementById("register_name");
const userEmail = document.getElementById("register_email");
const userPassword = document.getElementById("register_password");
const formRegister = document.forms["register"];
const submitBtn = document.getElementById("register_submit");
const errorDiv = document.getElementById("error");
const RegexPassword =
	"/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/";

formRegister.addEventListener("submit", (e) => {
	let messages = [];
	if (userName.value === " " || userName.value === null) {
		messages.push("UserName is required");
	}

	if (!userPassword.value === RegexPassword) {
		messages.push("Password Incorrect");
	}

	if (messages.length > 0) {
		e.preventDefault();
		errorDiv.innerHTML = messages.join(",");
	}
});
