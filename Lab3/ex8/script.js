showPasword = (id) => {
  var x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

checkingPassword = () => {
  checkLength();
  checkSpecialCharacter();
  checkCapitalLetter();
  checkDigit();
}

var newPassword = document.getElementById("new");
var repeatPassword = document.getElementById("password");
var info = document.getElementById("info");
var len = document.getElementById("length");
var specialCharacter = document.getElementById("specialCharacter");
var capitalLetter = document.getElementById("capitalLetter");
var digit = document.getElementById("digit");

checkLength = () => {
  if (newPassword.value.length < 8) {
    len.className = "invalid";
  } else {
    len.className = "valid";
  }
}

checkSpecialCharacter = () => {
  if (newPassword.value.match(/[.,!@#$%^&*]/g)) {
    specialCharacter.className = "valid";
  } else {
    specialCharacter.className = "invalid";
  }
}

checkCapitalLetter = () => {
  if (newPassword.value.match(/[A-Z]/g)) {
    capitalLetter.className = "valid";
  } else {
    capitalLetter.className = "invalid";
  }
}

checkDigit = () => {
  if (newPassword.value.match(/[0-9]/g)) {
    digit.className = "valid";
  } else {
    digit.className = "invalid";
  }
}

document.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    checkEqPassword()
  }
})

repeatPassword.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    checkEqPassword()
  }
})

checkEqPassword = () => {
  if (newPassword.value != repeatPassword.value) {
    repeatPassword.setCustomValidity("Passwords don't match!")
    repeatPassword.reportValidity();
  }
}
