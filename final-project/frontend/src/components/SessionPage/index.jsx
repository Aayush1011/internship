import { useEffect, useState } from "react";

import useStoryHook from "../../hooks/useStoryHook";
import useParticipantHook from "../../hooks/useParticipantHook";
import useStoryPointHook from "../../hooks/useStoryPointHook";
import useSessionHook from "../../hooks/useSessionHook";
import ButtonComponent from "../ButtonComponent";
import TextAreaComponent from "../TextAreaComponent";
import InputComponent from "../InputComponent";
import TopBar from "../TopBar";

import { MdClose, MdOutlineContentCopy } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SessionPage = () => {
  const sessionId = useParams("id");
  const navigate = useNavigate();

  const {
    addStory,
    fetchSessionStories,
    modifyStory,
    removeStory,
    initiateStoryVoting,
    closeStory,
    pauseStory,
  } = useStoryHook();

  const {
    addStoryPoint,
    setActiveStoryPoints,
    getActiveStoryPoints,
    resetStoryPoints,
  } = useStoryPointHook();

  const { fetchSessionParticipants, fetchModerator } = useParticipantHook();
  const { sessionClose, checkClosedSessionStatus } = useSessionHook();
  const [showRightMenu, setShowRightMenu] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({});
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [stories, setStories] = useState([]);
  const [sessionParticipants, setSessionParticipants] = useState([]);
  const [moderator, setModerator] = useState({});
  const [formState, setFormState] = useState({});
  const [showStoryButtons, setShowStoryButtons] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [activateStoryModal, setActivateStoryModal] = useState(false);
  const [currentStoryDetails, setCurrentStoryDetails] = useState({});
  const [activeStoryPoint, setActiveStoryPoint] = useState(null);
  const [storyPointVotes, setStoryPointVotes] = useState([]);

  useEffect(() => {
    setSessionDetails(JSON.parse(localStorage.getItem("sessionDetails")));
    fetchModerator(sessionId.id).then((result) => {
      if (result.data.message === "success") {
        setModerator({
          userName: result.data.username,
          role: result.data.role,
        });
      }
    });
    const interval = setInterval(() => {
      checkClosedSessionStatus(sessionId.id).then((result) => {
        if (result.data.message === "success") {
          navigate("/home");
        }
      });
      fetchSessionParticipants(sessionId.id).then((result) => {
        if (result.data.message === "success") {
          setSessionParticipants([...result.data.rows]);
        } else {
          setSessionParticipants([]);
        }
      });
      fetchSessionStories(sessionId.id).then((result) => {
        if (result.data.message === "success") {
          setStories([...result.data.rows]);
          const activeRow = result.data.rows.find(
            (row) => row.status === "active"
          );
          if (activeRow) {
            setCurrentStoryDetails({ ...activeRow });
            setActivateStoryModal(true);
          } else {
            setCurrentStoryDetails({});
            setActivateStoryModal(false);
            setActiveStoryPoint(null);
          }
        }
      });
      getActiveStoryPoints(sessionId.id).then((result) => {
        if (result.data.message === "success") {
          setStoryPointVotes([...result.data.rows]);
        } else {
          setStoryPointVotes([]);
        }
      });
      return () => {
        clearInterval(interval);
      };
    }, 15000);
  }, []);

  const onMenuClick = () => {
    setShowRightMenu(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const toggleStoryForm = () => {
    setShowStoryForm((previousState) => !previousState);
  };

  const addNewStory = () => {
    addStory(sessionDetails.sessionId, formState).then((result) => {
      if (result.data.message === "success") {
        setStories((previousStories) => [
          {
            id: result.data.id,
            name: formState.storyName,
            description: formState["Story Details"],
          },
          ...previousStories,
        ]);
        toggleStoryForm();
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast.success("Session link copied");
      },
      () => {
        toast.error("Could not copy to clipboard");
      }
    );
  };

  const toggleStoryButtons = (e, storyId) => {
    e.stopPropagation();
    setShowStoryButtons((previousValue) =>
      previousValue === storyId ? null : storyId
    );
  };

  const activateStory = (Event, story) => {
    Event.stopPropagation();
    initiateStoryVoting(sessionId.id, story.id).then((result) => {
      if (result.data.message === "success") {
        toast.success("Story activated");
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const suspendStory = () => {
    pauseStory(sessionId.id, currentStoryDetails.id).then((result) => {
      if (result.data.message === "success") {
        console.log(result.data.message);
      }
    });
  };

  const editStory = (Event, story) => {
    Event.stopPropagation();
    setFormState({ storyName: story.name, "Story Details": story.description });
    setEditId(story.id);
    setEditMode(true);
    setShowStoryForm(true);
  };

  const completeEditStory = () => {
    modifyStory(sessionId.id, editId, formState).then((result) => {
      if (result.data.message === "success") {
        setEditMode(false);
        setFormState({});
        toast.success("Story edited successfully");
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const deleteStory = (Event, deleteId) => {
    Event.stopPropagation();
    removeStory(sessionId.id, deleteId).then((result) => {
      if (result.data.message === "success") {
        setStories((previousStories) =>
          previousStories.filter((story) => story.id !== deleteId)
        );
        toast.success("Story successfully deleted");
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const submitStoryPoint = () => {
    addStoryPoint(
      sessionId.id,
      currentStoryDetails.id,
      eval(activeStoryPoint)
    ).then((result) => {
      if (result.data.message === "added") {
        toast.success("Story point successfully submitted");
      } else if (result.data.message === "updated") {
        toast.success("Story point successfully updated");
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const revealStoryPoints = () => {
    setActiveStoryPoints(sessionId.id, currentStoryDetails.id).then(
      (result) => {
        console.log(result.data.message);
      }
    );
  };

  const restartVoting = () => {
    resetStoryPoints(sessionId.id, currentStoryDetails.id).then((result) => {
      console.log(result.data.message);
    });
  };

  const saveVotes = () => {
    closeStory(sessionId.id, currentStoryDetails.id).then((result) => {
      console.log(result.data.message);
    });
  };

  const closeSession = () => {
    sessionClose(sessionId.id).then((result) => {
      console.log(result.data.message);
    });
  };

  return (
    <>
      <TopBar onMenuClick={onMenuClick} />
      <div className="session-page">
        <div className="session-page_info">
          <div className="session-page_title">
            <h1 className="session-page_title-name">
              Session Name:{" "}
              <span className="session-page_title-content">
                {sessionDetails.name}
              </span>
            </h1>
          </div>
          <div className="session-page_description">
            <p className="session-page_description-name">Description:</p>
            <p className="session-page_description-content">
              {sessionDetails.description}
            </p>
          </div>
          <div className="session-page_link" onClick={copyToClipboard}>
            <p>
              Invite Members:{" "}
              <span className="session-page_link-actual">
                {window.location.href}
              </span>
            </p>
            <MdOutlineContentCopy />
          </div>
          {moderator.userName ===
            JSON.parse(window.sessionStorage.getItem("user")).userName && (
            <div className="session-page_add-story">
              <ButtonComponent
                text={showStoryForm ? "Close" : "Add New Story"}
                colorClass={showStoryForm ? "button--error" : "button--success"}
                callback={toggleStoryForm}
                className="session-page_story-button"
              />
            </div>
          )}
          {showStoryForm && (
            <div className="session-page_story-form">
              <form onSubmit={(e) => e.preventDefault()}>
                <InputComponent
                  inputName="storyName"
                  inputType="text"
                  inputLabel="Story Name"
                  value={formState.storyName}
                  onChange={handleChange}
                />
                <TextAreaComponent
                  label="Story Details"
                  textAreaChange={handleChange}
                  textAreaValue={formState["Story Details"]}
                />
                <div className="session-page_story-buttons">
                  <ButtonComponent
                    text={editMode ? "Edit" : "Add"}
                    colorClass={editMode ? "button--orange" : "button--success"}
                    callback={editMode ? completeEditStory : addNewStory}
                    className="session-page_story-button"
                  />
                </div>
              </form>
            </div>
          )}
          <div className="session-page_stories">
            <p className="session-page_stories-title">Stories</p>
            {stories.length > 0 ? (
              stories.map((story) => {
                return (
                  <div
                    className="session-page_story-container"
                    onClick={(Event) =>
                      moderator.userName ===
                      JSON.parse(window.sessionStorage.getItem("user")).userName
                        ? toggleStoryButtons(Event, story.id)
                        : undefined
                    }
                  >
                    <p className="session-page_story-name">{story.name}</p>
                    <p className="session-page_story-description">
                      {story.description}
                    </p>
                    {showStoryButtons === story.id && (
                      <div className="session-page_story-buttons">
                        <ButtonComponent
                          text={story.status === "closed" ? "View" : "Vote"}
                          colorClass="button--success"
                          callback={(Event) => activateStory(Event, story)}
                        />
                        {story.status !== "closed" && (
                          <>
                            <ButtonComponent
                              text="Edit"
                              colorClass="button--orange"
                              callback={(Event) => editStory(Event, story)}
                            />
                            <ButtonComponent
                              text="Delete"
                              colorClass="button--error"
                              callback={(Event) => deleteStory(Event, story.id)}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="session-page_rejection">No story added</p>
            )}
          </div>
        </div>
        <div
          className={`session-page_participants ${
            showRightMenu && "session-page_participants-tablet"
          }`}
        >
          <div
            className="session-page_participants-close"
            onClick={() => setShowRightMenu(false)}
          >
            <MdClose />
          </div>
          <h3 className="session-page_members">Participants</h3>
          <div className="session-page_participant">
            <p className="session-page_username">{moderator.userName}</p>
            <p className="session-page_role">{moderator.role}</p>
          </div>
          {sessionParticipants.length > 0 &&
            sessionParticipants.map((participant) => (
              <div className="session-page_participant">
                <p className="session-page_username">{participant.username}</p>
                <p className="session-page_role">{participant.role}</p>
              </div>
            ))}
          <ButtonComponent
            text="Close Session"
            colorClass="button--error"
            callback={closeSession}
          />
        </div>
      </div>
      {activateStoryModal && (
        <div className="session-page_modal">
          <div className="session-page_modal-container">
            {moderator.userName ===
              JSON.parse(window.sessionStorage.getItem("user")).userName && (
              <div className="session-page_modal-close" onClick={suspendStory}>
                <MdClose />
              </div>
            )}
            <h1 className="session-page_modal-title">
              {currentStoryDetails.name}
            </h1>
            <p className="session-page_modal-description">
              {currentStoryDetails.description}
            </p>
            {currentStoryDetails.status !== "closed" && (
              <>
                <div className="session-page_modal-points">
                  {[0, "1 / 2", 2, 3, 5, 8, 13, 20, 40, 100, 200].map(
                    (storyPoint) => (
                      <div
                        className={`session-page_modal-point ${
                          activeStoryPoint === storyPoint &&
                          "session-page_modal-point--active"
                        }`}
                        onClick={() => setActiveStoryPoint(storyPoint)}
                      >
                        {storyPoint}
                      </div>
                    )
                  )}
                </div>
                <div className="session-page_modal-buttons">
                  <ButtonComponent
                    text="Submit"
                    colorClass="button--success"
                    callback={submitStoryPoint}
                    disabled={activeStoryPoint === null && true}
                  />
                  {moderator.userName ===
                    JSON.parse(window.sessionStorage.getItem("user"))
                      .userName && (
                    <ButtonComponent
                      text="Reveal"
                      colorClass="button--orange"
                      callback={revealStoryPoints}
                    />
                  )}
                </div>
              </>
            )}
            {storyPointVotes.filter(
              (vote) => vote.story_id === currentStoryDetails.id
            ).length > 0 && (
              <div className="session-page_modal-value">
                <p className="session-page_modal-title">Story Points</p>
                <div className="session-page_modal-bottom">
                  <div className="session-page_modal-table">
                    <div className="session-page_modal-single session-page_modal-single--title">
                      <p className="session-page_modal-name">User</p>
                      <p className="session-page_modal-name">Story Point</p>
                    </div>
                    {storyPointVotes
                      .filter(
                        (vote) => vote.story_id === currentStoryDetails.id
                      )
                      .map((vote) => {
                        return (
                          <div className="session-page_modal-single">
                            <p className="session-page_modal-name">
                              {vote.username}
                            </p>
                            <p className="session-page_modal-vote">
                              {vote.points}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  {moderator.userName ===
                    JSON.parse(window.sessionStorage.getItem("user"))
                      .userName &&
                    currentStoryDetails.status !== "closed" && (
                      <div className="session-page_modal-end">
                        <ButtonComponent
                          text="Save"
                          colorClass="button--success"
                          callback={saveVotes}
                        />
                        <ButtonComponent
                          text="Restart"
                          colorClass="button--orange"
                          callback={restartVoting}
                        />
                      </div>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SessionPage;
