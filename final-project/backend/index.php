<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once "conn.php";
    require_once "./controllers/UserController.php";
    require_once "./controllers/SessionController.php";
    require_once "./controllers/ParticipantController.php";
    require_once "./controllers/StoryController.php";
    require_once "./controllers/StoryPointController.php";


    function checkEndpoint() {
        $request_uri = $_SERVER['REQUEST_URI'];
        $uris = explode('/', $request_uri);
        $uris = array_values(array_filter($uris));
        array_shift($uris);

        switch ($uris[0]) {
            case 'user':
                if (count($uris) > 1) {
                    $newUserController = new UserController();
                    if ($_SERVER['REQUEST_METHOD'] === "POST") {
                        switch ($uris[1]) {
                            case 'sign-up':
                                $newUserController->signUp();
                                return;
                            case 'sign-in':
                                $newUserController->signIn();
                                return;

                            case 'sign-out':
                                $newUserController->signOut();
                                return;
                        }        
                    }
                }
            
            case 'sessions':
                if (count($uris) > 1) {
                    $newSessionController = new SessionController();
                    if ($_SERVER['REQUEST_METHOD'] === "POST") {
                        switch ($uris[1]) {
                            case 'fetch-all':
                                $newSessionController->fetchAllData();
                                return;
                            case 'new-session':
                                $newSessionController->createSession();
                                return;
                        }
                    }
                }

            case 'session':
                if (count($uris) > 1) {
                    $newSessionController = new SessionController();
                    if ($_SERVER['REQUEST_METHOD'] === "POST") {
                        $sessionExists = $newSessionController->checkSessionId();
                        if ($sessionExists["message"] === "success" && count($uris) > 2) {
                            $newStoryController = new StoryController();
                            $newParticipantController = new ParticipantController();
                            $newStoryPointController = new StoryPointController();
                            switch ($uris[2]) {
                                case 'add-story':
                                    $newStoryController->addStory();
                                    return;
                                
                                case 'add-member':
                                    $newParticipantController->addMember();
                                    return;

                                case 'all-participants':
                                    $newParticipantController->fetchSessionParticipants();
                                    return;

                                case 'fetch-moderator':
                                    $newParticipantController->fetchModerator();
                                    return;

                                case 'fetch-stories':
                                    $newStoryController->fetchSessionStories();
                                    return;

                                case 'edit-story':
                                    $newStoryController->editStory();
                                    return;

                                case 'delete-story':
                                    $newStoryController->deleteStory();
                                    return;

                                case 'activate-story':
                                    $newStoryController->activateStory();
                                    return;

                                case 'add-story-point':
                                    $newStoryPointController->addStoryPoint();
                                    return;    

                                case 'set-active-story-points':
                                    $newStoryPointController->setActiveStoryPoints();
                                    return;

                                case 'get-active-story-points':
                                    $newStoryPointController->getActiveStoryPoints();
                                    return;

                                case 'reset-story-points':
                                    $newStoryPointController->resetStoryPoints();
                                    return;
                                
                                case 'pause-story':
                                    $newStoryController->pauseStory();
                                    return;

                                case 'close-story':
                                    $newStoryController->closeStory();
                                    return;

                                case 'close':
                                    $newSessionController->closeSession();
                                    return;

                                case 'check-session-close':
                                    $newSessionController->checkClosedSessionStatus();
                                    return;    
                                
                                default:
                                    # code...
                                    return;
                            }
                        } else {
                            echo json_encode($sessionExists);
                        }
                    }   
                }
        }
    }

    function main() {
        checkEndpoint();
    }

    main();
?>