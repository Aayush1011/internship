import { useState } from "react";

import Logo from "../Logo";
import InputComponent from "../InputComponent";
import ButtonComponent from "../ButtonComponent";

const LogInSignUp = () => {
  const [signUpState, setSignUpState] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    // rememberMe: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signUpState) {
      setFormState((previousState) => ({
        ...previousState,
        fullName: "",
        confirmPassword: "",
      }));
      console.log({
        email: formState.email,
        password: formState.password,
        rememberMe: formState.rememberMe,
      });
    } else {
      setFormState((previousState) => ({
        ...previousState,
        rememberMe: false,
      }));
      console.log({
        fullName: formState.fullName,
        email: formState.email,
        password: formState.password,
        confirmPassword: formState.confirmPassword,
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
    <div className="outerDiv">
      <div className="innerDiv">
        <Logo
          signUpPageStyle="signUpPageStyle"
          logoWidth="48"
          logoHeight="48"
        />
        <h2
          className={`innerDiv__title ${!signUpState && "innerDiv__title-mb"}`}
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
  );
};

export default LogInSignUp;
