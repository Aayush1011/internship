const ButtonComponent = ({ text }) => {
  return (
    <div className="button">
      <button type="submit" className="button__text" href="#">
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
