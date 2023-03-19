import axios from "axios";

const useUserHook = () => {
  const userCredentials = async (action, userData) => {
    const output = await axios.post(
      `http://localhost:80/poker-planning/user/${action}/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  const signOutHandler = async () => {
    const output = await axios.post(
      `http://localhost:80/poker-planning/user/sign-out/`,
      {
        userId: JSON.parse(window.sessionStorage.getItem("user")).id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return output;
  };

  return { userCredentials, signOutHandler };
};

export default useUserHook;
