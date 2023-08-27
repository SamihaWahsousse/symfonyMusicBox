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

	// 8 characters
	if (inputPassword.length > 8) {
		listeMinimumCharacters.style.color = "green";
	} else {
		listeMinimumCharacters.style.color = "red";
	}

	if (/[A-Z]/.test(inputPassword)) {
		// msg = "le password contient une maj";
		// console.log(msg);
		upperCaseValid.style.color = "green";
	} else {
		upperCaseValid.style.color = "red";
	}

	if (/[a-z]/.test(inputPassword)) {
		// msg = "le password contient une min";
		// console.log(msg);
		lowerCaseValid.style.color = "green";
	} else {
		lowerCaseValid.style.color = "red";
	}

	if (/[0-9]/.test(inputPassword)) {
		msg = "le password contient un chiffre";
		numberValid.style.color = "green";
	} else {
		numberValid.style.color = "red";
	}

	if (/[#?!@$%^&*-]/.test(inputPassword)) {
		// msg = "le password contient un caractère special";
		specialCharacterValid.style.color = "green";
	} else {
		specialCharacterValid.style.color = "red";
	}
};
// 	// 	des chiffres et des lettres,
// 	// des signes de ponctuation,
// 	// des majuscules et des minuscules.
// };
