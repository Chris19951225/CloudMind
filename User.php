<?php

class User
{
    private $ServernameStr = 'localhost';
    private $DBUsernameStr;
    private $DBPassStr;
    private $DBnameStr;

    private $FnameStr = '';
    private $LnameStr = '';
    private $UnameStr = '';
    private $EmailStr = '';
    private $PassStr = '';

    public function __construct() {
        $config = parse_ini_file('../conf.ini');
        $this->DBUsernameStr = $config['username'];
        $this->DBPassStr = $config['password'];
        $this->DBnameStr = $config['dbname'];
    }

    function createUser($FnameStr, $LnameStr, $EmailStr,$UnameStr, $PassStr)
    {
        $this->FnameStr = $FnameStr;
        $this->LnameStr = $LnameStr;
        $this->EmailStr = $EmailStr;
        $this->UnameStr= $UnameStr;
        $this->PassStr = $PassStr;
    }

    //Get methods
    function getUserId(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username='" . $this->UnameStr ."'";
        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $row = $ResultStr->fetch_assoc();
            return $row['Id'];
        } else {
            return false;
        }
    }

    function getFname(){
        return $this->FnameStr;
    }

    function getLname(){
        return $this->LnameStr;
    }

    function getUname($UserIdInt = ''){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }

        if($UserIdInt != '') {
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE Id= " . $UserIdInt;

        }else{
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username= '" . $this->UnameStr."'";
        }

        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $row = $ResultStr->fetch_assoc();
            return $row['Username'];
        } else {
            return false;
        }
    }

    function getEmail(){
        return $this->EmailStr;
    }

    function getPassword(){
        return $this->PassStr;
    }

    function getState(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username= '".$this->UnameStr."'";
        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $row = $ResultStr->fetch_assoc();
            return $row['State'];
        } else {
            return false;
        }
    }

    function getPassAtt(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username= '".$this->UnameStr."'";
        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $row = $ResultStr->fetch_assoc();
            return $row['PasswordAttempts'];
        } else {
            return false;
        }
    }

    function getRecCode(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username= '".$this->UnameStr."'";
        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $row = $ResultStr->fetch_assoc();
            return $row['RecoverCode'];
        } else {
            return false;
        }
    }

    //Set methods
    function setFname($FnameStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET FirstName='" . $FnameStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setLname($LnameStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET LastName='" . $LnameStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setUname($UnameStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET Username='" . $UnameStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setEmail($EmailStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET EmailAddress='" . $EmailStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setPassword($PassStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET Password='" . $PassStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setState($StateBool){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET State='" . $StateBool ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setPassAtt($PassAttInt){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET PasswordAttempts=" . $PassAttInt ." WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function setRecCode($RecCodeStr){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Users SET RecoverCode='" . $RecCodeStr ."' WHERE Username='".$this->UnameStr."'";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function uNameExists($UnameStr = ''){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }

        if($UnameStr != '')
        {
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username='" . $UnameStr . "'";
        }else {

            $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username='" . $this->UnameStr . "'";
        }

        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }

    function emailExists($EmailStr = ''){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }

        if($EmailStr!='') {
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE EmailAddress='" . $EmailStr . "'";

        }else{
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE EmailAddress='" . $this->EmailStr . "'";
        }

        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }

    function saveUser(){
        if ($this->emailExists() || $this->uNameExists()) {
            return false;
        }
        else{
            $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
            if ($ConnStr->connect_error) {
                die('Connection failed: ' . $ConnStr->connect_error);
            }

            $SqlStr = "INSERT INTO CloudMind.Users(FirstName, LastName, EmailAddress, Username, Password, State)
                    VALUES ('" . $this->FnameStr . "','" . $this->LnameStr . "','" . $this->EmailStr
                    . "','" . $this->UnameStr . "','".$this->PassStr."', 'Valid')";
            if ($ConnStr->query($SqlStr) === TRUE) {
                if ($ConnStr->affected_rows > 0) {

                    $ConnStr->close();
                    return true;
                }
            }
        }
        $ConnStr->close();
        return false;
    }

    function deleteUser(){
            // Create connection
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }

        $SqlStr = "DELETE FROM CloudMind.Users WHERE Username='".$this->UnameStr."'";

        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }

        $ConnStr->close();
        return false;
    }

    function deleteUserPerm($UserIdInt){
        // Create connection
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        // Check connection
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }

        $SqlStr = "DELETE FROM CloudMind.Users WHERE Id=".$UserIdInt;

        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }

        $ConnStr->close();
        return false;
    }


    function loadUser($UnameStr)
    {
        $this->UnameStr = $UnameStr;
        if ($this->uNameExists()){
            $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
            if ($ConnStr->connect_error) {
                die('Connection failed: ' . $ConnStr->connect_error);
            }
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE Username='" . $this->UnameStr . "'";

            $ResultStr = $ConnStr->query($SqlStr);
            $ConnStr->close();

            if ($ResultStr->num_rows > 0) {
                $row = $ResultStr->fetch_assoc();
                $this->FnameStr = $row['FirstName'];
                $this->LnameStr = $row['LastName'];
                $this->EmailStr = $row['EmailAddress'];
                $this->PassStr = $row['Password'];
                return true;
            }
        }

        return false;
    }

    function loadUserThroughEmail($EmailStr){
        $this->EmailStr = $EmailStr;
        if ($this->emailExists()){
            $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
            if ($ConnStr->connect_error) {
                die('Connection failed: ' . $ConnStr->connect_error);
            }
            $SqlStr = "SELECT * FROM CloudMind.Users WHERE EmailAddress='" . $this->EmailStr . "'";

            $ResultStr = $ConnStr->query($SqlStr);
            $ConnStr->close();

            if ($ResultStr->num_rows > 0) {
                $row = $ResultStr->fetch_assoc();
                $this->FnameStr = $row['FirstName'];
                $this->LnameStr = $row['LastName'];
                $this->UnameStr = $row['Username'];
                $this->PassStr = $row['Password'];
                return true;
            }
        }

        return false;
    }

    function loadAllDeletedUsers() {
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        // Check connection
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT Id FROM CloudMind.Users WHERE State='Deleted'";

        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            $ArraySizeInt = 0;
            $DeletedUsersArray = array();
            while ($row = $ResultStr->fetch_assoc()){
                $DeletedUsersArray[$ArraySizeInt] = $row['Id'];
                $ArraySizeInt++;
            }
            return $DeletedUsersArray;
        } else return false;
    }
}