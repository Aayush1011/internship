const InputComponent = ({
  inputName,
  inputType,
  inputLabel,
  inputPlaceholder,
  onChange,
  rememberMe,
}) => {
  return (
    <div className={`input input__${rememberMe}`}>
      <label
        className={`input__label input__label__${rememberMe}`}
        htmlFor={inputName}
      >
        {inputLabel}
      </label>
      <input
        className={`input__field input__field__${rememberMe}`}
        type={inputType}
        name={inputName}
        placeholder={inputPlaceholder}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default InputComponent;
