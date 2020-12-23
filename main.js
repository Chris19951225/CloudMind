const POST_BTN = document.querySelector('#post_btn');
const INFO_EDIT_BTN = document.querySelector('#info_edit_btn');
const INFO_CANCEL_BTN = document.querySelector('#info_back_btn');
const LOGOUT_BTN = document.querySelector('#logout_btn');
const EDIT_INFO_FORM = document.querySelector('#edit_info_form');
const USER_INFO_MODAL = document.querySelector('#user_info_modal');
const SAVE_INFO_BTN = document.querySelector('#save_info_btn');
const PRE_USER_DELETE_BTN = document.querySelector('#pre_user_delete_btn');
const DELETE_USER_BTN = document.querySelector('#delete_user_btn');
const UPLOAD_PHOTO_BTN = document.querySelector('#upload_photo_btn');
const IMAGE_INPUT = document.querySelector('#image_input');
const NEW_POST_BTN = document.querySelector('#new_posts_btn');
const EMAIL_EXP = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const PASS_EXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

let UsernameStr = '';
let NumPosts = 5;
window.onload = (ev => {
   sendLoadPosts(NumPosts);
   UsernameStr = document.getElementById('change_uname').placeholder;
   checkImgExists();
   ResumeTimerBool = true;
});

let ResumeTimerBool = false;
let PostUpdateTimer = window.setInterval(function(){
    if(ResumeTimerBool){
        sendLoadPosts(NumPosts);
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
        NumPosts--;
        ResumeTimerBool = true;
    });
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

UPLOAD_PHOTO_BTN.addEventListener('click', function (){
    IMAGE_INPUT.click();
});

let ImageChangeBool = false;

IMAGE_INPUT.addEventListener('change',function (){
    if(IMAGE_INPUT && IMAGE_INPUT.files[0]){
        ImageChangeBool = true;
        let ImageHolder = document.getElementById('temp_photo_change');
        let ImageContainer = document.getElementById('user_pfp_container');
        ImageHolder.style.display = 'none';

        if(ImageContainer.querySelector('.user-pfp')){
            ImageContainer.removeChild(ImageContainer.querySelector('.user-pfp'));
        }

        let newImage = document.createElement("img");
        newImage.src= URL.createObjectURL(IMAGE_INPUT.files[0]);
        newImage.setAttribute("class", "user-pfp");
        ImageContainer.appendChild(newImage);
        UPLOAD_PHOTO_BTN.style.left = '0';
        UPLOAD_PHOTO_BTN.style.top = '0';
   }
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

document.getElementById('post_text').onkeyup = function () {
    document.getElementById('post_text').placeholder= 'What\'s on your mind? (Max:300 characters)';
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
   INFO_CANCEL_BTN.style.display='inline-block';
   EDIT_INFO_FORM.style.display = 'flex';
});


INFO_CANCEL_BTN.addEventListener('click', function(){
    INFO_EDIT_BTN.style.display='block';
    LOGOUT_BTN.style.display='block';
    EDIT_INFO_FORM.style.display = 'none'
    INFO_CANCEL_BTN.style.display='none';
    USER_INFO_MODAL.style.display='block';
    ImageChangeBool = false;

    let ImageHolder = document.getElementById('temp_photo_change');



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
document.getElementById('change_fname').onkeyup = function () {
    let ChangeFnameInput = document.getElementById('change_fname');
    let ChangeFnameStr = ChangeFnameInput.value.toString().trim();
    if(ChangeFnameStr === ''){
        setValid(ChangeFnameInput);
    }else{
        setChanged(ChangeFnameInput, '');
    }
}
document.getElementById('change_lname').onkeyup = function () {
    let ChangeLnameInput = document.getElementById('change_lname');
    let ChangeLnameStr = ChangeLnameInput.value.toString().trim();
    if(ChangeLnameStr === ''){
        setValid(ChangeLnameInput);
    }else{
        setChanged(ChangeLnameInput, '');
    }
}
document.getElementById('change_uname').onkeyup = function () {
    let ChangeUnameInput = document.getElementById('change_uname');
    let ChangeUnameStr = ChangeUnameInput.value.toString().trim();
    if(ChangeUnameStr === ''){
        setValid(ChangeUnameInput);
    }else{
        setChanged(ChangeUnameInput, '');
    }
}

document.getElementById('change_email').onkeyuo = function () {
    let ChangeEmailInput = document.getElementById('change_email');
    let ChangeEmailStr = ChangeEmailInput.value.toString().trim();

    if(ChangeEmailStr === ''){
        setValid(ChangeEmailInput);
    } else if(!EMAIL_EXP.test(ChangeEmailStr)){
        setInvalid(ChangeEmailInput, 'Please type in email correctly (with an address and \'@\' and \'.domain\'');
    }else{
        setChanged(ChangeEmailInput, '');
    }
}

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
    let ChangePassConfInput = document.getElementById('change_pass_conf');
    let ChangePassStr = ChangePassInput.value.toString();
    let ChangePassConfStr = ChangePassConfInput.value.toString();

    if(ChangePassConfStr === ''){
        setValid(ChangePassConfInput);
    }else if(ChangePassConfStr !== ChangePassStr){
        setInvalid(ChangePassConfInput, 'Confirmation password not matching');
    }else{
        setChanged(ChangePassConfInput, '');
    }
}
document.getElementById('conf_current_pass').onkeyup = function () {
    setValid(document.getElementById('conf_current_pass'));
}

//Update Info Event*****************************************************************************************
SAVE_INFO_BTN.addEventListener('click', function(){
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

    if (ImageChangeBool){
        somethingFilledBool = true;
    }

    if(ChangeFnameStr.length !== 0){
        somethingFilledBool = true;
    }

    if(ChangeLnameStr.length !== 0){
        somethingFilledBool = true;
    }

    if(ChangeUnameStr.length !== 0){
        somethingFilledBool = true;
    }

    if(ChangeEmailStr.length !== 0){
        if(EMAIL_EXP.test(ChangeEmailStr)) {
            somethingFilledBool = true;
        }
    }

    if(ChangePassStr.length !== 0){
        if(PASS_EXP.test(ChangePassStr) && ChangePassStr === ChangePassConfStr){
            somethingFilledBool = true;
        }
    }

    if(!somethingFilledBool){
        Swal.fire({
            icon: 'info',
            title: 'Info Unchanged!',
            text: 'Fill something in if you want to change it'
        })
    }else{
        let ConfCurrPassInput = document.getElementById('conf_current_pass');
        let ConfCurrPassInputStr = ConfCurrPassInput.value.toString();

        if(ConfCurrPassInputStr.length !== 0){
            sendDataCheckCurrentPass(ConfCurrPassInputStr);
        }else{
            setInvalid(ConfCurrPassInput, 'Please fill in your password to change info')
        }
    }
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

    if(IMAGE_INPUT && IMAGE_INPUT.files[0]){
        let form_data = new FormData();
        form_data.append('file', IMAGE_INPUT.files[0]);
        $.ajax({
            url: 'upload.php', // point to server-side PHP script
            dataType: 'text',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(php_script_response){
                Swal.fire('Image changed!',
                    php_script_response,
                    'success'
                )
            }
        });
    }

    if(ChangeFnameStr.length !== 0){
        sendDataChangeFname(ChangeFnameStr);
    }

    if(ChangeLnameStr.length !== 0){
        sendDataChangeLname(ChangeLnameStr);
    }

    if(ChangeUnameStr.length !== 0){
        sendDataChangeUname(ChangeUnameStr);
    }

    if(ChangeEmailStr.length !== 0){
        if(EMAIL_EXP.test(ChangeEmailStr)) {
            sendDataChangeEmail(ChangeEmailStr);
        }
    }

    if(ChangePassStr.length !== 0){
        if(PASS_EXP.test(ChangePassStr) && ChangePassStr === ChangePassConfStr){
            sendDataChangePass(ChangePassStr);
        }
    }
}
//Post Functions*********************************************************************************************
function postReturn(PostIdStr){
    if (PostIdStr === 'Failed'){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry, something went wrong with your post. Wait a bit and try again later.'
        })
    }else{
        let PostInput = document.getElementById('post_text');
        let PostTextStr = PostInput.value;

        let PostsList = document.getElementById('posts_list');
        let CurrDateTime = new Date();
        let newLi = document.createElement('li');
        newLi.className = 'post-cont new-item';
        newLi.id = 'post'+PostIdStr;
        newLi.innerHTML = '<div class="col"><i class="fa fa-tint fa-2x mb-1"></i>'+
            '<h2>'+UsernameStr+'</h2></div>'+
            '<p class="post-text">"'+PostTextStr+'"</p>'+
            '<p style="color:white">'+CurrDateTime.toISOString().split('T')[0]+' '
            +CurrDateTime.toISOString().split('T')[1].slice(0,-5)+'</p>'+
            '</div><span title="Delete Post?"><button class="btn solid delete-post">' +
            '<i class="fas fa-trash"></i></span></button>';
        PostsList.prepend(newLi);
        NumPosts++;
        PostInput.value = '';
        $("#posts_container").animate({
            scrollTop: 0
        }, 500);
        ResumeTimerBool = true;
    }
}
function loadAllPosts(PostJson){
    let PostArray = JSON.parse(PostJson.toString());
    let PostsList = document.getElementById('posts_list');
    PostsList.innerHTML = '';
    for(let i in PostArray){
        if(PostArray[i]['Belongs'] === 'Yes'){
            PostsList.innerHTML += '<li class="post-cont" id="post'+PostArray[i]['PostId']+'">' +
                '<i class="post-img-holder fa fa-tint fa-2x mb-1"></i>'+
                '<h2>'+PostArray[i]['Username']+'</h2>'+
                '<p class="post-text">'+'"'+PostArray[i]['PostText']+'"'+'</p>'+
                '<p style="color:white">'+PostArray[i]['PostTimeStamp']+'</p>'+
                '<span title="Delete Post?"><button class="btn solid delete-post">' +
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
    ScrollPause = false;
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

    if(TypeStr === 'ImgExists'){
        if(OutputStr === 'PNG'){
            let ImageHolder = document.getElementById('temp_photo_change');
            ImageHolder.style.display = 'none';
            let ImageContainer = document.getElementById('user_pfp_container');
            let newImage = document.createElement("img");
            newImage.src= 'img/'+UsernameStr+'.png';
            newImage.setAttribute("class", "user-pfp");
            ImageContainer.appendChild(newImage);
            UPLOAD_PHOTO_BTN.style.left = '0';
            UPLOAD_PHOTO_BTN.style.top = '0';

            /*let InfoImgHolder = document.getElementById('temp_photo_info');
            InfoImgHolder.style.display = 'none';
            let DeleteImgHolder = document.getElementById('temp_photo_delete');
            DeleteImgHolder.style.display = 'none';
            let InfoHeader = document.getElementById('info_modal_header');
            InfoHeader.appendChild(newImage);
            let DeleteHeader = document.getElementById('delete_modal_header');
            DeleteHeader.appendChild(newImage);*/

        }else if(OutputStr === 'JPG'){
            let ImageHolder = document.getElementById('temp_photo_change');
            ImageHolder.style.display = 'none';
            let ImageContainer = document.getElementById('user_pfp_container');
            let newImage = document.createElement("img");
            newImage.src= 'img/'+UsernameStr+'.jpg';
            newImage.setAttribute("class", "user-pfp");
            ImageContainer.appendChild(newImage);
            UPLOAD_PHOTO_BTN.style.left = '0';
            UPLOAD_PHOTO_BTN.style.top = '0';

            let InfoImgHolder = document.getElementById('temp_photo_info');
            InfoImgHolder.style.display = 'none';
            let DeleteImgHolder = document.getElementById('temp_photo_delete');
            DeleteImgHolder.style.display = 'none';

            let InfoPhotoDiv = document.getElementById('info_photo_div');
            newImage = document.createElement('img');
            newImage.src= 'img/'+UsernameStr+'.jpg';
            newImage.setAttribute("class", "user-pfp");
            InfoPhotoDiv.prepend(newImage);
            let DeletePhotoDiv = document.getElementById('delete_photo_div');
            newImage = document.createElement('img');
            newImage.src= 'img/'+UsernameStr+'.jpg';
            newImage.setAttribute("class", "user-pfp");
            DeletePhotoDiv.prepend(newImage);
        }
    }

    if(TypeStr === 'DeletePost'){
        if(OutputStr !== 'Deleted'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry, something went wrong deleting your post. It\'s gonna have to stay in the cloud a bit longer',
            });
        }
    }

    if(TypeStr === 'CheckDeleteUserPass'){
        if (OutputStr.includes('No')) {
            setInvalid(CurrPassInput, 'Password is incorrect, Attempts left: ' + (3-parseInt(OutputStr.charAt(OutputStr.length-1))).toString());
        } else if (OutputStr === 'Blocked'){
            setInvalid(CurrPassInput, 'Password Blocked');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User has been blocked due to too many failed password attempts. Returning to Login page.',
            }).then((result) => {
                window.location.href='index.php';
            })
        }else{
            $('#delete_modal').modal();
        }
    }

    if(TypeStr === 'DeleteUser'){
        if(OutputStr === 'Deleted'){
            Swal.fire('Your user has been deleted!',
                'You will now be redirected to the login page',
                'success'
            ).then((result) => {
                window.location.href='index.php';
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry, something went wrong with deleting your user. You\'re gonna have to stay a bit longer.'
            });
        }
    }

    if (TypeStr === 'CheckPass') {
        if (OutputStr.includes('No')) {
            setInvalid(CurrPassInput, 'Password is incorrect, Attempts left: ' + (3-parseInt(OutputStr.charAt(OutputStr.length-1))).toString());
        } else if (OutputStr === 'Blocked'){
            setInvalid(CurrPassInput, 'Password Blocked');
            Swal.fire({
                icon: 'error',
                title: 'Blocked',
                text: 'User has been blocked due to too many failed password attempts. Returning to Login page.'
            }).then((result) => {
                window.location.href='index.php';
            });

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
            alert('In change uname');
            sendDataChangeImgName(UsernameStr);
            setChanged(ChangeUnameInput, 'Username has been changed');
            ChangeUnameInput.placeholder = ChangeUnameStr;
            UsernameStr = ChangeUnameInput.placeholder;
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
function checkImgExists(){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            img_exists:'img'
        },
        type: 'POST',
        success:function(output){
            getData('ImgExists',output)
        }
    });
}

function sendDataChangeImgName(UnameStr){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            old_img_name:UnameStr
        },
        type: 'POST'
    });
}

function sendLoadPosts(NumPosts){
    $.ajax({
        url: 'dataHandler.php',
        data: {
            num_posts:NumPosts
        },
        type: 'POST',
        success:function(output){
            loadAllPosts(output);
        }
    });
}

function logoutMsg(Name){
    Swal.fire('Goodbye, '+Name+'!');
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

let ScrollPause = false;
document.getElementById('posts_container').addEventListener('scroll', function(){
    let ScrollCurrent = document.getElementById('posts_container').scrollTop;
    let ScrollHeight = document.getElementById('posts_container').scrollHeight;
    if(!ScrollPause){
        if(ScrollCurrent + 800 > ScrollHeight) {
            ScrollPause = true;
            NumPosts += 5;
            sendLoadPosts(NumPosts);
        }
    }
})

$('#bottom_post_button').click(function(){
    $("#posts_container").animate({
        scrollTop: $(
            '#posts_container').get(0).scrollHeight
    }, 500);
});
