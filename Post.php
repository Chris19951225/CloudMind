<?php
class Post
{
    private $ServernameStr = 'localhost';
    private $DBUsernameStr;
    private $DBPassStr;
    private $DBnameStr;

    private $PostTextStr = '';
    private $UserIdInt = '';

    public function __construct() {
        $config = parse_ini_file('../conf.ini');
        $this->DBUsernameStr = $config['username'];
        $this->DBPassStr = $config['password'];
        $this->DBnameStr = $config['dbname'];
    }

    function createPost($PostTextStr, $UserIdInt)
    {
        $this->PostTextStr = $PostTextStr;
        $this->UserIdInt = $UserIdInt;
    }

    //Get methods
    /*function getPostText(){
        return $this->PostTextStr;
    }

    function getUserId(){
        return $this->UserIdInt;
    }

    function getPostTimeStamp(){
        return ;//More to come
    }

    //Set methods
    function setPostText($PostTextStr){
        $this->PostTextStr = $PostTextStr;
    }

    function setUserIdInt($UserIdInt){
        $this->UserIdInt = $UserIdInt;
    }*/

    function savePost(){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
            // Check connection
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }

        $SqlStr = "INSERT INTO cloudmind.Posts(PostText, UserId)
                    VALUES ('" . $this->PostTextStr . "'," . $this->UserIdInt.")";
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $SqlStr = "SELECT LAST_INSERT_ID()";
                $ResultStr = $ConnStr->query($SqlStr);
                if ($ResultStr->num_rows > 0) {
                    $row = $ResultStr->fetch_assoc();
                    return $row['LAST_INSERT_ID()'];
                }
            }
        }
        $ConnStr->close();
        return false;
    }

    function loadAllPosts($UnameStr = '', $NumPostsInt = 0){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }
        $SqlStr = "SELECT * FROM CloudMind.Posts WHERE 1 ORDER BY PostId DESC";
        if($NumPostsInt !== 0){
            $SqlStr .= " LIMIT ". $NumPostsInt;
        }
        $ResultStr = $ConnStr->query($SqlStr);
        $ArraySizeInt = 0;
        $PostsArray = array();
        if ($ResultStr->num_rows > 0) {
            while ($row = $ResultStr->fetch_assoc()) {
                $PostsArray[$ArraySizeInt] = array();
                $PostsArray[$ArraySizeInt]['PostId']= $row['PostId'];
                $PostsArray[$ArraySizeInt]['PostTimeStamp'] = $row['PostTimeStamp'];
                $PostsArray[$ArraySizeInt]['PostText'] = $row['PostText'];
                $PostsArray[$ArraySizeInt]['UserId'] = $row['UserId'];
                $PostsArray[$ArraySizeInt]['NotOld'] = $row['NotOld'];
                $SqlStr = "SELECT * FROM CloudMind.Users WHERE Id=".$row['UserId'];
                $ResultStr2 = $ConnStr->query($SqlStr);
                $row2 = $ResultStr2->fetch_assoc();
                $PostsArray[$ArraySizeInt]['Username'] = $row2['Username'];
                if($UnameStr !== ''){
                    if($PostsArray[$ArraySizeInt]['Username'] === $UnameStr){
                        $PostsArray[$ArraySizeInt]['Belongs'] = 'Yes';
                    }else{
                        $PostsArray[$ArraySizeInt]['Belongs'] = 'No';
                    }
                }
                $ArraySizeInt++;
            }
            $ConnStr->close();
            return $PostsArray;
        }
        $ConnStr->close();
        return false;
    }

    function deletePost($PostId){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        // Check connection
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }

        $SqlStr = "DELETE FROM CloudMind.Posts WHERE PostId=".$PostId;
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function deleteRelatedPosts($UserIdInt){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        // Check connection
        if ($ConnStr->connect_error) {
            die("Connection failed: " . $ConnStr->connect_error);
        }

        $SqlStr = "DELETE FROM CloudMind.Posts WHERE UserId=".$UserIdInt;
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }

    function removeNew($PostId){
        $ConnStr = new mysqli($this->ServernameStr, $this->DBUsernameStr, $this->DBPassStr, $this->DBnameStr);
        if ($ConnStr->connect_error) {
            die('Connection failed: ' . $ConnStr->connect_error);
        }
        $SqlStr = "UPDATE CloudMind.Posts SET NotOld= 0 WHERE PostId=".$PostId;
        if ($ConnStr->query($SqlStr) === TRUE) {
            if ($ConnStr->affected_rows > 0) {
                $ConnStr->close();
                return true;
            }
        }
        $ConnStr->close();
        return false;
    }
}