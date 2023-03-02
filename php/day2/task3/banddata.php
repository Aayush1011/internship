<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Band Details</title>
</head>
<body>
    <div>
        <h2>Band Details</h2>
        <a href="bandpost.html"><button>Add New Band</button></a>
    </div>

<?php 
    require_once "conn.php";
    
    class BandData {
        function fetchData() {
            $conn = OpenCon();
            $sql = "SELECT * FROM `banddata`";
            return $conn->query($sql);
        }
    }
    
    function main() {
        $newBandData = new BandData();
        $fetchedData = $newBandData->fetchData();
        if ($fetchedData->num_rows > 0) {
            echo '<table>';
                    echo "<thead>";
                        echo "<tr>";
                            echo "<th>#</th>";
                            echo "<th>Name</th>";
                            echo "<th>Year Formed</th>";
                            echo "<th>Country of Origin</th>";
                            echo "<th>Status</th>";
                            echo "<th>About</th>";
                        echo "</tr>";
                    echo "</thead>";
                    echo "<tbody>";
            while($row = $fetchedData->fetch_array()) {
                echo "<tr>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td>" . $row['bandName'] . "</td>";
                        echo "<td>" . $row['yearFormed'] . "</td>";
                        echo "<td>" . $row['countryOfOrigin'] . "</td>";
                        echo "<td>" . $row['status'] . "</td>";
                        echo "<td>" . $row['about'] . "</td>";
                        echo "<td>";
                        echo '<a href="bandupdate.php?id='. $row['id'] .'"><button>Update</button></a>';
                        echo '<a href="banddelete.php?id='. $row['id'] .'"><button>Delete</button></a>';
                        echo "</td>";
                echo "</tr>";
            }
                    echo "</tbody>";                            
            echo "</table>";
        } else {
            header("Location: bandpost.html");
        }
    }

    main();
?>
</body>
</html>
