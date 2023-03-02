<?php
if(isset($_GET["id"]) && !empty($_GET["id"])){
    require_once "conn.php";
    $conn = OpenCon();
    $param_id = trim($_GET["id"]);
    $sql = "DELETE FROM `banddata` WHERE id = '$param_id'";
    $result = $conn->query($sql);
    if ($result) {
        header("location: banddata.php");
    } else {
        echo "error";
    }
    
    $mysqli->close();
} else {
    echo "error";
}
?>