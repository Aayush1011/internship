import logoImage from "../assets/logo.svg";

const Logo = ({ signUpPageStyle, logoWidth, logoHeight }) => {
  return (
    <div className={`logo ${signUpPageStyle}`}>
      <img
        src={logoImage}
        alt="dashboard-kit-icon"
        width={logoWidth}
        height={logoHeight}
      />
      <h4 className="logo__title ">Dashboard Kit</h4>
    </div>
  );
};

export default Logo;
