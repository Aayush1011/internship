import { NavLink, Outlet } from "react-router-dom";

import Logo from "../Logo";

const activeStyle = {
  background: "#9FA2B4",
  opacity: 0.08,
  borderLeft: "3px solid #DDE2FF",
};

const Sidebar = ({
  navigableItems,
  primaryNavigationItems,
  secondaryNavigationItems,
}) => {
  const navLinkItems = navigableItems.map((navigableItem, index) => {
    return (
      <div key={index + 1}>
        <NavLink
          to={navigableItem[0]}
          className="sidebar__item"
          // className={({ isActive }) =>
          //   isActive ? "sidebar__item sidebar__item-active" : "sidebar__item"
          // }
        >
          <img
            key={index + 2}
            src={navigableItem[1]}
            alt={`${navigableItem[2]}-icon`}
          />
          <p key={index + 3} className="sidebar__item-name">
            {navigableItem[2]}
          </p>
        </NavLink>
      </div>
    );
  });
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
    <>
      <nav className="sidebar">
        <Logo />
        <div className="sidebar__primary-navigation">
          {navLinkItems}
          {primaryNavigation}
        </div>
        <div className="sidebar__secondary-navigation">
          {secondaryNavigation}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Sidebar;
