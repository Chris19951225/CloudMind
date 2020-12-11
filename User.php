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
    function getFname(){
        return $this->FnameStr;
    }

    function getLname(){
        return $this->LnameStr;
    }

    function getUname(){
        return $this->UnameStr;
    }

    function getEmail(){
        return $this->EmailStr;
    }

    function getPassword(){
        return $this->PassStr;
    }

    //Set methods
    function setFname($FnameStr){
        $this->FnameStr = $FnameStr;
    }

    function setLname($LnameStr){
        $this->LnameStr = $LnameStr;
    }

    function setUname($UnameStr){
        $this->UnameStr = $UnameStr;
    }

    function setEmail($EmailStr){
        $this->EmailStr = $EmailStr;
    }

    function setPassword($PassStr){
        $this->PassStr = $PassStr;
    }

    function uNameExists(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM cloudmind.Users WHERE Username='" . $this->UnameStr ."'";
        $ResultStr = $ConnStr->query($SqlStr);
        $ConnStr->close();
        if ($ResultStr->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }

    function emailExists(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM cloudmind.Users WHERE EmailAddress='" . $this->EmailStr ."'";
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
                die("Connection failed: " . $ConnStr->connect_error);
            }

            $SqlStr = "INSERT INTO cloudmind.Users(FirstName, LastName, EmailAddress, Username, Password)
                    VALUES ('" . $this->FnameStr . "','" . $this->LnameStr . "','" . $this->EmailStr
                    . "','" . $this->UnameStr . "','".$this->PassStr."')";
            if ($ConnStr->query($SqlStr) === TRUE) {
                if ($ConnStr->affected_rows > 0) {

                    $ConnStr->close();
                    return true;
                }else {

                    $ConnStr->close();
                    return false;
                }
            }
        }
    }

    function deleteUser(){
        function deleteThisPerson() {
            // Create connection
            $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
            if ($ConnStr->connect_error) {
                die("Connection failed: " . $ConnStr->connect_error);
            }

            $SqlStr = "DELETE FROM cloudmind.Users WHERE Username='" . $this->UnameStr . "'";

            if ($ConnStr->query($SqlStr) === TRUE) {
                if ($ConnStr->affected_rows > 0) {
                    $ConnStr->close();
                    return true;
                }
            } else {
                $ConnStr->close();
                return false;
            }
        }
    }

    function loadUser($UnameStr)
    {
        $this->UnameStr = $UnameStr;
        if ($this->uNameExists()){
            $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
            if ($ConnStr->connect_error) {
                die("Connection failed: " . $ConnStr->connect_error);
            }
            $SqlStr = "SELECT * FROM cloudmind.Users WHERE Username='" . $this->UnameStr . "'";

            $ResultStr = $ConnStr->query($SqlStr);
            $ConnStr->close();

            if ($ResultStr->num_rows > 0) {
                $row = $ResultStr->fetch_assoc();
                $this->FnameStr = $row['FirstName'];
                $this->LnameStr = $row['LastName'];
                $this->EmailStr = $row['EmailAddress'];
                $this->UnameStr = $row['Username'];
                $this->PassStr = $row['Password'];
                return true;
            }
        }else {
            return false;
        }
    }
}