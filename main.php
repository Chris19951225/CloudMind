<?php
    session_start();
    if (!isset($_SESSION['Username'])){
        echo "Fuck off mate";
        header("Location:login.php");
    }else{
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
<body class="posts-page">
<div class="heading main-page">
    <h1><i class="fas fa-cloud"></i>CloudMind</h1>
</div>
<button type="button" class="btn solid user-icon" data-toggle="modal" data-target="#modal_profile">
    <span title="User Profile"><i class="fa fa-user ml-1"></i></span>
</button>
<!-- Modal: modalPoll -->
    <div class="modal fade right" id="modal_profile" tabindex="-1" role="dialog" aria-labelledby="User Profile"
         aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog modal-full-height modal-right modal-notify modal-info" role="document">
            <div class="modal-content">
                <!--Header-->
                <div class="modal-header">
                    <p class="user-name"><?php echo $_SESSION['Username']?></p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="white-text">×</span>
                    </button>
                </div>

                <!--Body-->
                <div class="modal-body">
                    <div class="text-center">
                        <i class="fa fa-tint fa-4x mb-3 animated rotateIn"></i>
                        <p>
                            <strong><?php echo $_SESSION['Firstname']." ".$_SESSION['Lastname'];?></strong>
                        </p>
                        <p>Have some ideas how to improve our product?
                            <strong>Give us your feedback.</strong>
                        </p>
                    </div>

                    <hr>

                    <!-- Radio -->
                    <p class="text-center">
                        <strong>Your rating</strong>
                    </p>
                    <div class="form-check mb-4">
                        <input class="form-check-input" name="group1" type="radio" id="radio-179" value="option1" checked>
                        <label class="form-check-label" for="radio-179">Very good</label>
                    </div>
                    <!-- Radio -->

                    <p class="text-center">
                        <strong>What could we improve?</strong>
                    </p>
                    <!--Basic textarea-->
                    <div class="md-form">
                        <textarea type="text" id="form79textarea" class="md-textarea form-control" rows="3"></textarea>
                        <label for="form79textarea">Your message</label>
                    </div>

                </div>

                <!--Footer-->
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn solid">Update</button>
                    <button type="button" class="btn solid">Logout
                        <i class="fa fa-sign-out ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
<!-- Modal: modalPoll -->
</body>
</html>