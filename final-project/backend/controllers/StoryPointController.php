<?php
    class StoryPointController {
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
        }

        function addStoryPoint() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $find_story_point = "SELECT points FROM `story_points` WHERE session_id=? AND user_id=? AND story_id=?";
                $query_stmt = $this->conn->prepare($find_story_point);
                $query_stmt->bind_param('sss', $data["sessionId"], $data['userId'], $data['storyId']);
                $query_stmt->execute();
                $result = $query_stmt->get_result();

                if ($result->num_rows > 0) {
                    $update_story_point = "UPDATE `story_points` SET points=?, status=? WHERE session_id=? AND user_id=? AND story_id=?";
                    $next_query_stmt = $this->conn->prepare($update_story_point);
                    $status = "pending";
                    $next_query_stmt->bind_param('sssss', $data["storyPoint"], $status, $data["sessionId"], $data['userId'], $data['storyId']);
                    $next_query_stmt->execute();

                    if ($next_query_stmt->affected_rows > 0) {
                        header('HTTP/1.1 200 OK');
                        $response['message'] = 'updated';
                    } else {
                        header('HTTP/1.1 500 Internal Server Error');
                        throw new Exception("Failed to update story point");
                    }
                } else {
                    $insert_into_story_points = "INSERT INTO `story_points` (`session_id`, `user_id`, `story_id`, `points`) VALUES (?, ?, ?, ?)";
                    $new_query_stmt = $this->conn->prepare($insert_into_story_points);
                    $new_query_stmt->bind_param('ssss', $data["sessionId"], $data['userId'], $data['storyId'], $data["storyPoint"]);
                    $new_query_stmt->execute();
                    if ($new_query_stmt->affected_rows > 0) {
                        header('HTTP/1.1 200 OK');
                        $response['message'] = 'added';
                    } else {
                        header('HTTP/1.1 500 Internal Server Error');
                        throw new Exception("Failed to add new story point");
                    }
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);    
        }

        function setActiveStoryPoints() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $find_story_points = "SELECT session_id, story_id FROM `story_points` WHERE session_id=? AND story_id=?";
                $query_stmt = $this->conn->prepare($find_story_points);
                $query_stmt->bind_param('ss', $data["sessionId"], $data['storyId']);
                $query_stmt->execute();
                $result = $query_stmt->get_result();

                if ($result->num_rows > 0){
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    foreach ($rows as $row) {
                        $active_story_points = "UPDATE `story_points` SET status=? WHERE story_points.session_id=? AND story_points.story_id=?";
                        $new_query_stmt = $this->conn->prepare($active_story_points);
                        $status = "active";
                        $new_query_stmt->bind_param('sss', $status, $row["session_id"], $row['story_id']);
                        $new_query_stmt->execute();

                        if ($new_query_stmt->affected_rows > 0) {
                            header('HTTP/1.1 200 OK');
                            $response['message'] = 'success';
                        }
                    }
                } else {
                    header('HTTP/1.1 200 OK');
                    throw new Exception("No one has voted yet!!!");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }
       

        function getActiveStoryPoints() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $find_story_points = "SELECT users.username, story_points.points, story_points.story_id FROM `story_points` INNER JOIN `users` ON story_points.user_id=users.id WHERE story_points.session_id=? AND story_points.status=?";
                $query_stmt = $this->conn->prepare($find_story_points);
                $status = "active";
                $query_stmt->bind_param('ss', $data["sessionId"], $status);
                $query_stmt->execute();
                $result = $query_stmt->get_result();
                if ($result->num_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $rows = $result->fetch_all(MYSQLI_ASSOC);
                    $response["rows"] = $rows;
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 200 OK');
                    throw new Exception("Unable to fetch story points");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function resetStoryPoints() {
            $response = array();
            try {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $delete_story_points = "DELETE FROM `story_points` WHERE session_id=? AND story_id=?";
                $query_stmt = $this->conn->prepare($delete_story_points);
                $query_stmt->bind_param('ss', $data["sessionId"], $data['storyId']);
                $query_stmt->execute();

                if ($query_stmt->affected_rows > 0) {
                    header('HTTP/1.1 200 OK');
                    $response['message'] = 'success';
                } else {
                    header('HTTP/1.1 200 OK');
                    throw new Exception("Unable to reset story points");
                }
            } catch(Exception $e) {
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }
}    
?>