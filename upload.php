<?php
session_start();
if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    $FilenameStr = $_SESSION['Username'];
    if(strpos($_FILES['file']['name'], 'j') !== false){
        $FilenameStr .= '.jpg';
    }else{
        $FilenameStr .= '.png';
    }
    move_uploaded_file($_FILES['file']['tmp_name'], 'img/' . $FilenameStr);
    echo 'Yas';
}
