import axios from "axios";

const useSessionHook = () => {
  const getAllUserSessions = async () => {
    const output = await axios.post(
      `http://localhost/poker-planning/sessions/fetch-all`,
      { userId: JSON.parse(window.sessionStorage.getItem("user")).id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const createNewSession = async (formState) => {
    const output = await axios.post(
      `http://localhost/poker-planning/sessions/new-session`,
      {
        userId: JSON.parse(window.sessionStorage.getItem("user")).id,
        ...formState,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return output;
  };

  const getSession = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}`,
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

  const sessionClose = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/close`,
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

  const checkClosedSessionStatus = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/check-session-close`,
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

  return {
    getAllUserSessions,
    createNewSession,
    getSession,
    sessionClose,
    checkClosedSessionStatus,
  };
};

export default useSessionHook;
