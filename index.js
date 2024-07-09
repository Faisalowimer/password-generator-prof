const characters = {
    symbols: "~`!@#$%^&*()_-+={[}]|:;<>.?/",
    numbers: "0123456789",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz"
};

let passOne = document.getElementById("gen-el1");
let passTwo = document.getElementById("gen-el2");
let passwordLength = 15; // less than 16 characters

function getRandomCharacter(charSet) {
    let randomChar = Math.floor(Math.random() * charSet.length);
    return charSet[randomChar];
}

function generateRandomPass() {
    let charSet = "";
    if (document.getElementById("include-symbols").checked) charSet += characters.symbols;
    if (document.getElementById("include-numbers").checked) charSet += characters.numbers;
    if (document.getElementById("include-uppercase").checked) charSet += characters.uppercase;
    if (document.getElementById("include-lowercase").checked) charSet += characters.lowercase;

    let randomPassword = "";
    for (let i = 0; i < passwordLength; i++) {
        randomPassword += getRandomCharacter(charSet);
    }
    return randomPassword;
}

function evaluatePasswordStrength(password) {
    let strength = "Weak";
    let regex = {
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{12,})/,
        medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    };
    if (regex.strong.test(password)) {
        strength = "Strong";
    } else if (regex.medium.test(password)) {
        strength = "Medium";
    }
    return strength;
}

function displayPasswordStrength(password) {
    let strengthEl = document.getElementById("strength-el");
    let strength = evaluatePasswordStrength(password);
    strengthEl.textContent = "Password Strength: " + strength;
    if (strength === "Strong") {
        strengthEl.style.color = "#10B981";
    } else if (strength === "Medium") {
        strengthEl.style.color = "#FBBF24";
    } else {
        strengthEl.style.color = "#EF4444";
    }
}

function generatePass() {
    let pass1 = generateRandomPass();
    let pass2 = generateRandomPass();
    passOne.textContent = pass1;
    passTwo.textContent = pass2;
    displayPasswordStrength(pass1); // Evaluate and display the strength of the first password
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        button.textContent = "Copied!";
        setTimeout(() => button.textContent = text, 1000);
    }, function(err) {
        console.error("Could not copy text: ", err);
    });
}

passOne.addEventListener("click", function() {
    copyToClipboard(passOne.textContent, passOne);
});

passTwo.addEventListener("click", function() {
    copyToClipboard(passTwo.textContent, passTwo);
});

function resetPasswords() {
    passOne.textContent = "";
    passTwo.textContent = "";
    let strengthEl = document.getElementById("strength-el");
    strengthEl.textContent = "";
}
