<?php
include('User.php');
include('Post.php');
session_start([
    'cookie_lifetime' => 86400,
]);

//Delete Old Data*********************************************************************************************
function deleteOldData(){
    $TempPost = new Post();
    $PostsArray = $TempPost->loadAllPosts();
    foreach($PostsArray as $Post){
        $PostId = $Post['PostId'];
        $PostDate = strtotime(date($Post['PostTimeStamp']));
        $TodayDate = strtotime(date('Y-m-d H:i:s'));
        $DateDiffDays = round(($TodayDate - $PostDate)/ (60 * 60 * 24));
        if($DateDiffDays > 30){
            $TempPost->deletePost($PostId);
        }
    }
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

//Login, Register, Recover Functions**************************************************************************
function recEmail($EmailStr){
    $TempUser = new User();

    if($TempUser->loadUserThroughEmail($EmailStr)){
        $RecoverCodeStr = generateRandomString(16);
        $SubjectStr = 'CloudMind Recovery Email';
        $BodyStr = 'Hi, ' . $TempUser->getFname() . ' ' . $TempUser->getLname().',
                    Your Username is: ' . $TempUser->getUname() . '
                    and your recovery pin is: '. $RecoverCodeStr . '
                    Please use this info when you try to login to CloudMind again. Enjoy your day!';
        $Header = 'From:CloudMind.com';

        if (mail($EmailStr, $SubjectStr, $BodyStr, $Header)) {
            $options = [
                'cost' => 12,
            ];
            $RecoverCodeStrHash = password_hash($RecoverCodeStr, PASSWORD_BCRYPT, $options);
            $TempUser->setRecCode($RecoverCodeStrHash);
            $TempUser->setState(0);
            echo 'Success';
        } else {
            echo 'Failed';
        }
    }else{
        echo 'Does not exist';
    }
}

function confirmLogin($UsernameStr,$PasswordStr){
    $User = new User();
    if ($User->loadUser($UsernameStr)) {
        if(!$User->getState()){
            if(password_verify($PasswordStr, $User->getRecCode())){
                $User->setPassAtt(0);
                echo 'Recovered';
            }else{
                echo 'Recovery Failed';
            }
        } else{
            if(password_verify($PasswordStr, $User->getPassword())){
                $User->setPassAtt(0);
                $_SESSION['Username'] = $UsernameStr;
                $_SESSION['Firstname'] = $User->getFname();
                $_SESSION['Lastname'] = $User->getLname();
                $_SESSION['Email'] = $User->getEmail();
            } else{
                $CurrAttempts = $User->getPassAtt() + 1;
                if($CurrAttempts < 3) {
                    $User->setPassAtt($CurrAttempts);
                    echo 'Wrong-Password '.$CurrAttempts;
                }else{
                    $User->setState(0);
                    echo 'Blocked';
                }
            }
        }
    }else{
        echo'Nonexistent';
    }
}

function confirmRegister($FnameStr,$LnameStr,$EmailStr,$UnameStr,$PassStr)
{
    $options = [
        'cost' => 12,
    ];

    $PassStr = password_hash($PassStr, PASSWORD_BCRYPT, $options);
    $User = new User();
    $User->createUser($FnameStr,$LnameStr,$EmailStr,$UnameStr,$PassStr);
    if($User->uNameExists()) {
        echo 'Username Exists';
    } else if($User->emailExists()){
        echo 'Email Exists';
    } else{
        $User->saveUser();
        echo 'Created';
    }
}
//Delete User Function **************************************************************************************
function deleteUser(){
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    $UserIdInt = $User->getUserId();
    $TempPost = new Post();
    $TempPost->deleteRelatedPosts($UserIdInt);

    if($User->deleteUser()) {
        echo 'Deleted';
    }else{
        echo 'Failed';
    }

}

//Delete Post Function **************************************************************************************
function deletePost($PostIdInt){
    $Post = new Post();
    if($Post->deletePost($PostIdInt)) {
        echo 'Deleted';
    }else{
        echo 'Failed';
    }

}
//Post Functions*********************************************************************************************
function addPost($PostStr){
    $NewPost = new Post();
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    $NewPost->createPost($PostStr,$User->getUserId());
    $LastInsertIdInt = $NewPost->savePost();
    if($LastInsertIdInt){
        echo $LastInsertIdInt;
    }else{
        echo 'Failed';
    }
}

function loadAllPosts($NumPostsInt){
    $NewPost = new Post();
    $PostArray = $NewPost->loadAllPosts($_SESSION['Username'],$NumPostsInt);
    echo json_encode($PostArray);
}
//Update User Functions *************************************************************************************
function confirmCurrPass($CurrPassStr){
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    if (password_verify($CurrPassStr, $User->getPassword())) {
        $User->setPassAtt(0);
        echo 'Yes';
    } else {
        $CurrAttempts = $User->getPassAtt() + 1;
        if ($CurrAttempts < 3) {
            $User->setPassAtt($CurrAttempts);
            echo 'No '. $CurrAttempts;
        } else {
            $User->setState(0);
            echo 'Blocked';
            $_SESSION = array();
            die();
        }
    }
}

function changeFname($FnameStr)
{
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    if($FnameStr !== $User->getFname()) {
        if ($User->setFname($FnameStr)) {
            $_SESSION['Firstname'] = $FnameStr;
            echo 'Changed';
        } else {
            echo 'Failed';
        }
    }else{
        echo 'Same';
    }
}

function changeLname($LnameStr)
{
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    if($LnameStr !== $User->getLname()) {
        if ($User->setLname($LnameStr)) {
            $_SESSION['Lastname'] = $LnameStr;
            echo 'Changed';
        } else {
            echo 'Failed';
        }
    }else{
        echo 'Same';
    }
}


function changeUsername($UnameStr){
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    if($User->getUname()===$UnameStr){
        echo 'Same';
    }else if($User->uNameExists($UnameStr)){
        echo 'Exists';
    }else{
        if ($User->setUname($UnameStr)) {
            $_SESSION['Username'] = $UnameStr;
            echo 'Changed';
        } else {
            echo 'Failed';
        }
    }
}

function changeEmail($EmailStr){
    $User = new User();
    $User->loadUser($_SESSION['Username']);
    if($User->getEmail()===$EmailStr){
        echo 'Same';
    }else if($User->emailExists($EmailStr)){
        echo 'Exists';
    }else{
        if ($User->setEmail($EmailStr)) {
            $_SESSION['Email'] = $User->getEmail();
            echo 'Changed';
        } else {
            echo 'Failed';
        }
    }
}

function changePass($PassStr,$UnameStr = ''){
    $options = [
        'cost' => 12,
    ];
    $PassStr = password_hash($PassStr, PASSWORD_BCRYPT, $options);
    $User = new User();
    if($UnameStr == ''){
        $User->loadUser($_SESSION['Username']);
    }else{
        $User->loadUser($UnameStr);
    }

    if ($User->setPassword($PassStr)) {
        $User->setState(1);
        echo 'Changed';
    } else {
        echo 'Failed';
    }
}

//Start Session*********************************************************************************************
if(isset($_POST['num_posts'])){
    deleteOldData();
    $NumPostsInt = $_POST['num_posts'];
    loadAllPosts($NumPostsInt);
    unset($_POST['num_posts']);
}

//Recover Info Function *************************************************************************************
if(isset($_POST['rec_email']))
{
    $EmailStr = $_POST['rec_email'];
    recEmail($EmailStr);
    $_POST = array();
}

if(isset($_POST['change_uname']) && isset($_POST['change_pass'])){
    $PassStr = $_POST['change_pass'];
    $UnameStr = $_POST['change_uname'];
    changePass($PassStr,$UnameStr);
    $_POST = array();
}
//Login Function *************************************************************************************
if(isset($_POST['login_username']) && isset($_POST['login_password']))
{
    $UsernameStr = $_POST['login_username'];
    $PasswordStr = $_POST['login_password'];
    confirmLogin($UsernameStr,$PasswordStr);
    $_POST = array();
}
//Register Function *************************************************************************************
if(isset($_POST['reg_fname']) && isset($_POST['reg_lname']) && isset($_POST['reg_email']) && isset($_POST['reg_uname'])
&& isset($_POST['reg_pass']))
{
    $FnameStr = $_POST['reg_fname'];
    $LnameStr = $_POST['reg_lname'];
    $EmailStr = $_POST['reg_email'];
    $UnameStr = $_POST['reg_uname'];
    $PassStr = $_POST['reg_pass'];
    confirmRegister($FnameStr,$LnameStr,$EmailStr,$UnameStr,$PassStr);
    $_POST = array();
}

//Receive Update User Info ********************************************************************************************
if(isset($_POST['up_curr_pass']))
{
    $UpCurrPassStr = $_POST['up_curr_pass'];
    confirmCurrPass($UpCurrPassStr);
    unset($_POST['up_curr_pass']);
}

if(isset($_POST['up_fname']))
{
    $UpFnameStr = $_POST['up_fname'];
    changeFname($UpFnameStr);
    unset($_POST['up_fname']);
}

if(isset($_POST['up_lname']))
{
    $UpLnameStr = $_POST['up_lname'];
    changeLname($UpLnameStr);
    unset($_POST['up_lname']);
}

if(isset($_POST['up_uname']))
{
    $UpUnameStr = $_POST['up_uname'];
    changeUsername($UpUnameStr);
    unset($_POST['up_uname']);
}

if(isset($_POST['up_email']))
{
    $UpEmailStr = $_POST['up_email'];
    changeEmail($UpEmailStr);
    unset($_POST['up_email']);
}

if(isset($_POST['up_pass']))
{
    $UpPassStr= $_POST['up_pass'];
    changePass($UpPassStr);
    unset($_POST['up_pass']);
}

//Delete User******************************************************************************************
if(isset($_POST['check_delete_user_pass'])){
    $CurrPassStr = $_POST['check_delete_user_pass'];
    confirmCurrPass($CurrPassStr);
    unset($_POST['check_delete_user_pass']);
}

//Delete User******************************************************************************************
if(isset($_POST['delete_user'])){
    deleteUser();
    unset($_POST['deleteUser']);
    $_SESSION = array();
}
//Delete Post******************************************************************************************
if(isset($_POST['delete_post'])){
    deletePost($_POST['delete_post']);
    unset($_POST['delete_post']);
}
//Receive Post******************************************************************************************
if(isset($_POST['post_str'])){
    $PostStr = $_POST['post_str'];
    addPost($PostStr);
    unset($_POST['post_str']);
}

//Logout************************************************************************************************
if(isset($_POST['logout']))
{
    echo $_SESSION['Username'];
    $_SESSION = array();
    session_destroy();
}

//Change Image Name*************************************************************************************
if(isset($_POST['old_img_name'])){
    $OldNameStr = $_POST['old_img_name'];
    if(file_exists('img/'.$OldNameStr.'.png')){
        rename('img/'.$OldNameStr.'.png', 'img/'.$_SESSION['Username'].'.png');
    }else if(file_exists('img/'.$OldNameStr.'.jpg')) {
        rename('img/'.$OldNameStr.'.jpg', 'img/'.$_SESSION['Username'].'.jpg');
    }
    unset($_POST['old_img_name']);
}

//Check Image Exists ***********************************************************************************
if(isset($_POST['img_exists'])){
    if(file_exists('img/'.$_SESSION['Username'].'.png')){
        echo 'PNG';
    }else if(file_exists('img/'.$_SESSION['Username'].'.jpg')) {
        echo 'JPG';
    }
    unset($_POST['img_exists']);
}