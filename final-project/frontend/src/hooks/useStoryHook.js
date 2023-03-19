import axios from "axios";

const useStoryHook = () => {
  const addStory = async (sessionId, formState) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/add-story`,
      {
        sessionId,
        name: formState.storyName,
        description: formState["Story Details"],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const fetchSessionStories = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/fetch-stories`,
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

  const modifyStory = async (sessionId, editId, formState) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/edit-story`,
      {
        sessionId,
        editId,
        name: formState.storyName,
        description: formState["Story Details"],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const removeStory = async (sessionId, deleteId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/delete-story`,
      {
        sessionId,
        deleteId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const initiateStoryVoting = async (sessionId, storyId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/activate-story`,
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

  const pauseStory = async (sessionId, storyId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/pause-story`,
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

  const closeStory = async (sessionId, storyId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/close-story`,
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
    addStory,
    fetchSessionStories,
    modifyStory,
    removeStory,
    initiateStoryVoting,
    closeStory,
    pauseStory,
  };
};

export default useStoryHook;
