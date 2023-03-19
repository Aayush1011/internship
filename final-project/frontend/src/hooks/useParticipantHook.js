import axios from "axios";

const useParticipantHook = () => {
  const addMember = async (sessionId, userId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/add-member`,
      {
        sessionId,
        userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return output;
  };

  const fetchSessionParticipants = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/all-participants`,
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

  const fetchModerator = async (sessionId) => {
    const output = await axios.post(
      `http://localhost/poker-planning/session/${sessionId}/fetch-moderator`,
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
    addMember,
    fetchSessionParticipants,
    fetchModerator,
  };
};

export default useParticipantHook;
