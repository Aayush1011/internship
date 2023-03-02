<?php
    require_once "conn.php";

    class BandController {
        private $request_uri;
        private $uris;
        private $conn;

        function __construct() {
            $this->conn = OpenCon();
            $this->request_uri = $_SERVER['REQUEST_URI'];
            $this->uris = explode('/', $this->request_uri);
            $this->uris = array_values(array_filter($this->uris));
        }

        function fetchData($id=NULL) {
            $response = array();
            try {
                if ($id) {
                    $sql = "SELECT * FROM `banddata` WHERE `id`='$id'";
                } else {
                    $sql = "SELECT * FROM `banddata`";
                }
                $result = $this->conn->query($sql);
                if ($result->num_rows > 0) {
                    if ($id) {
                        $response = $result->fetch_assoc();
                    } else {
                        $response = $result->fetch_all(MYSQLI_ASSOC);
                    }
                    header('HTTP/1.1 200 OK');
                } else {
                    throw new Exception("Requested data couldn't be found", 1);
                }
            } catch(Exception $e) {
                header("HTTP/1.1 500 Server Error");
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function postData() {
            $response = array();
            try {
                $bandName = $_POST["bandName"];
                $countryOfOrigin = $_POST["countryOfOrigin"];
                $yearFormed = $_POST["yearFormed"];
                $status = $_POST["status"];
                $about = $_POST["about"];
                $sql = "INSERT INTO `banddata` ( `bandName`, `countryOfOrigin`, 
                    `yearFormed`, `status`, `about`) VALUES ('$bandName', 
                    '$countryOfOrigin', '$yearFormed', '$status', '$about')";
                $result = $this->conn->query($sql);
                if($result) {
                    header("HTTP/1.1 200 OK");
                    $response = array('message'=> 'success');
                } else {
                    throw new Exception("Requested data couldn't be added", 1);
                }
            } catch(Exception $e) {
                header("HTTP/1.1 500 Server Error");
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function updateData($id=NULL) {
            $response = array();
            $postData = array();
            $data = urldecode(file_get_contents('php://input'));
            $eachData = explode('&', $data);
            foreach ($eachData as $value) {
                $temp = explode("=", $value);
                $postData[$temp[0]] = $temp[1];
            }
            try {
                $bandName = $postData["bandName"];
                $countryOfOrigin = $postData["countryOfOrigin"];
                $yearFormed = $postData["yearFormed"];
                $status = $postData["status"];
                $about = $postData["about"];
                $sql = "UPDATE `banddata` SET `bandName`='$bandName', 
                `countryOfOrigin`='$countryOfOrigin', `yearFormed`='$yearFormed', 
                `status`='$status', `about`='$about' WHERE `id`='$id'";
                $result = $this->conn->query($sql);
                if($result) {
                    header("HTTP/1.1 200 OK");
                    $response = array('message'=> 'success');
                } else {
                    throw new Exception("Requested data couldn't be updated", 1);
                }
            } catch(Exception $e) {
                header("HTTP/1.1 500 Server Error");
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function deleteData($id=NULL) {
            try {
                if ($id) {
                    $sql = "DELETE FROM `banddata` WHERE `id`='$id'";
                } else {
                    $sql = "DELETE FROM `banddata`";
                }
                $result = $this->conn->query($sql);
                if($result) {
                    header("HTTP/1.1 200 OK");
                    $response = array('message'=> 'success');
                } else {
                    throw new Exception("Requested data couldn't be deleted", 1);
                }
            } catch(Exception $e) {
                header("HTTP/1.1 500 Server Error");
                $response = array('message'=> $e->getMessage());
            }
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode($response);
        }

        function errorResponse() {
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("message" => "Not Found"));
        }

        function checkMethod() {
            $result = $response = array();
            if (count($this->uris) > 1) {
                $id = $this->uris[1];
                switch($_SERVER['REQUEST_METHOD']) {
                    case 'GET':
                        $this->fetchData($id);
                        break;
                    case 'PUT':
                        $this->updateData($id);
                        break;
                    case 'DELETE':
                        $this->deleteData($id);
                        break;
                    default:
                        $this->errorResponse();
                        break;
                       
            }
        } else {
            switch ($this->uris[0]) {
                case 'bandapi':
                    switch($_SERVER['REQUEST_METHOD']) {
                        case 'GET':
                            $this->fetchData();
                            break;
                        case 'POST':
                            $this->postData();
                            break;
                        case 'DELETE':
                            $this->deleteData();
                            break;
                        default:
                            $this->errorResponse();
                    }
            }
        }

    }
}

    function main() {
        $newBandController = new BandController();
        $newBandController->checkMethod();
    }

    main();
?>