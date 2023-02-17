import Logo from "../Logo";

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
      <Logo />
      <div className="sidebar__primary-navigation">{primaryNavigation}</div>
      <div className="sidebar__secondary-navigation">{secondaryNavigation}</div>
    </nav>
  );
};

export default Sidebar;
