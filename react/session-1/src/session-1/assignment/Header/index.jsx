import headerImage from "../assets/m header.png";
import searchIcon from "../assets/search.svg";
import notificationIcon from "../assets/notification.svg";

const Header = () => {
  return (
    <section className="header">
      <h2 className="header__title">Tickets</h2>
      <div className="header__interaction">
        <div className="header__interaction-left">
          <picture>
            <img src={searchIcon} alt="search-icon" />
          </picture>
          <picture>
            <img src={notificationIcon} alt="notification-icon" />
          </picture>
        </div>
        <div className="header__interaction-right">
          <p className="header__interaction-right__name">Jones Ferdinand</p>
          <picture>
            <img
              className="header__interaction-right__avatar avatar"
              src={headerImage}
              alt="header-image"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Header;
