const SIGN_IN_BTN = document.querySelector('#sign_in_btn');
const SIGN_UP_BTN = document.querySelector('#sign_up_btn');
const CONTAINER = document.querySelector('.container');
const FORGOT_INFO_LINK = document.querySelector('.forgot-info-link');
const FORGOT_BACK_BTN = document.querySelector('#forgot_back_btn');
const CHANGE_PASS_CANCEL_BTN = document.querySelector('#change_back_btn');
const EMAIL_EXP = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const PASS_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

//Default Events **********************************************************************

SIGN_UP_BTN.addEventListener('click', () => {
    CONTAINER.classList.add('sign-up-mode');
});

SIGN_IN_BTN.addEventListener('click', () => {
    CONTAINER.classList.remove('sign-up-mode');
});

FORGOT_INFO_LINK.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='none';
    document.getElementById('recover_form').style.display='flex';
});

FORGOT_BACK_BTN.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='flex';
    document.getElementById('recover_form').style.display='none';
});

CHANGE_PASS_CANCEL_BTN.addEventListener('click', () => {
    document.getElementById('sign_in_form').style.display='flex';
    document.getElementById('change_pass_form').style.display='none';
});

//Sign-in Events **********************************************************************
document.getElementById('login_uname').onkeyup = function () {
    setValid(document.getElementById('login_uname'));
}

document.getElementById('login_pass').onkeyup = function () {
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
document.getElementById('reg_fname').onkeyup = function () {
    let RegFnameInput = document.getElementById('reg_fname');
    let RegFnameStr = RegFnameInput.value.toString().trim();
    if(RegFnameStr === ''){
        setValid(RegFnameInput);
    }else{
        setChanged(RegFnameInput, '');
    }
}

document.getElementById('reg_lname').onkeyup = function () {
    let RegLnameInput = document.getElementById('reg_lname');
    let RegLnameStr = RegLnameInput.value.toString().trim();
    if(RegLnameStr === ''){
        setValid(RegLnameInput);
    }else{
        setChanged(RegLnameInput, '');
    }
}

document.getElementById('reg_uname').onkeyup = function () {
    let RegUnameInput = document.getElementById('reg_uname');
    let RegUnameStr = RegUnameInput.value.toString().trim();
    if(RegUnameStr === ''){
        setValid(RegUnameInput);
    }else{
        setChanged(RegUnameInput, '');
    }
}

document.getElementById('reg_email').onkeyup = function () {
    let RegEmailInput = document.getElementById('reg_email');
    let RegEmailStr = RegEmailInput.value.toString().trim();

    if(RegEmailStr === ''){
      setValid(RegEmailInput);
    } else if(!EMAIL_EXP.test(RegEmailStr)){
        setInvalid(RegEmailInput, 'Please type in email correctly (with an address and \'@\' and \'.domain\'');
    }else{
        setChanged(RegEmailInput, '');
    }
}

document.getElementById('reg_pass').onkeyup = function () {
    let RegPassInput = document.getElementById('reg_pass');
    let RegPassStr = RegPassInput.value.toString();

    if(RegPassStr === ''){
        setValid(RegPassInput);
    } else if(!PASS_EXP.test(RegPassStr)) {
        setInvalid(RegPassInput, 'Password is too weak (must be at least 8 characters long with an uppercase,' +
            ' lowercase, special character and number)');
    }else {
        setChanged(RegPassInput, '');
    }

}

document.getElementById('reg_pass_conf').onkeyup = function () {
    let RegPassInput = document.getElementById('reg_pass');
    let RegPassConfInput = document.getElementById('reg_pass_conf');
    let RegPassStr = RegPassInput.value.toString();
    let RegPassConfStr = RegPassConfInput.value.toString();

    if(RegPassConfStr === ''){
        setValid(RegPassConfInput);
    }else if(RegPassConfStr !== RegPassStr){
        setInvalid(RegPassConfInput, 'Confirmation password not matching');
    }else{
        setChanged(RegPassConfInput, '');
    }
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

    if(EMAIL_EXP.test(RegEmailStr) && PASS_EXP.test(RegPassStr) && RegPassStr === RegPassConfStr) {
        sendDataReg(RegFnameStr, RegLnameStr, RegEmailStr, RegUnameStr, RegPassStr);
    }
}
//Recover Info Event **********************************************************************
document.getElementById('recover_email_input').onkeyup = function () {
    let EmailInput = document.getElementById('recover_email_input');
    let EmailStr = EmailInput.value.toString().trim();

    if(EmailStr === ''){
        setValid(EmailInput);
    }else if(!EMAIL_EXP.test(EmailStr)) {
        setInvalid(EmailInput,'Please type in email correctly (with an address and \'@\' and \'.domain\'');
    }else{
        setChanged(EmailInput, '')
    }
}

document.getElementById('recover_form').onsubmit = function (e) {
    e.preventDefault();
    let EmailInput = document.getElementById('recover_email_input');
    let EmailStr = EmailInput.value.toString().trim();

    if(EMAIL_EXP.test(EmailStr)){
        $("body").css("cursor", "progress");
        sendDataRecover(EmailStr);
    }
}

//Change Password Event ***************************************************************************
document.getElementById('change_pass').onkeyup = function () {
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassStr = ChangePassInput.value.toString();

    if(ChangePassStr === ''){
        setValid(ChangePassInput);
    } else if(!PASS_EXP.test(ChangePassStr)) {
        setInvalid(ChangePassInput, 'Password is too weak (must be at least 8 characters long with an uppercase,' +
            ' lowercase, special character and number)');
    }else {
        setChanged(ChangePassInput, '');
    }
}
document.getElementById('change_pass_conf').onkeyup = function () {
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassStr = ChangePassInput.value.toString();
    let ChangePassConfInput = document.getElementById('change_pass_conf');
    let ChangePassConfStr = ChangePassConfInput.value.toString();

    if(ChangePassConfStr === ''){
        setValid(ChangePassConfInput);
    }else if(ChangePassStr !== ChangePassConfStr){
        setInvalid(ChangePassConfInput, 'Confirmation password not matching');
    }else{
        setChanged(ChangePassConfInput,'');
    }
}

document.getElementById('change_pass_form').onsubmit = function (e) {
    e.preventDefault();
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassStr = ChangePassInput.value.toString();
    let ChangePassConfInput = document.getElementById('change_pass_conf');
    let ChangePassConfStr = ChangePassConfInput.value.toString();

    if(PASS_EXP.test(ChangePassStr) && ChangePassStr === ChangePassConfStr){
        let UnameStr = document.getElementById('login_uname').value.toString().trim();
        sendDataChangePass(UnameStr,ChangePassStr);
    }
}

//Get Data from dataHandler **********************************************************************
function getData(TypeStr, OutputStr){
    if (TypeStr === 'Login') {
        let PasswordInput = document.getElementById('login_pass');
        let UsernameInput = document.getElementById('login_uname');

        if (OutputStr.includes('Wrong-Password')) {
            setInvalid(PasswordInput, 'Password is incorrect, Attempts left: ' + (3-parseInt(OutputStr.charAt(OutputStr.length-1))).toString());
        }else if(OutputStr === 'Nonexistent'){
            setInvalid(UsernameInput, 'User not registered');
        }else if(OutputStr === 'Blocked'){
            setInvalid(UsernameInput, 'Password failed more than 3 times, User has been blocked. Please use ' +
                'the "Forgot Password or Username" recovery option');
        }else if(OutputStr === 'Recovery Failed'){
            setInvalid(PasswordInput, 'Incorrect recovery pin, please use the  "Forgot Password or Username" ' +
                'recovery option, or check your Email again');
        }else if(OutputStr === 'Recovered'){
            document.getElementById('sign_in_form').style.display='none';
            document.getElementById('change_pass_form').style.display='flex';
        }else{
            //Login
            localStorage.setItem('login-event', 'login' + Math.random());
            window.location.href='main.php';
        }
    }

    if (TypeStr === 'Register'){
        let RegUnameInput = document.getElementById('reg_uname');
        let RegEmailInput = document.getElementById('reg_email');

        if (OutputStr === 'Username Exists'){
            setInvalid(RegUnameInput, 'Cannot use this Username. Please try another one.');
        }else if(OutputStr === 'Email Exists'){
            setInvalid(RegEmailInput, 'Cannot use this Email. Please try another.');
        }
        else{
            Swal.fire('You\'ve been registered!',
                'Go ahead and log in!',
                'success'
            ).then((result) => {
                location.reload();
            });
        }
    }

    if (TypeStr === 'Recover'){
        let RecEmailInput = document.getElementById('recover_email_input');

        if(OutputStr === 'Does not exist'){
            setInvalid(RecEmailInput, 'Sorry, Email is not registered');
        }else if(OutputStr === 'Failed'){
            setInvalid(RecEmailInput, 'Sorry, failed to send to given Email');
        }else{
            setChanged(RecEmailInput,'');
            $("body").css("cursor", "default");
            Swal.fire({
                icon: 'info',
                title: 'Email Sent',
                text: 'You should receive new login info at '+ RecEmailInput.value.toString()
            }).then((result) => {
                location.reload();
            });
        }
    }

    if(TypeStr === 'ChangePass'){
        if(OutputStr === 'Changed'){
            let ChangePassInput = document.getElementById('change_pass');
            let ChangePassConfInput = document.getElementById('change_pass_conf');
            setChanged(ChangePassInput,'');
            setChanged(ChangePassConfInput,'');
            Swal.fire('Password changed!',
                'You can now log in with your new password',
                'success'
            ).then((result) => {
                location.reload();
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry, something went wrong server side and we could not change your password. Please wait a bit and try again.'
            });
        }
    }
}
//Send Data to dataHandler **********************************************************************
function sendDataChangePass(UnameStr,PassStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            change_uname: UnameStr,
            change_pass: PassStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangePass',output);
        }
    });
}

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
    ElementId.parentElement.style.border = 'solid';
    ElementId.parentElement.style.borderRadius = '50px';
    ElementId.parentElement.style.borderColor = 'red';
    ElementId.setCustomValidity(Error);
    ElementId.reportValidity();
}
function setChanged(ElementId, Msg){
    ElementId.parentElement.style.border = 'solid';
    ElementId.parentElement.style.borderRadius = '50px';
    ElementId.parentElement.style.borderColor = 'Green';
    ElementId.setCustomValidity(Msg);
    ElementId.reportValidity();
}

function setValid(ElementId){
    ElementId.parentElement.style.border = 'none';
    ElementId.setCustomValidity('');
}