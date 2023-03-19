const TextAreaComponent = ({ label, textAreaValue, textAreaChange }) => {
  return (
    <div>
      <label htmlFor="story" className="text-area_label">
        {label}
      </label>
      <textarea
        name={label}
        id={label}
        cols="30"
        rows="10"
        className="text-area_input"
        value={textAreaValue}
        onChange={textAreaChange}
      ></textarea>
    </div>
  );
};

export default TextAreaComponent;
