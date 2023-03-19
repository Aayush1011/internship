import { useState } from "react";

import ButtonComponent from "../ButtonComponent";
import TextAreaComponent from "../TextAreaComponent";
import useSessionHook from "../../hooks/useSessionHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NewSession = () => {
  const [formState, setFormState] = useState({ name: "", description: "" });
  const { createNewSession, setSessionDetails } = useSessionHook();
  const navigateToSession = useNavigate();
  const [value, setValue] = useState("");

  const handleTextAreaChange = (e) => {
    setValue(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewSession(formState).then((result) => {
      if (result.data.message === "success") {
        localStorage.setItem(
          "sessionDetails",
          JSON.stringify({
            ...formState,
            sessionId: result.data.sessionId,
          })
        );
        navigateToSession(`/session/${result.data.sessionId}`);
      } else {
        toast.error(result.data.message);
      }
    });
  };

  return (
    <div className="session-form_container">
      <h1 className="session-form_title">Create New Session</h1>
      <form onSubmit={handleSubmit} className="session-form_actual">
        <div className="session-form_component">
          <label htmlFor="name" className="session-form_label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="session-form_input"
            onChange={handleChange}
            value={formState.name}
          />
        </div>
        <TextAreaComponent
          label="description"
          textAreaChange={handleChange}
          textAreaValue={formState.description}
        />
        <ButtonComponent
          text="Start Session"
          colorClass="button--orange session-form_button"
        />
      </form>
    </div>
  );
};

export default NewSession;
