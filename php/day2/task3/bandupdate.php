<?php
    require_once "conn.php";
    $conn = OpenCon();
    $id=$bandName = $countryOfOrigin = $yearFormed = $status = $about = "";
    if(isset($_POST["bandName"]) && !empty($_POST["bandName"])){
        $id =  trim($_GET["id"]);
        $bandName = trim($_POST["bandName"]);
        $countryOfOrigin = trim($_POST["countryOfOrigin"]);
        $yearFormed = trim($_POST["yearFormed"]);
        $status = trim($_POST["status"]);
        $about = trim($_POST["about"]);
        $sql = "UPDATE `banddata` SET `bandName`='$bandName', `countryOfOrigin`='$countryOfOrigin', `yearFormed`='$yearFormed', `status`='$status', `about`='$about' WHERE `id`='$id'";
        $result = $conn->query($sql);
        if ($result) {
            header('Location: banddata.php');
        }
    } else {
        if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
            $id =  trim($_GET["id"]);
            $sql = "SELECT * FROM banddata WHERE id = '$id'";
            $result = $conn->query($sql);
            $row = $result->fetch_array();
            $bandName = $row["bandName"];
            $countryOfOrigin = $row["countryOfOrigin"];
            $yearFormed = $row["yearFormed"];
            $status = $row["status"];
            $about = $row["about"];
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form method="post" action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>">
        <div>
            <label for="bandName">Band Name</label>
            <input type="text" id="bandName" name="bandName" value="<?php echo $bandName; ?>">
        </div>
        <div>
            <label for="countryOfOrigin">Country of Origin</label>
            <input type="text" id="countryOfOrigin" name="countryOfOrigin" value="<?php echo $countryOfOrigin; ?>">
        </div>
        <div>
            <label for="yearFormed">Formed in (Year):</label>
            <input type="number" min="1900" max="2099" step="1" placeholder="1999" id="yearFormed" name="yearFormed" value="<?php echo $yearFormed; ?>">
        </div>
        <div>
            <label for="status">Status</label>
            <select name="status" id="status">
                <option value="active">Active</option>
                <option value="disbanded">Disbanded</option>
                <option value="on hiatus">On hiatus</option>
            </select>
        </div>
        <div>
            <label for="about">About</label>
            <textarea name="about" id="about" cols="30" rows="10"><?php echo $about; ?></textarea>
        </div>
        <button type="submit">Submit</button>
    </form>
</body>
</html>