<?php
class UserController {
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
        }

        function signIn() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                if (
                    !isset($data["email"])
                    || !isset($data["password"])
                    || empty(trim($data["email"]))
                    || empty(trim($data["password"]))
                ) {
                    throw new Exception("All the fields must be set!!!");
                } else {
                    $fetch_user_by_email = "SELECT `id`, `username`, `password` FROM `users` WHERE `email`=?";
                    $query_stmt = $this->conn->prepare($fetch_user_by_email);
                    $query_stmt->bind_param('s', $data['email']);
                    $query_stmt->execute();
                    $result = $query_stmt->get_result();

                    if ($result->num_rows) {
                        $row = $result->fetch_assoc();
                        $check_password = password_verify($data['password'], $row['password']);
                        if ($check_password) {
                            header('HTTP/1.1 200 OK');
                            $response["message"] = "success";
                            $response["userName"] = $row['username'];
                            $response["userId"] = $row['id'];
                        } else {
                            header("HTTP/1.1 403 Forbidden");
                            throw new Exception("Email or password don't match", 1);
                        }
                    } else {
                        header("HTTP/1.1 403 Forbidden");
                        throw new Exception("Email doesn't match", 1);
                    }
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function signUp() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                if (
                    !isset($data["userName"])
                    || !isset($data["email"])
                    || !isset($data["password"])
                    || !isset($data["confirmPassword"])
                    || empty(trim($data["userName"]))
                    || empty(trim($data["email"]))
                    || empty(trim($data["password"]))
                    || empty(trim($data["confirmPassword"]))
                ) {
                    throw new Exception("All the fields must be set!!!");
                } else {
                    $password = $data["password"];
                    $confirmPassword = $data["confirmPassword"];
                    if ($password === $confirmPassword) {
                        $userName = $data["userName"];
                        $email = $data["email"];
                        $insert_query = "INSERT INTO `users` ( `userName`, `email`, `password`) VALUES (?, ?, ?)";
                        $insert_stmt = $this->conn->prepare($insert_query);
                        $strippedUsername = htmlspecialchars(strip_tags($userName));
                        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                        $insert_stmt->bind_param('sss', $strippedUsername, $email, $hashedPassword);
                        $insert_stmt->execute();

                        if($insert_stmt->affected_rows > 0) {
                            header("HTTP/1.1 200 OK");
                            $response = array('message'=> 'success');
                        } else {
                            header("HTTP/1.1 500 Server Error");
                            throw new Exception("Requested data couldn't be added", 1);
                        }
                    } else {
                        header("HTTP/1.1 403 Forbidden");
                        throw new Exception("Password and confirm password don't match");
                    }
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function signOut() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $fetch_moderator_session = "SELECT session_id FROM `participants` WHERE user_id=? AND role=?";
                $query_stmt = $this->conn->prepare($fetch_moderator_session);
                $session_role = 'moderator';
                $query_stmt->bind_param('ss', $data['userId'], $session_role);
                $query_stmt->execute();
                $result = $query_stmt->get_result();
                if ($result->num_rows) {
                    $response["rows"] = array();
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    $i = 1;
                    foreach ($rows as $row) {
                        $update_session_status = "UPDATE `sessions` SET status=? where id=?";
                        $next_query_stmt = $this->conn->prepare($update_session_status);
                        $status = "closed";
                        $next_query_stmt->bind_param('ss', $row['id'], $status);
                        $next_query_stmt->execute();
                        if ($next_query_stmt->affected_rows > 0) {
                            $response["message"."$i"] = "success";
                        }
                    }
                }

                $remove_from_participants = "DELETE FROM `participants` WHERE user_id=?";
                $new_query_stmt = $this->conn->prepare($remove_from_participants);
                $new_query_stmt->bind_param('s', $data['userId']);
                $new_query_stmt->execute();
                
                if ($new_query_stmt->affected_rows > 0) {
                    $response["message_n"] = "success";
                }

            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

}
?>
