<?php 
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        require_once "conn.php";

        class LogIn {
            private $conn;
            private $email;
            private $password;

            function __construct($conn, $email, $password) {
                $this->conn = $conn;
                $this->email = $email;
                $this->password = $password;
            }

            function __destruct() {
                $this->conn->close();
            }

            function checkEmailAndPasswordExist() {
                $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
                $sql = "SELECT `password` FROM `users` WHERE `email`='$this->email'";
                $result = $this->conn->query($sql);
                $row = $result->fetch_array();
                print($row["password"]);
                return password_verify($this->password, $hashedPassword);
            }
        }

        function main() {
            $conn = OpenCon();
            $newLogIn = new LogIn($conn, $_POST["email"], $_POST["password"]);
            if ($newLogIn->checkEmailAndPasswordExist()) {
                header("Location: banddata.php");
            } else {
                echo "<div>Email or password is incorrect</div>"; 
            }
        }

        main();
    }
?>