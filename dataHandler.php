<?php
include('User.php');

function recEmail($EmailStr){

    $Subject = "CloudMind Recovery Email";

    $Message = "<b>This is HTML message.</b>";
    $Message .= "<h1>This is headline.</h1>";

    $Header = "From:CloudMind.com \r\n";
    $Header .= "MIME-Version: 1.0\r\n";
    $Header .= "Content-type: text/html\r\n";

    $Retval = mail ($EmailStr,$Subject,$Message,$Header);

    if( $Retval == true ) {
        die(json_encode($EmailStr));
    }else {
        die(json_encode($EmailStr));
    }
}

function confirmLogin($UsernameStr,$PasswordStr){
    $User = new User();
    if ($User->loadUser($UsernameStr)) {
        if($User->getPassword() == $PasswordStr){
            echo'Confirmed';
        }
        else{
            echo 'Wrong-Password';
        }
    }else{
        echo'Nonexistent';
    }
}

function confirmRegister($FnameStr,$LnameStr,$EmailStr,$UnameStr,$PassStr)
{
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

if(isset($_POST['rec_email']))
{
    $EmailStr = $_POST['rec_email'];
    recEmail($EmailStr);
    $_POST = array();
    die();
}

if(isset($_POST['login_username']) && isset($_POST['login_password']))
{
    $UsernameStr = $_POST['login_username'];
    $PasswordStr = $_POST['login_password'];
    confirmLogin($UsernameStr,$PasswordStr);
}

if(isset($_POST['reg_fname']) && isset($_POST['reg_lname']) && isset($_POST['reg_email']) && isset($_POST['reg_uname'])
&& isset($_POST['reg_pass']))
{
    $FnameStr = $_POST['reg_fname'];
    $LnameStr = $_POST['reg_lname'];
    $EmailStr = $_POST['reg_email'];
    $UnameStr = $_POST['reg_uname'];
    $PassStr = $_POST['reg_pass'];
    confirmRegister($FnameStr,$LnameStr,$EmailStr,$UnameStr,$PassStr);
}