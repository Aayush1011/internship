<?php
    function OpenCon() {
        $dbhost = "localhost";
        $dbuser = "aayush";
        $dbpass = "aayush";
        $db = "poker_planning";

        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn -> error);

        return $conn;
    }

    function CloseCon($conn) {
        $conn->close();
    }
?>