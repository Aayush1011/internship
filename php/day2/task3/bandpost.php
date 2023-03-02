<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once 'conn.php';

    class BandData   {
        private $bandName;
        private $countryOfOrigin;
        private $yearFormed;
        private $status;
        private $about;

        function __construct($conn, $bandName, $countryOfOrigin, $yearFormed, $status, $about) {
            $this->conn = $conn;
            $this->bandName = $bandName;
            $this->countryOfOrigin = $countryOfOrigin;
            $this->yearFormed = $yearFormed;
            $this->status = $status;
            $this->about = $about;
        }

        function __destruct() {
            $this->conn->close();
        }

        function insertIntoTable() {
            $sql = "INSERT INTO `banddata` ( `bandName`, `countryOfOrigin`, 
                `yearFormed`, `status`, `about`) VALUES ('$this->bandName', 
                '$this->countryOfOrigin', '$this->yearFormed', '$this->status', '$this->about')";
            return $this->conn->query($sql);
        }
    }

    function main() {
        $conn = OpenCon();
        $newBand = new BandData($conn, $_POST["bandName"], $_POST["countryOfOrigin"], $_POST["yearFormed"], $_POST["status"], $_POST["about"]);
        $result = $newBand->insertIntoTable();
        if ($result) {
            header("Location: banddata.php");
        }
    }

    main();
}
?>