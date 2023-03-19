<?php
    class StoryController {
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
        }

        function addStory() {
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
                    $insert_into_story = "INSERT INTO `stories` (`session_id`, `name`, `description`, `status`) VALUES (?, ?, ?, ?)";
                    $query_stmt = $this->conn->prepare($insert_into_story);
                    $story_state = 'pending';
                    $query_stmt->bind_param('ssss', $data["sessionId"], $data['name'], $data['description'], $story_state);
                    $query_stmt->execute();
                    if ($query_stmt->affected_rows > 0) {
                        header('HTTP/1.1 200 OK');
                        $response['message'] = 'success';
                    } else {
                        header('HTTP/1.1 500 Internal Server Error');
                        throw new Exception("Failed to add new session");
                    }
                }    
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function fetchSessionStories() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                $get_stories = "SELECT id, name, description, status FROM `stories` WHERE session_id=?";
                $new_query_stmt = $this->conn->prepare($get_stories);
                $new_query_stmt->bind_param('s', $data['sessionId']);
                $new_query_stmt->execute();
                $result = $new_query_stmt->get_result();
                
                if ($result->num_rows) {
                    header('HTTP/1.1 200 OK');
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    $response["rows"] = $rows;
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 200 OK');
                    throw new Exception("no new stories added");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function editStory() {
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
                    $edit_story = "UPDATE `stories` SET name=?, description=? WHERE id=? AND session_id=?";
                    $query_stmt = $this->conn->prepare($edit_story);
                    $query_stmt->bind_param('ssss', $data['name'], $data['description'], $data["editId"], $data["sessionId"]);
                    $query_stmt->execute();
                    if ($query_stmt->affected_rows > 0) {
                        header('HTTP/1.1 200 OK');
                        $response['message'] = 'success';
                    } else {
                        header('HTTP/1.1 500 Internal Server Error');
                        throw new Exception("Failed to edit story");
                    }
                }    
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function deleteStory() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $delete_story = "DELETE FROM `stories` WHERE id=? AND session_id=?";
                $query_stmt = $this->conn->prepare($delete_story);
                $query_stmt->bind_param('ss', $data["deleteId"], $data["sessionId"]);
                $query_stmt->execute();

                if ($query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 500 Internal Server Error');
                    throw new Exception("Failed to delete story");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function activateStory() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $find_activated_story = "SELECT id, session_id FROM `stories` WHERE status=?";
                $query_stmt = $this->conn->prepare($find_activated_story);
                $status = "active";
                $query_stmt->bind_param('s', $status);
                $query_stmt->execute();
                $result = $query_stmt->get_result();

                if ($result->num_rows > 0){
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    foreach ($rows as $row) {
                        $close_story = "UPDATE `stories` SET status=? WHERE id=? AND session_id=?";
                        $next_query_stmt = $this->conn->prepare($close_story);
                        $status = "closed";
                        $next_query_stmt->bind_param('sss', $status, $row["id"], $row["session_id"]);
                        $next_query_stmt->execute();
                    }
                }

                $activate_story ="UPDATE `stories` SET status=? WHERE id=? AND session_id=?";
                $new_query_stmt = $this->conn->prepare($activate_story);
                $status = "active";
                $new_query_stmt->bind_param('sss', $status, $data["storyId"], $data["sessionId"]);
                $new_query_stmt->execute();

                if ($new_query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 500 Internal Server Error');
                    throw new Exception("Failed to activate story");
                }

            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function pauseStory() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $pause_story = "UPDATE `stories` SET status=? WHERE id=? AND session_id=?";
                $next_query_stmt = $this->conn->prepare($pause_story);
                $status = "pending";
                $next_query_stmt->bind_param('sss', $status, $data["storyId"], $data["sessionId"]);
                $next_query_stmt->execute();

                if ($next_query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 500 Internal Server Error');
                    throw new Exception("Failed to activate story");
                }

            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);    
        }

        function closeStory() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $pause_story = "UPDATE `stories` SET status=? WHERE id=? AND session_id=?";
                $next_query_stmt = $this->conn->prepare($pause_story);
                $status = "closed";
                $next_query_stmt->bind_param('sss', $status, $data["storyId"], $data["sessionId"]);
                $next_query_stmt->execute();

                if ($new_query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 500 Internal Server Error');
                    throw new Exception("Failed to activate story");
                }
                
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);    
        }
    }
?>