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
      }
    );
    return output;
  };

  const getSession = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}`,
      {
        sessionId,
      }
    );
    return output;
  };

  return {
    getAllUserSessions,
    createNewSession,
    getSession,
  };
};

export default useSessionHook;
