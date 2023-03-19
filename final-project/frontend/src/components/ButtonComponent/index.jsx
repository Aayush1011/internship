const ButtonComponent = ({ text, colorClass, callback, disabled }) => {
  return (
    <div className={`button ${colorClass}`}>
      <button
        type="submit"
        className="button__text"
        onClick={callback}
        href="#"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
