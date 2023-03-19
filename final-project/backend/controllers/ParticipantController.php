<?php
    class ParticipantController {
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
        }

        function addMember() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $insert_into_participants = "INSERT INTO `participants` (`user_id`, `session_id`, `role`) VALUES (?, ?, ?)";
                $new_query_stmt = $this->conn->prepare($insert_into_participants);
                $session_role = 'member';
                $new_query_stmt->bind_param('sss', $data['userId'], $data['sessionId'], $session_role);
                $new_query_stmt->execute();
                $result = $new_query_stmt->get_result();

                if ($new_query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 500 Internal Server Error');
                    throw new Exception("Failed to add member to session");
                } 
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function fetchSessionParticipants() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                
                $select_participants = "SELECT users.username, participants.role FROM `participants` INNER JOIN `users` ON participants.user_id=users.id WHERE participants.session_id=? AND participants.role!=?";
                $new_query_stmt = $this->conn->prepare($select_participants);
                $role = "moderator";
                $new_query_stmt->bind_param('ss', $data['sessionId'], $role);
                $new_query_stmt->execute();
                $result = $new_query_stmt->get_result();
                if ($result->num_rows) {
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    $response["rows"] = $rows;
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'no users joined yet';
                }

            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function fetchModerator() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                
                $select_participants = "SELECT users.username, participants.role FROM `participants` INNER JOIN `users` ON participants.user_id=users.id WHERE participants.session_id=? AND participants.role=?";
                $new_query_stmt = $this->conn->prepare($select_participants);
                $role = "moderator";
                $new_query_stmt->bind_param('ss', $data['sessionId'], $role);
                $new_query_stmt->execute();
                $result = $new_query_stmt->get_result();
                if ($result->num_rows) {
                    $row = $result->fetch_assoc();
                    $response = $row;
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 404 Not Found');
                    $response['message'] = 'moderator could not be found';
                }

            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }
    }