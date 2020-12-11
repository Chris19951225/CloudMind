const SIGN_IN_BTN = document.querySelector("#sign_in_btn");
const SIGN_UP_BTN = document.querySelector("#sign_up_btn");
const CONTAINER = document.querySelector(".container");
const FORGOT_INFO_LINK = document.querySelector(".forgot-info-link");
const FORGOT_BACK_BTN = document.querySelector("#forgot_back_btn");
const EMAIL_EXP = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const CONN = new XMLHttpRequest();

//Default Events **********************************************************************
SIGN_UP_BTN.addEventListener('click', () => {
    CONTAINER.classList.add("sign-up-mode");
});

SIGN_IN_BTN.addEventListener('click', () => {
    CONTAINER.classList.remove("sign-up-mode");
});

FORGOT_INFO_LINK.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='none';
    document.getElementById('recover_form').style.display='flex';
});

FORGOT_BACK_BTN.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='flex';
    document.getElementById('recover_form').style.display='none';
});

//Sign-in Events **********************************************************************
document.getElementById('login_uname').onkeydown = function (e) {
    setValid(document.getElementById('login_uname'));
}

document.getElementById('login_pass').onkeydown = function (e) {
    setValid(document.getElementById('login_pass'));
}

document.getElementById('sign_in_form').onsubmit = function (e) {
    e.preventDefault();
    let UsernameInput = document.getElementById('login_uname');
    let PasswordInput = document.getElementById('login_pass');

    let UsernameStr = UsernameInput.value.toString().trim();
    let PasswordStr = PasswordInput.value.toString();

    sendDataLogin(UsernameStr,PasswordStr);
}

//Sign-up Event **********************************************************************
document.getElementById('reg_uname').onkeydown = function (e) {
    setValid(document.getElementById('reg_uname'));
}

document.getElementById('reg_email').onkeydown = function (e) {
    setValid(document.getElementById('reg_email'));
}

document.getElementById('reg_pass').onkeydown = function (e) {
    setValid(document.getElementById('reg_pass'));
}

document.getElementById('reg_pass_conf').onkeydown = function (e) {
    setValid(document.getElementById('reg_pass_conf'));
}

document.getElementById('sign_up_form').onsubmit = function (e) {
    e.preventDefault();

    let RegFnameInput = document.getElementById('reg_fname');
    let RegLnameInput = document.getElementById('reg_lname');
    let RegUnameInput = document.getElementById('reg_uname');
    let RegEmailInput = document.getElementById('reg_email');
    let RegPassInput = document.getElementById('reg_pass');
    let RegPassConfInput = document.getElementById('reg_pass_conf');

    let RegFnameStr = RegFnameInput.value.toString().trim();
    let RegLnameStr = RegLnameInput.value.toString().trim();
    let RegUnameStr = RegUnameInput.value.toString().trim();
    let RegEmailStr = RegEmailInput.value.toString().trim();
    let RegPassStr = RegPassInput.value.toString();
    let RegPassConfStr = RegPassConfInput.value.toString();

    if(!EMAIL_EXP.test(RegEmailStr)){
        setInvalid(RegEmailInput,"Please type in email correctly");
    }else if(RegPassStr !== RegPassConfStr){
        setInvalid(RegPassInput,'Password does not match');
    }
    else{
        sendDataReg(RegFnameStr, RegLnameStr, RegEmailStr, RegUnameStr, RegPassStr);
    }
}
//Recover Info Event **********************************************************************
document.getElementById('recover_email_input').onkeydown = function (e) {
    setValid(document.getElementById('recover_email_input'));
}

document.getElementById('recover_form').onsubmit = function (e) {
    e.preventDefault();
    let EmailInput = document.getElementById('recover_email_input');
    let EmailStr = EmailInput.value.toString();

    if(EMAIL_EXP.test(EmailStr)){
        sendDataRecover(EmailStr);
    }else{
        setInvalid(EmailInput,"Please type in email correctly");
    }
}
//Get Data from dataHandler
function getData(TypeStr, OutputStr){

    if (TypeStr === 'Login') {
        let PasswordInput = document.getElementById('login_pass');
        let UsernameInput = document.getElementById('login_uname');

        if (OutputStr === 'Wrong-Password') {
            setInvalid(PasswordInput, 'Password is incorrect');
        }else if(OutputStr === 'Nonexistent'){
            setInvalid(UsernameInput, 'User does not exist');
        }else{
            //Login
            window.location.href='main.php';
        }
    }

    if (TypeStr === 'Register'){
        let RegUnameInput = document.getElementById('reg_uname');
        let RegEmailInput = document.getElementById('reg_email');

        if (OutputStr === 'Username Exists'){
            setInvalid(RegUnameInput, 'Username already exists');
        }else if(OutputStr === 'Email Exists'){
            setInvalid(RegEmailInput, 'Email already exists');
        }
        else{
            alert('User Registered');
            location.reload();
        }
    }

    if (TypeStr === 'Recover'){
        //Do email stuff;
    }
}

//Send Data to dataHandler
function sendDataRecover(emailStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            rec_email:emailStr
        },
        type: 'POST',
        success: function (output) {
            getData('Recover',output);
        }
    });
}

function sendDataLogin(UsernameStr,PasswordStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            login_username:UsernameStr,login_password:PasswordStr
        },
        type: 'POST',
        success: function(output){
            getData('Login',output);
        }
    });
}

function sendDataReg(FnameStr, LnameStr, EmailStr, UnameStr, PasswordStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            reg_fname:FnameStr,reg_lname:LnameStr,
            reg_email:EmailStr, reg_uname:UnameStr,
            reg_pass:PasswordStr
        },
        type: 'POST',
        success: function(output){
            getData('Register',output);
        }
    });
}

//Validity Change **********************************************************************
function setInvalid(ElementId, Error){
    ElementId.style.border = 'solid';
    ElementId.style.borderRadius = '50px';
    ElementId.style.borderColor = 'red';
    ElementId.setCustomValidity(Error);
    ElementId.reportValidity();
}
function setValid(ElementId){
    ElementId.style.border = 'none';
    ElementId.setCustomValidity("");
}