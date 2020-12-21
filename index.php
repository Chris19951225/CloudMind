<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <title>CloudMind Login or Register</title>
    <link rel="icon" type="image/png" href="img/fav.PNG">
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <div class="heading">
                    <h1><i class="fas fa-cloud"></i>CloudMind</h1>
                </div>
                <form class="change-pass-form" id="change_pass_form">
                    <h2 class="title">Change Password</h2>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="New Password" id="change_pass" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Confirm New Password" id="change_pass_conf" required maxlength="50">
                    </div>
                    <div class="change-options">
                        <input type="button" value="Cancel" id="change_back_btn" class="btn solid">
                        <input type="submit" value="Change" class="btn solid">
                    </div>
                </form>
                <form class="recover-form" id="recover_form">
                    <h2 class="title">Recover Info</h2>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" id="recover_email_input" required maxlength="250">
                    </div>
                    <div class="recover-options">
                        <input type="button" value="Back" id="forgot_back_btn" class="btn solid">
                        <input type="submit" value="Send Email" class="btn solid">
                    </div>
                </form>
                <form action="" class="sign-in-form" id="sign_in_form">
                    <h2 class="title">Sign in</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" id="login_uname" placeholder="Username" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="login_pass" placeholder="Password" required max="50">
                    </div>
                    <input type="submit" value="Login" class="btn solid">
                    <div class="lost-info">
                        <a href="javascript:void(0);" class="forgot-info-link" id="forgot_info_link">Forgot your username or password?</a>
                    </div>
                </form>
                <form action="" id="sign_up_form" class="sign-up-form">
                    <h2 class="title">Sign up</h2>
                    <div class="input-field">
                        <i class="fas fa-signature"></i>
                        <input type="text" id="reg_fname" placeholder="Firstname" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-signature"></i>
                        <input type="text" id="reg_lname" placeholder="Surname" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" id="reg_uname" placeholder="Username" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="reg_email" placeholder="Email" required maxlength="250">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="reg_pass" placeholder="Password" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="reg_pass_conf" placeholder="Confirm Password" required maxlength="50">
                    </div>
                    <input type="submit" value="Register" class="btn solid">
                </form>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>
                        New here?
                    </h3>
                    <p>Our Cloud needs raindrops! Register and become a part of the combined mind!</p>
                    <button class="btn transparent" id="sign_up_btn">Sign up</button>
                </div>
                <img src="img/reg.svg" class="image" alt="Login Image">
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>
                        Already a member?
                    </h3>
                    <p>Well, what are you waiting for? Don't rain on our parade!</p>
                    <button class="btn transparent" id="sign_in_btn">Sign in</button>
                </div>
                <img src="img/log.svg" class="image" alt="Login Image">
            </div>
        </div>
    </div>
    <script src="index.js"></script>
</body>
</html>