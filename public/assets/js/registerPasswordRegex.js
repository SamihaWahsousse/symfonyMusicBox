// ********** Test strenght Password Registration using REGEX ************//
var registerPasswordField = document.getElementById(
	"register_password"
);

// Call of the password validation function for the user input password
const inputPassword = registerPasswordField.addEventListener(
	"input",
	() => {
		validRegisterPassword(registerPasswordField.value);
	}
);

// Function validation password
const validRegisterPassword = function (inputPassword) {
	console.log(inputPassword);

	// Get html/twig fields - Registration form
	let listeMinimumCharacters = document.querySelector(
		"#minimumCharacters"
	);
	let lowerCaseValid = document.getElementById("lowerCase");
	let upperCaseValid = document.getElementById("upperCase");
	let specialCharacterValid = document.getElementById(
		"specialCharacter"
	);
	let numberValid = document.getElementById("numbers");

	// 8 characters minimum
	if (inputPassword.length > 8) {
		listeMinimumCharacters.style.color = "green";
	} else {
		listeMinimumCharacters.style.color = "red";
	}

	// Uppercase letters
	if (/[A-Z]/.test(inputPassword)) {
		upperCaseValid.style.color = "green";
	} else {
		upperCaseValid.style.color = "red";
	}

	// LowerCase letters
	if (/[a-z]/.test(inputPassword)) {
		lowerCaseValid.style.color = "green";
	} else {
		lowerCaseValid.style.color = "red";
	}

	//Numbers
	if (/[0-9]/.test(inputPassword)) {
		numberValid.style.color = "green";
	} else {
		numberValid.style.color = "red";
	}

	// Special Characters
	if (/[#?!@$%^&*-]/.test(inputPassword)) {
		specialCharacterValid.style.color = "green";
	} else {
		specialCharacterValid.style.color = "red";
	}
};
