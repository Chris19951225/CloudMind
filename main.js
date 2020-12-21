const POST_BTN = document.querySelector('#post_btn');
const INFO_EDIT_BTN = document.querySelector('#info_edit_btn');
const INFO_BACK_BTN = document.querySelector('#info_back_btn');
const LOGOUT_BTN = document.querySelector('#logout_btn');
const EDIT_INFO_FORM = document.querySelector('#edit_info_form');
const USER_INFO_MODAL = document.querySelector('#user_info_modal');
const SAVE_INFO_BTN = document.querySelector('#save_info_btn');
const PRE_USER_DELETE_BTN = document.querySelector('#pre_user_delete_btn');
const DELETE_USER_BTN = document.querySelector('#delete_user_btn');
const EMAIL_EXP = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const PASS_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


window.onload = (ev => {
   sendLoadPosts();
   setTimeout(function(){
       $("#posts_container").animate({
           scrollTop: $(
               '#posts_container').get(0).scrollHeight
       }, 500);
   },500);
   ResumeTimerBool = true;
});

let ResumeTimerBool = false;
let PostUpdateTimer = window.setInterval(function(){
    if(ResumeTimerBool){
        sendLoadPosts();
    }
}, 2000);

$(document).on('click','.delete-post', function(){
    let DeletePostBtn = $(this);
    DeletePostBtn.parent().append('<button class="btn solid cancel-post-delete" style="margin-left:10px">No</button>');
    DeletePostBtn.parent().append('<p class="sure" style="margin:0"><strong>You sure?</strong></p>');
    DeletePostBtn.css('width','150px');
    DeletePostBtn.append(' Yes');
    DeletePostBtn.removeClass('delete-post');
    DeletePostBtn.addClass('yes-delete-post');
    ResumeTimerBool = false;
});

$(document).on('click','.yes-delete-post', function() {
    let DeletePostBtn = $(this);
    let PostIdStr = DeletePostBtn.parent().parent().attr('id');
    let PostIdInt = parseInt(PostIdStr.substring(4));
    sendDataDeletePost(PostIdInt);
    DeletePostBtn.parent().parent().addClass('removed-item');
    $(document).on('transitionend', '.removed-item', function () {
        $('li').remove('.removed-item');
    });
    ResumeTimerBool = true;
});
$(document).on('click','.cancel-post-delete', function() {
    let DeletePostBtn = $(this).parent().find('.yes-delete-post');
    let SureMessage = $(this).parent().find('.sure');
    DeletePostBtn.empty();
    DeletePostBtn.css('width','50px');
    DeletePostBtn.append('<i class="fas fa-trash"></i>');
    DeletePostBtn.removeClass('yes-delete-post');
    DeletePostBtn.addClass('delete-post');
    SureMessage.remove();
    $(this).remove();
    ResumeTimerBool = true;
});

PRE_USER_DELETE_BTN.addEventListener('click', function(){
    let CurrPassInput = document.getElementById('conf_current_pass');
    let CurrPassInputStr = CurrPassInput.value;

    if(CurrPassInputStr === '') {
        setInvalid(CurrPassInput, 'Please fill in your password first');
    }else{
        checkDeleteUserPass(CurrPassInputStr);
    }

});

DELETE_USER_BTN.addEventListener('click', function(){
    sendDataDeleteUser();
});

POST_BTN.addEventListener('click', function(){
    let PostInput = document.getElementById('post_text');
    let PostStr = PostInput.value;

    if(PostStr === ''){
        PostInput.placeholder = 'You gotta type something in first!';
        PostInput.style.border = 'solid red';
    }else {
        ResumeTimerBool = false;
        sendDataPost(PostStr);
    }
});

document.getElementById('post_text').onkeydown = function () {
    document.getElementById('post_text').placeholder= 'What\'s on your mind? Add a drop to the cloud.';
    document.getElementById('post_text').style.border = 'none';
}

LOGOUT_BTN.addEventListener('click', function(e){
    e.preventDefault();
    logout();
    localStorage.setItem('logout-event', 'logout' + Math.random());
    window.location.href='index.php';
});

INFO_EDIT_BTN.addEventListener('click',function(){
    $('#main_div').addClass('page-mask');
   INFO_EDIT_BTN.style.display='none';
   LOGOUT_BTN.style.display='none';
   USER_INFO_MODAL.style.display = 'none';
   INFO_BACK_BTN.style.display='inline-block';
   EDIT_INFO_FORM.style.display = 'flex';
});


INFO_BACK_BTN.addEventListener('click', function(){
    INFO_EDIT_BTN.style.display='block';
    LOGOUT_BTN.style.display='block';
    EDIT_INFO_FORM.style.display = 'none'
    INFO_BACK_BTN.style.display='none';
    USER_INFO_MODAL.style.display='block';

    let ChangeFnameInput = document.getElementById('change_fname');
    let ChangeLnameInput = document.getElementById('change_lname');
    let ChangeUnameInput = document.getElementById('change_uname');
    let ChangeEmailInput = document.getElementById('change_email');
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassConfInput = document.getElementById('change_pass_conf');
    let CurrPassInput = document.getElementById('conf_current_pass');

    ChangeFnameInput.value = '';
    ChangeLnameInput.value = '';
    ChangeUnameInput.value = '';
    ChangeEmailInput.value = '';
    ChangePassInput.value = '';
    ChangePassConfInput.value = '';
    CurrPassInput.value = '';

    setValid(ChangeFnameInput);
    setValid(ChangeLnameInput);
    setValid(ChangeUnameInput);
    setValid(ChangeEmailInput);
    setValid(ChangePassInput);
    setValid(ChangePassConfInput);
    setValid(CurrPassInput);
});

//Make valid again Events***********************************************************************************
document.getElementById('change_fname').onkeydown = function () {
    setValid(document.getElementById('change_fname'));
}
document.getElementById('change_lname').onkeydown = function () {
    setValid(document.getElementById('change_lname'));
}
document.getElementById('change_uname').onkeydown = function () {
    setValid(document.getElementById('change_uname'));
}

document.getElementById('change_email').onkeydown = function () {
    setValid(document.getElementById('change_email'));
}

document.getElementById('change_pass').onkeydown = function () {
    setValid(document.getElementById('change_pass'));
}

document.getElementById('change_pass_conf').onkeydown = function () {
    setValid(document.getElementById('change_pass_conf'));
}
document.getElementById('conf_current_pass').onkeydown = function () {
    setValid(document.getElementById('conf_current_pass'));
}

//Update Info Event*****************************************************************************************
SAVE_INFO_BTN.addEventListener('click', function(){
    let ConfPassInput = document.getElementById('conf_current_pass');
    let ConfPassInputStr = ConfPassInput.value.toString();
    sendDataCheckCurrentPass(ConfPassInputStr);
});

function updateData(){
    let ChangeFnameInput = document.getElementById('change_fname');
    let ChangeLnameInput = document.getElementById('change_lname');
    let ChangeUnameInput = document.getElementById('change_uname');
    let ChangeEmailInput = document.getElementById('change_email');
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassConfInput = document.getElementById('change_pass_conf');

    let ChangeFnameStr = ChangeFnameInput.value.toString().trim();
    let ChangeLnameStr = ChangeLnameInput.value.toString().trim();
    let ChangeUnameStr = ChangeUnameInput.value.toString().trim();
    let ChangeEmailStr = ChangeEmailInput.value.toString().trim();
    let ChangePassStr = ChangePassInput.value.toString();
    let ChangePassConfStr = ChangePassConfInput.value.toString();

    let somethingFilledBool = false;

    if(ChangeFnameStr.length !== 0){
        sendDataChangeFname(ChangeFnameStr);
        somethingFilledBool = true;
    }

    if(ChangeLnameStr.length !== 0){
        sendDataChangeLname(ChangeLnameStr);
        somethingFilledBool = true;
    }

    if(ChangeUnameStr.length !== 0){
        sendDataChangeUname(ChangeUnameStr);
        somethingFilledBool = true;
    }

    if(ChangeEmailStr.length !== 0){
        if(!EMAIL_EXP.test(ChangeEmailStr)) {
            setInvalid(ChangeEmailInput, 'Please type in email correctly, needs address,@,.domain');
        }else {
            sendDataChangeEmail(ChangeEmailStr);
            somethingFilledBool = true;
        }
    }

    if(ChangePassStr.length !== 0){
        if(!PASS_EXP.test(ChangePassStr)){
            setInvalid(ChangePassInput, 'Password is too weak (must be at least 8 characters long with an ' +
                'uppercase, lowercase, special character and number)')
        }
        if(ChangePassStr !== ChangePassConfStr){
            setInvalid(ChangePassInput, 'Passwords do not match');
        }else {
            sendDataChangePass(ChangePassStr);
            somethingFilledBool = true;
        }
    }

    if(!somethingFilledBool){
        alert('Have to fill in info if you want to change it');
    }
}
//Post Functions*********************************************************************************************
function postReturn(PostIdStr){
    if (PostIdStr === 'Failed'){
        alert('Sorry, something went wrong with your post');
    }else{
        let PostInput = document.getElementById('post_text');
        let PostTextStr = PostInput.value;

        let PostsList = document.getElementById('posts_list');
        let CurrDateTime = new Date();
        let UsernameStr = document.getElementById('change_uname').placeholder;
        let newLi = document.createElement('li');
        newLi.className = 'post-cont new-item';
        newLi.id = 'post'+PostIdStr;
        newLi.innerHTML = '<i class="fa fa-tint fa-2x mb-1"></i>'+
            '<h2>'+UsernameStr+'</h2>'+
            '<p class="post-text">"'+PostTextStr+'"</p>'+
            '<p style="color:white">'+CurrDateTime.toISOString().split('T')[0]+' '
            +CurrDateTime.toISOString().split('T')[1].slice(0,-5)+'</p>'+
            '</div><span title="Delete Post?"><button class="btn solid delete-post">' +
            '<i class="fas fa-trash"></i></span></button>';
        PostsList.append(newLi);
        $("#posts_container").animate({
            scrollTop: $(
                '#posts_container').get(0).scrollHeight
        }, 500);
        PostInput.value = '';
        ResumeTimerBool = true;
    }
}
function loadAllPosts(PostJson){
    let PostArray = JSON.parse(PostJson.toString());
    let PostsList = document.getElementById('posts_list');
    PostsList.innerHTML = '';
    for(let i in PostArray){
        if(PostArray[i]['Belongs'] === 'Yes'){
            PostsList.innerHTML += '<li class="post-cont" id="post'+PostArray[i]['PostId']+'"><div class="post">' +
                '<i class="fa fa-tint fa-2x mb-1"></i>'+
                '<h2>'+PostArray[i]['Username']+'</h2>'+
                '<p class="post-text">'+'"'+PostArray[i]['PostText']+'"'+'</p>'+
                '<p style="color:white">'+PostArray[i]['PostTimeStamp']+'</p>'+
                '</div><span title="Delete Post?"><button class="btn solid delete-post">' +
                '<i class="fas fa-trash"></i></button></span></li>';
        }else{
            PostsList.innerHTML += '<li class="post-cont" id="post'+PostArray[i]['PostId']+'"><div class="post">' +
                '<i class="fa fa-tint fa-2x mb-1"></i>'+
                '<h2>'+PostArray[i]['Username']+'</h2>'+
                '<p class="post-text">'+'"'+PostArray[i]['PostText']+'"'+'</p>'+
                '<p style="color:white">'+PostArray[i]['PostTimeStamp']+'</p>'+
                '</div>';
        }

    }
}

//Get Data from dataHandler**********************************************************************************
function getData(TypeStr, OutputStr){
    let ChangeFnameInput = document.getElementById('change_fname');
    let ChangeLnameInput = document.getElementById('change_lname');
    let ChangeUnameInput = document.getElementById('change_uname');
    let ChangeEmailInput = document.getElementById('change_email');
    let ChangePassInput = document.getElementById('change_pass');
    let ChangePassConfInput = document.getElementById('change_pass_conf');
    let CurrPassInput = document.getElementById('conf_current_pass');

    let ChangeFnameStr = ChangeFnameInput.value.toString().trim();
    let ChangeLnameStr = ChangeLnameInput.value.toString().trim();
    let ChangeUnameStr = ChangeUnameInput.value.toString().trim();
    let ChangeEmailStr = ChangeEmailInput.value.toString().trim();

    if(TypeStr === 'DeletePost'){
        if(OutputStr !== 'Deleted'){
            alert('Sorry, something went wrong deleting your post. It\'s gonna have to stay in the cloud a bit longer');
        }
    }

    if(TypeStr === 'CheckDeleteUserPass'){
        if (OutputStr.includes('No')) {
            setInvalid(CurrPassInput, 'Password is incorrect, Attempts left: ' + (3-parseInt(OutputStr.charAt(OutputStr.length-1))).toString());
        } else if (OutputStr === 'Blocked'){
            setInvalid(CurrPassInput, 'Password Blocked');
            alert('User has been blocked due to too many failed password attempts. Returning to Login page.')
            window.location.href='index.php';
        }else{
            $('#delete_modal').modal();
        }
    }

    if(TypeStr === 'DeleteUser'){
        if(OutputStr === 'Deleted'){
            alert('Your user has been deleted, you will now be redirected to the login page');
            window.location.href='index.php';

        }else{
            alert('Sorry, something went wrong deleting your user. You\'re gonna have to stay a bit longer');
        }
    }

    if (TypeStr === 'CheckPass') {
        if (OutputStr.includes('No')) {
            setInvalid(CurrPassInput, 'Password is incorrect, Attempts left: ' + (3-parseInt(OutputStr.charAt(OutputStr.length-1))).toString());
        } else if (OutputStr === 'Blocked'){
            setInvalid(CurrPassInput, 'Password Blocked');
            alert('User has been blocked due to too many failed password attempts. Returning to Login page.')
            window.location.href='index.php';
        }else{
            updateData();
        }
    }

    if (TypeStr === 'ChangeFname'){
        if(OutputStr === 'Changed'){
            setChanged(ChangeFnameInput,'First name has been changed');
            ChangeFnameInput.placeholder = ChangeFnameStr;
            ChangeFnameInput.value = '';
            CurrPassInput.value = '';
            document.getElementById('modal_fname').innerHTML = ChangeFnameStr;
        }else if (OutputStr === 'Same'){
            setInvalid(ChangeFnameInput, 'Firstname is the same');
        }else{
            setInvalid(ChangeFnameInput, 'Could not change Firstname, something went wrong');
        }
    }

    if (TypeStr === 'ChangeLname'){
        if (OutputStr === 'Changed'){
            setChanged(ChangeLnameInput, 'Lastname has been changed');
            ChangeLnameInput.placeholder = ChangeLnameStr;
            ChangeLnameInput.value = '';
            CurrPassInput.value = '';
            document.getElementById('modal_lname').innerHTML = ChangeLnameStr;
        }else if (OutputStr === 'Same'){
            setInvalid(ChangeLnameInput, 'Lastname is the same');
        }else{
            setInvalid(ChangeLnameInput, 'Could not change Lastname, something went wrong');
        }
    }

    if (TypeStr === 'ChangeUname'){
        if (OutputStr === 'Changed'){
            setChanged(ChangeUnameInput, 'Username has been changed');
            ChangeUnameInput.placeholder = ChangeUnameStr;
            ChangeUnameInput.value = '';
            CurrPassInput.value = '';
            document.getElementById('modal_uname').innerHTML = ChangeUnameStr;
            document.getElementById('main_logged_in_uname').innerHTML = 'Signed in: '+ChangeUnameStr;
        }else if (OutputStr === 'Same'){
            setInvalid(ChangeUnameInput, 'Username is the same');
        }else if (OutputStr === 'Exists'){
            setInvalid(ChangeUnameInput, 'Username already exists');
        }else{
            setInvalid(ChangeUnameInput, 'Could not change Username, something went wrong');
        }
    }

    if (TypeStr === 'ChangeEmail'){
        if (OutputStr === 'Changed'){
            setChanged(ChangeEmailInput, 'Email has been changed');
            ChangeEmailInput.placeholder = ChangeEmailStr;
            ChangeEmailInput.value = '';
            CurrPassInput.value = '';
            document.getElementById('modal_email').innerHTML = ChangeEmailStr;
        }else if (OutputStr === 'Same'){
            setInvalid(ChangeEmailInput,'Email is the same');
        }else if (OutputStr === 'Exists'){
            setInvalid(ChangeEmailInput, 'Email already exists');
        }else{
            setInvalid(ChangeEmailInput, 'Could not change Email, something went wrong');
        }
    }

    if (TypeStr === 'ChangePass'){
        if (OutputStr === 'Changed'){
            setChanged(ChangePassInput);
            setChanged(ChangePassConfInput,'Password has been changed');
            setChanged(CurrPassInput,'Password has been changed');
            ChangePassInput.value = '';
            ChangePassConfInput.value = '';
            CurrPassInput.value = '';
        }else
        {
            setInvalid(ChangePassInput, 'Password could not be changed, something went wrong');
        }
    }
}

//Send Data Functions****************************************************************************************
function sendLoadPosts(){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            session:'start'
        },
        type: 'POST',
        success:function(output){
            loadAllPosts(output);
        }
    });
}

function logoutMsg(Name){
    alert('Goodbye, '+Name+'!');
}

function sendDataPost(PostStr){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            post_str:PostStr
        },
        type: 'POST',
        success: function(output){
            postReturn(output);
        }
    });
}

function logout()
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            logout:'logout'
        },
        type: 'POST',
        success: function (output) {
            logoutMsg(output);
        }
    });
}
function checkDeleteUserPass($UserPass){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            check_delete_user_pass:$UserPass
        },
        type: 'POST',
        success: function (output) {
            getData('CheckDeleteUserPass',output);
        }
    });
}
function sendDataDeletePost(PostId){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            delete_post:PostId
        },
        type: 'POST',
        success: function (output) {
            getData('DeletePost',output);
        }
    });
}

function sendDataDeleteUser(){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            delete_user:'delete'
        },
        type: 'POST',
        success: function (output) {
            getData('DeleteUser',output);
        }
    });
}

function sendDataCheckCurrentPass(CurrPassStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_curr_pass:CurrPassStr
        },
        type: 'POST',
        success: function(output){
            getData('CheckPass',output);
        }
    });
}

function sendDataChangeFname(FnameStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_fname: FnameStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangeFname',output);
        }
    });
}

function sendDataChangeLname(LnameStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_lname: LnameStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangeLname',output);
        }
    });
}

function sendDataChangeUname(UnameStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_uname: UnameStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangeUname',output);
        }
    });
}

function sendDataChangeEmail(EmailStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_email: EmailStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangeEmail',output);
        }
    });
}

function sendDataChangePass(PassStr)
{
    $.ajax({
        url: 'dataHandler.php',
        data: {
            up_pass: PassStr
        },
        type: 'POST',
        success: function(output){
            getData('ChangePass',output);
        }
    });
}

//Set Invalid and Valid Functions****************************************************************************
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

//Additional UX functions
$(document).ready(function(){
    $('#edit_info_form').keypress(function(e){
        if(e.keyCode===13)
            $('#save_info_btn').click();
    });
});

$(document).ready(function(){
    $('#post_text').keypress(function(e){
        if(e.keyCode===13)
            $('#post_btn').click();
    });
});

window.addEventListener('storage', function(event){
    if (event.key === 'logout-event') {
        localStorage.clear();
        window.location.href='index.php';
    }
});

window.addEventListener('storage', function(event){
    if (event.key === 'login-event') {
        localStorage.clear();
        location.reload();
    }
});

$('div').scroll(function(){
    ResumeTimerBool = false;
    setTimeout(function(){
        ResumeTimerBool = true;
    },10000);
});

$('#bottom_post_button').click(function(){
    $("#posts_container").animate({
        scrollTop: $(
            '#posts_container').get(0).scrollHeight
    }, 500);
});