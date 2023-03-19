import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";
import useUserHook from "../../hooks/useUserHook";
import useSessionHook from "../../hooks/useSessionHook";
import useParticipantHook from "../../hooks/useParticipantHook";

const LogInSignUp = () => {
  const { userCredentials } = useUserHook();
  const { getSession } = useSessionHook();
  const { addMember } = useParticipantHook();
  const [signUpState, setSignUpState] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signUpState) {
      setFormState((previousState) => ({
        ...previousState,
        fullName: "",
        confirmPassword: "",
      }));
      userCredentials("sign-in", {
        email: formState.email,
        password: formState.password,
      }).then((output) => {
        if (output.data.message === "success") {
          window.sessionStorage.setItem(
            "user",
            JSON.stringify({
              id: output.data.userId,
              userName: output.data.userName,
            })
          );
          toast.success("Logged in successfully");
          const sessionInfo = localStorage.getItem("sessionMember");
          if (sessionInfo) {
            getSession(sessionInfo).then((result) => {
              if (result.data.message === "success") {
                localStorage.setItem(
                  "sessionDetails",
                  JSON.stringify({
                    name: result.data.name,
                    description: result.data.description,
                    sessionInfo,
                  })
                );
                addMember(sessionInfo, output.data.userId).then((values) => {
                  if (values.data.message === "success") {
                    navigate(`/session/${sessionInfo}`, { replace: true });
                  }
                });
              }
            });
          } else {
            navigate("/home/", { replace: true });
          }
        } else {
          toast.error(output.data.message);
        }
      });
    } else {
      setFormState((previousState) => ({
        ...previousState,
        rememberMe: false,
      }));
      userCredentials("sign-up", {
        userName: formState.userName,
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
      })
        .then((result) => {
          if (result.data.message === "success") {
            toast.success("New user signed up");
            setSignUpState(false);
          } else {
            throw new Error(result.data.message);
          }
        })
        .catch((e) => {
          toast.error(e.message);
        });
    }
  };

  const toggleSignUpState = () => {
    setSignUpState((previousState) => !previousState);
  };

  return (
    <>
      {!window.sessionStorage.getItem("user") ? (
        <div className={`outerDiv ${signUpState && "outerDiv--reverse"}`}>
          <div
            className={`colorDiv colorDiv--${signUpState ? "blue" : "orange"}`}
          ></div>
          <div className="innerDiv">
            <form className="innerDiv__form" onSubmit={handleSubmit}>
              {signUpState && (
                <InputComponent
                  inputName="userName"
                  inputType="text"
                  inputLabel="username"
                  inputPlaceholder="username"
                  onChange={handleChange}
                />
              )}
              <InputComponent
                inputName="email"
                inputType="email"
                inputLabel="email"
                inputPlaceholder="email address"
                onChange={handleChange}
              />
              <InputComponent
                inputName="password"
                inputType="password"
                inputLabel="password"
                inputPlaceholder="password"
                onChange={handleChange}
              />
              {signUpState && (
                <InputComponent
                  inputName="confirmPassword"
                  inputType="password"
                  inputLabel="confirm password"
                  inputPlaceholder="confirm password"
                  onChange={handleChange}
                />
              )}
              <ButtonComponent
                colorClass={signUpState ? "button--blue" : "button--orange"}
                text={signUpState ? "Sign Up" : "Log In"}
              />
            </form>
            <p className="innerDiv__para">
              {signUpState
                ? "Already have an account? "
                : "Don't have an account? "}
              <a
                className={`innerDiv__action innerDiv__action--${
                  signUpState ? "blue" : "orange"
                }`}
                onClick={toggleSignUpState}
                href="#"
              >
                {signUpState ? "Log In" : "Sign Up"}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Navigate to="/home" replace={true} />
      )}
    </>
  );
};

export default LogInSignUp;
