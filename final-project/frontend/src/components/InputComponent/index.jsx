const InputComponent = ({
  inputName,
  inputType,
  inputLabel,
  inputPlaceholder,
  onChange,
  value,
}) => {
  return (
    <div className={`input`}>
      <label className={`input__label`} htmlFor={inputName}>
        {inputLabel}
      </label>
      <input
        className={`input__field`}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
};

export default InputComponent;
