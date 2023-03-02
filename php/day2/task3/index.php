<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once 'conn.php';
    
    class SignUp {
        private $conn;
        private $email;
        private $username;
        private $password;
        private $confirmPassword;
        private $hashedPassword;
        private $hashedConfirmPassword;
        
        function __construct($conn, $email, $username, $password, $confirmPassword) {
            $this->conn = $conn;
            $this->email = $email;
            $this->username = $username;
            $this->password = $password;
            $this->confirmPassword = $confirmPassword;
        }
        
        function __destruct() {
            $this->conn->close();
        }
        
        function checkNewUsernameAndEmail() {
            $sql = "SELECT 'id' FROM users WHERE username='$this->username' OR email='$this->email'";
            $result = $this->conn->query($sql);
            return $result->num_rows == 0;
        }
        
        function checkPasswordsMatch() {
            return $this->password == $this->confirmPassword;
        }

        function hashPasswords() {
            $this->hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
            $this->hashedConfirmPassword = password_hash($this->confirmPassword, PASSWORD_DEFAULT);                    
        }
        
        function insertIntoTable() {
            $sql = "INSERT INTO `users` ( `email`, `username`, `password`, `confirmPassword`) VALUES ('$this->email', '$this->username', '$this->hashedPassword', '$this->hashedConfirmPassword')";
            return $this->conn->query($sql);
        }
    }
    
    function main() {
        $conn = OpenCon();
        $newSignUp = new SignUp($conn, $_POST["email"], $_POST["username"], $_POST["password"], $_POST["confirmPassword"]);
        if ($newSignUp->checkNewUsernameAndEmail()) {
            if ($newSignUp->checkPasswordsMatch()) {
                $newSignUp->hashPasswords();
                $result = $newSignUp->insertIntoTable();

                if ($result) {
                    header("Location: login.html");
                }
            } else { 
            echo "<div>Password and confirm password is not same</div>"; 
        }      
        } else {
            echo "<div>Username or email not available</div>"; 
        }
    }

    main();

}
?>