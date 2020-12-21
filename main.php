<?php
    session_start([
        'cookie_lifetime' => 86400,
    ]);
    if(!isset($_SESSION['Username']))
    {
        ?><h1>Sorry, not suppose to be here, you have to login first!</h1>
            <a href="index.php">Back to CloudMind Login Page</a>
        <?php
        die();
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <title>CloudMind</title>
    <link rel="icon" type="image/png" href="img/fav.PNG">
    <link rel="stylesheet" href="style.css" />
</head>
<body >
<div class="posts-page" id="main_div">
    <div class="heading main-page">
        <h1 class="main-title"><i class="fas fa-cloud"></i>CloudMind</h1>
        <h3 id="main_logged_in_uname">Signed in: <?php echo $_SESSION['Username']?></h3>
    </div>
    <button type="button" class="btn solid user-icon" id="user_profile_btn" data-toggle="modal" data-target="#modal_profile">
        <span title="User Profile"><i class="fa fa-user ml-1"></i></span>
    </button>

    <div class="post-box col-md-10 h-80">
        <div class="row posts-heading"><h2 class="title">Recent Posts</h2></div>
        <div class="row align-items-center posts" id="posts_container">
            <ul class="posts-list" id="posts_list">

            </ul>
            <span title="To Bottom"><button class="btn solid" id="bottom_post_button"><i class="fas fa-arrow-down"></i></button></span>
        </div>
        <div class="row align-items-end text-box h-70" style="padding:10px; padding-left:5px;" >
            <div class="col-md-11 col-sm-11 col-lg-10">
                <textarea class="post-placeholder" id="post_text" placeholder="What's on your mind?" maxlength="1000"></textarea>
            </div>
            <div class="col">
                <button class="btn solid" id="post_btn">POST</button>
            </div>
        </div>
    </div>

<!-- Modal: modalPoll -->
    <div class="modal fade right" id="modal_profile" tabindex="-1" role="dialog" aria-labelledby="User Profile"
         aria-hidden="true" >
        <div class="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <form action="" id="edit_info_form" class="edit-info-form">
                    <h2 class="title">Edit Info</h2>
                    <span><strong>Names: </strong></span>
                    <div class="input-field">
                        <i class="fas fa-signature"></i>
                        <input type="text" id="change_fname" placeholder="<?php echo $_SESSION['Firstname']?>" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-signature"></i>
                        <input type="text" id="change_lname" placeholder="<?php echo $_SESSION['Lastname']?>" required maxlength="50">
                    </div>
                    <span><strong>Username: </strong></span>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" id="change_uname" placeholder="<?php echo $_SESSION['Username']?>" required maxlength="50">
                    </div>
                    <span><strong>Email: </strong></span>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" id="change_email" placeholder="<?php echo $_SESSION['Email']?>" required maxlength="250">
                    </div>
                    <span><strong>Password change: </strong></span>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="change_pass" placeholder="New Password" required maxlength="50">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="change_pass_conf" placeholder="Confirm New Password" required maxlength="50">
                    </div>
                    <span><strong>Current Password (Required): </strong></span>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="conf_current_pass" placeholder="Confirm Current Password" required maxlength="50">
                    </div>
                    <div>
                        <button type="button" class="btn solid" id="save_info_btn">Save</button>
                        <button type="button" class="btn solid" id="info_back_btn" >Back</button>
                    </div>
                        <button type="button" class="btn solid" id="pre_user_delete_btn" style="background-color:red;">Delete User</button>
                </form>
                <div class="modal fade" id="delete_modal" role="dialog" data-backdrop="false">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <i class="fa fa-tint fa-3x mb-2"></i>
                                <p class="user-name">Delete <?php echo $_SESSION['Username']?></p>
                            </div>
                            <div class="modal-body justify-content-center">
                                <p class="sure">Are you sure?</p>
                                <p style="text-align: center">Are you sure you want to delete your user? It's not like we care... It's just that,
                                    we really thought we mattered to you. You know? We thought we made an impact
                                in your life, but it seems it was a lie. You don't need us. That's fine... We get it.
                                No, go. You're here already. Why waste your time anymore? Just go. Leave... Or stay, you
                                know, whatever. We won't judge.</p>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <div>
                                    <button type="button" class="btn solid" id="delete_user_btn"
                                            style="background-color:red;">Delete</button>
                                    <button type="button" class="btn solid" id="delete_back_btn" data-toggle="modal"
                                            data-target="#delete_modal">Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!--Header-->
                <div id="user_info_modal">
                    <div class="modal-header">
                        <i class="fa fa-tint fa-3x mb-2"></i>
                        <p class="user-name" id="modal_uname"><?php echo $_SESSION['Username']?></p>
                    </div>

                    <!--Body-->
                    <div class="modal-body">
                        <div class="text-center">
                            <div>
                                <strong>First Name:</strong>
                                <p id="modal_fname" class="user-info"><?php echo $_SESSION['Firstname'];?></p>
                                <strong>Surname:</strong>
                                <p id="modal_sname" class="user-info"><?php echo $_SESSION['Lastname'];?></p>
                                <strong id="modal_email">Email:</strong>
                                <p id="modal_email" class="user-info"><?php echo $_SESSION['Email'];?></p>
                            </div>

                        </div>
                    </div>

                    <!--Footer-->
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn solid" id="info_edit_btn"><span title="Edit Personal Info">Edit</span></button>
                        <button type="button" class="btn solid" id="logout_btn">Logout
                            <i class="fa fa-sign-out ml-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal: modalPoll -->
<script src="main.js"></script>
</body>
</html>