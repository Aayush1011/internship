import logoImage from "../assets/logo.svg";

const Sidebar = ({ primaryNavigationItems, secondaryNavigationItems }) => {
  const primaryNavigation = primaryNavigationItems.map(
    (primaryNavigationItem, index) => {
      return (
        <div key={index + 1} className="sidebar__item">
          <img
            key={index + 2}
            src={primaryNavigationItem[0]}
            alt={`${primaryNavigationItem[1]}-icon`}
          />
          <p key={index + 3} className="sidebar__item-name">
            {primaryNavigationItem[1]}
          </p>
        </div>
      );
    }
  );
  const secondaryNavigation = secondaryNavigationItems.map(
    (secondaryNavigationItem, index) => {
      return (
        <div key={index + 1} className="sidebar__item">
          <img
            key={index + 2}
            src={secondaryNavigationItem[0]}
            alt={`${secondaryNavigationItem[1]}-icon`}
          />
          <p key={index + 3} className="sidebar__item-name">
            {secondaryNavigationItem[1]}
          </p>
        </div>
      );
    }
  );
  return (
    <nav className="sidebar">
      <div className="sidebar__title">
        <img src={logoImage} alt="dashboard-kit-icon" />
        <h4 className="sidebar__title-name">Dashboard Kit</h4>
      </div>
      <div className="sidebar__primary-navigation">{primaryNavigation}</div>
      <div className="sidebar__secondary-navigation">{secondaryNavigation}</div>
    </nav>
  );
};

export default Sidebar;
