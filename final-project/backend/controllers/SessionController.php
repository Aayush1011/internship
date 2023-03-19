<?php
    class SessionController {
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
        }

        function fetchAllData() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                $fetch_session_by_user = "SELECT sessions.id, sessions.name, sessions.description, sessions.status FROM `sessions` INNER JOIN `participants` ON participants.session_id = sessions.id WHERE participants.user_id=? AND participants.role=?";
                $query_stmt = $this->conn->prepare($fetch_session_by_user);
                $session_role = 'moderator';
                $query_stmt->bind_param('ss', $data['userId'], $session_role);
                $query_stmt->execute();
                $result = $query_stmt->get_result();
                if ($result->num_rows) {
                    $response["rows"] = array();
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    foreach ($rows as $row) {
                        $fetch_session_members = "SELECT COUNT(user_id) as member_count FROM `participants` WHERE session_id=?";
                        $query_stmt = $this->conn->prepare($fetch_session_members);
                        $query_stmt->bind_param('s', $row['id']);
                        $query_stmt->execute();
                        $result = $query_stmt->get_result();
                        $row['count'] = $result->fetch_assoc()['member_count'];
                        array_push($response["rows"], $row);
                    }
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'no past sessions found';
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function createSession() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                if (
                    !isset($data["name"])
                    || !isset($data["description"])
                    || empty(trim($data["name"]))
                    || empty(trim($data["description"]))
                ) {
                    throw new Exception("All the fields must be set!!!");
                } else {
                    $session_id_query = "SELECT UUID() as uuid";
                    $session_id_result = $this->conn->query($session_id_query);
                    $id_value = mysqli_fetch_assoc($session_id_result);
                    $session_id = $id_value['uuid'];

                    $insert_into_session = "INSERT INTO `sessions` (`id`, `name`, `description`, `status`) VALUES (?, ?, ?, ?)";
                    $query_stmt = $this->conn->prepare($insert_into_session);
                    $session_state = 'active';
                    $query_stmt->bind_param('ssss', $session_id, $data['name'], $data['description'], $session_state);
                    $query_stmt->execute();

                    if ($query_stmt->affected_rows > 0) {
                        $insert_into_participants = "INSERT INTO `participants` (`user_id`, `session_id`, `role`) VALUES (?, ?, ?)";
                        $new_query_stmt = $this->conn->prepare($insert_into_participants);
                        $session_role = 'moderator';
                        $new_query_stmt->bind_param('sss', $data['userId'], $session_id, $session_role);
                        $new_query_stmt->execute();
                        $result = $new_query_stmt->get_result();

                        if ($new_query_stmt->affected_rows > 0) {
                            header('HTTP/1.1 200 OK');
                            $response['sessionId'] = $session_id;
                            $response['message'] = 'success';
                        } else {
                            header('HTTP/1.1 500 Internal Server Error');
                            throw new Exception("Failed to add moderator to session");
                        }
                    } else {
                        header('HTTP/1.1 500 Internal Server Error');
                        throw new Exception("Failed to create new session");
                    }
                }    
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function checkSessionId() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                $check_session = "SELECT name, description FROM `sessions` WHERE id=?";
                $new_query_stmt = $this->conn->prepare($check_session);
                $new_query_stmt->bind_param('s', $data['sessionId']);
                $new_query_stmt->execute();
                $result = $new_query_stmt->get_result();
                
                if ($result->num_rows) {
                    header('HTTP/1.1 200 OK');
                    $row = $result->fetch_assoc();
                    $response["name"] = $row["name"];
                    $response["description"] = $row["description"];
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 404 Not Found');
                    throw new Exception("Requested session could not be found");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            return $response;
        }

}
?>