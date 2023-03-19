import axios from "axios";

const useStoryPointHook = () => {
  const addStoryPoint = async (sessionId, storyId, storyPoint) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/add-story-point`,
      {
        sessionId,
        storyId,
        userId: JSON.parse(window.sessionStorage.getItem("user")).id,
        storyPoint,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const setActiveStoryPoints = async (sessionId, storyId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/set-active-story-points`,
      {
        sessionId,
        storyId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const getActiveStoryPoints = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/get-active-story-points`,
      {
        sessionId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const resetStoryPoints = async (sessionId, storyId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/reset-story-points`,
      {
        sessionId,
        storyId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  return {
    addStoryPoint,
    setActiveStoryPoints,
    getActiveStoryPoints,
    resetStoryPoints,
  };
};

export default useStoryPointHook;
