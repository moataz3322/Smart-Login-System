//todo HOMEfs
let userHome = document.getElementById("HomeUserName");
let homePage = document.getElementById("home");
let logOutBtn = document.getElementById("logOut");

//* login Form
let loginForm = document.getElementById("login");
let loginEmail = document.getElementById("loginEmail");
let loginPass = document.getElementById("loginPassword");
let loginBtn = document.getElementById("loginBtn");
let loginCheckMssg = document.getElementById("loginCheck");
let forSignBtn = document.getElementById("forSignUp");

//todo  SignUp form

let signUpForm = document.getElementById("signUp");
let signUpBtn = document.getElementById("signBtn");
let userName = document.getElementById("signUpName");
let userPass = document.getElementById("signUpPassword");
let userEmail = document.getElementById("signUpEmail");
let sucsMssg = document.getElementById("sucMssg");
let upLogin = document.getElementById("upLogin");
let invalidMssg = document.getElementById("invalidMssg");
let passValid = document.getElementById("passValid");
let userList = [];
let emailErr = document.getElementById("emailErr");

//* clear Signupform
forSignBtn.addEventListener("click", function () {
  loginForm.classList.add("d-none");
  signUpForm.classList.remove("d-none");

  clearForm();
});

//todo بس Logout Btn
logOutBtn.addEventListener("click", function () {
  homePage.classList.add("d-none");
  loginForm.classList.remove("d-none");
});

//*LOGIN
loginBtn.addEventListener("click", function () {
  login();
});

function login() {
  let userList = JSON.parse(localStorage.getItem("userInfo")) || [];

  for (let i = 0; i < userList.length; i++) {
    console.log("input email:", loginEmail.value.trim());
    console.log("stored email:", userList[i].email);

    console.log("input pass:", loginPass.value.trim());
    console.log("stored pass:", userList[i].pass);

    if (
      userList[i].email === loginEmail.value.trim() &&
      userList[i].pass === loginPass.value.trim()
    ) {
      homePage.classList.remove("d-none");
      loginCheckMssg.classList.add("d-none");

      loginForm.classList.add("d-none");
      clearForm();
      userHome.innerHTML = `Welcome ${userList[i].name}`;

      return true;
    }
  }

  loginCheckMssg.classList.remove("d-none");

  return false;
}

//* Signup

signUpBtn.addEventListener("click", function () {
  addUser();
});

function addUser() {
  let userList = JSON.parse(localStorage.getItem("userInfo")) || [];

  if (nameRegex() && emailRegex() && passRegex() && !emailExistsCheck()) {
    let user = {
      name: userName.value.trim(),
      email: userEmail.value.trim(),
      pass: userPass.value.trim(),
    };

    userList.push(user);
    localStorage.setItem("userInfo", JSON.stringify(userList));

    console.log(userList);

    sucsMssg.classList.remove("d-none");

    clearForm();
  } else {
    sucsMssg.classList.add("d-none");
  }
}

//*CLEAR INPUTS
function clearForm() {
  userName.value = null;
  userEmail.value = null;
  userPass.value = null;
  loginEmail.value = null;
  loginPass.value = null;
  userName.classList.remove("is-valid");
  userName.classList.remove("is-invalid");
  userPass.classList.remove("is-valid");
  userPass.classList.remove("is-invalid");
  userEmail.classList.remove("is-valid");
  userEmail.classList.remove("is-invalid");
  passValid.classList.add("d-none");
  invalidMssg.classList.add("d-none");
}

upLogin.addEventListener("click", function () {
  loginForm.classList.remove("d-none");
  signUpForm.classList.add("d-none");
});

//* SIGNUP Regex
function nameRegex() {
  let nameRegex = /^[A-Za-z ]{3,}$/;
  let text = userName.value;

  if (nameRegex.test(text)) {
    userName.classList.add("is-valid");
    userName.classList.remove("is-invalid");

    return true;
  } else {
    userName.classList.remove("is-valid");
    userName.classList.add("is-invalid");
    return false;
  }
}

function emailRegex() {
  let emailRegex = /^[\w.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  let email = userEmail.value;

  if (emailRegex.test(email)) {
    userEmail.classList.add("is-valid");
    userEmail.classList.remove("is-invalid");

    return true;
  } else {
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
    return false;
  }
}
function passRegex() {
  let passRegex = /^(?=.*[A-Z])(?=.*\d).{3,}$/;
  let pass = userPass.value;

  if (passRegex.test(pass)) {
    userPass.classList.add("is-valid");
    userPass.classList.remove("is-invalid");
    passValid.classList.add("d-none");

    return true;
  } else {
    passValid.classList.remove("d-none");
    userPass.classList.add("is-invalid");
    userPass.classList.remove("is-valid");
    return false;
  }
}

//* onInput Validation

userName.addEventListener("input", function () {
  nameRegex();
  validateAll();
  checkFormValidityAndResetBtn();
});

userPass.addEventListener("input", function () {
  passRegex();
  validateAll();
  checkFormValidityAndResetBtn();
});

userEmail.addEventListener("input", function () {
  emailRegex();
  emailExistsCheck();
  validateAll();
  checkFormValidityAndResetBtn();
});

//* FOR INVALID MSSG

function validateAll() {
  if (nameRegex() && emailRegex() && passRegex()) {
    invalidMssg.classList.add("d-none");
  } else {
    invalidMssg.classList.remove("d-none");
  }
}

//*FOR emailExistsCheck

function emailCheck(email) {
  var userList = JSON.parse(localStorage.getItem("userInfo")) || [];

  return userList.some(function (user) {
    return user.email === email.trim();
  });
}

function emailExistsCheck() {
  let email = userEmail.value.trim();

  if (emailCheck(email)) {
    emailErr.classList.remove("d-none");
    userEmail.classList.add("is-invalid");

    return true;
  } else {
    emailErr.classList.add("d-none");

    return false;
  }
}

//* FunnyBtn :)

function checkFormValidityAndResetBtn() {
  if (nameRegex() && emailRegex() && passRegex() && !emailExistsCheck()) {
    signUpBtn.style.left = "0px";
  }
}
let movedRight = false;
signUpBtn.addEventListener("mouseenter", function () {
  if (!(nameRegex() && emailRegex() && passRegex() && !emailExistsCheck())) {
    if (!movedRight) {
      this.style.left = "250px";
      movedRight = true;
    } else {
      this.style.left = "-250px";
      movedRight = false;
    }
  } else {
    this.style.left = "0px";
    movedRight = false;
  }
});
