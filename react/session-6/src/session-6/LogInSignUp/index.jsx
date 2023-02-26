import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

import Logo from "../Logo";

const LogInSignUp = () => {
  const [signUpState, setSignUpState] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const value = e.target.checked;
    setFormState((previousState) => ({
      ...previousState,
      rememberMe: value,
    }));
  };

  const postUserData = async (userData) => {
    await axios.post("http://localhost:3000/users", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getUserData = async () => {
    const userData = await axios.get(
      `http://localhost:3000/users?email=${formState.email}&password=${formState.password}`
    );
    if (userData.data.length > 0) {
      window.sessionStorage.setItem("loggedIn", true);
      setTimeout(() => {
        window.sessionStorage.removeItem("loggedIn");
        toast.error("Session timed out");
      }, 150000);
      toast.success("Logged in successfully");
      navigate("/loggedin/", { replace: true });
    } else {
      setLoginFailed(true);
      setTimeout(() => {
        setLoginFailed(false);
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signUpState) {
      setFormState((previousState) => ({
        ...previousState,
        fullName: "",
        confirmPassword: "",
      }));
      getUserData();
    } else {
      setFormState((previousState) => ({
        ...previousState,
        rememberMe: false,
      }));
      postUserData({
        fullName: formState.fullName,
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
      }).then(() => {
        toast.success("New user signed up");
        setSignUpState(false);
      });
    }
  };

  const goToSignUp = () => {
    setSignUpState(true);
  };

  const goToLogIn = () => {
    setSignUpState(false);
  };

  return (
    <>
      {!window.sessionStorage.getItem("loggedIn") ? (
        <div className="outerDiv">
          {loginFailed && (
            <div className="error-box">Email or password is incorrect</div>
          )}
          <div className="innerDiv">
            <Logo
              signUpPageStyle="signUpPageStyle"
              logoWidth="48"
              logoHeight="48"
            />
            <h2
              className={`innerDiv__title ${
                !signUpState && "innerDiv__title-mb"
              }`}
            >
              {signUpState ? "Sign Up" : "Log In"} to Dashboard Kit
            </h2>
            {!signUpState && (
              <p className="innerDiv__request">
                Enter your email and password below
              </p>
            )}
            <form className="innerDiv__form" onSubmit={handleSubmit}>
              {signUpState && (
                <InputComponent
                  inputName="fullName"
                  inputType="text"
                  inputLabel="fullname"
                  inputPlaceholder="fullname"
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
              {!signUpState && (
                <InputComponent
                  inputName="rememberMe"
                  inputType="checkbox"
                  inputLabel="remember me"
                  rememberMe="remember-me"
                  onChange={handleCheckbox}
                />
              )}
              <ButtonComponent text={signUpState ? "Sign Up" : "Log In"} />
            </form>
            <p className="innerDiv__para">
              Don't have an account?{" "}
              <a
                className="innerDiv__action"
                onClick={signUpState ? goToLogIn : goToSignUp}
                href="#"
              >
                {signUpState ? "Log In" : "Sign Up"}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Navigate to="/loggedin" replace={true} />
      )}
    </>
  );
};

export default LogInSignUp;
