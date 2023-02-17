import { useState } from "react";

import NotificationBox from "../NotificationBox";

import headerImage from "../assets/m header.png";
import searchIcon from "../assets/search.svg";
import notificationIcon from "../assets/notification.svg";
import BasicModal from "../Modal";

const Header = ({ searchTerm, searchHandler }) => {
  const [searchBarVisibility, setSearchBarVisibility] = useState(false);
  const [notificationBoxVisibility, setNotificationBoxVisibility] =
    useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const toggleSearchBar = () => {
    setSearchBarVisibility(
      (previousSearchBarVisibility) => !previousSearchBarVisibility
    );
  };

  const toggleNotificationBox = () => {
    setNotificationBoxVisibility(
      (previousNotificationBoxVisibility) => !previousNotificationBoxVisibility
    );
  };
  return (
    <section className="header">
      <h2 className="header__title">Tickets</h2>
      <div className="header__interaction">
        <div className="header__interaction-left">
          {searchBarVisibility && (
            <input
              className="header__interaction-left__input"
              value={searchTerm.searchTerm}
              onChange={(e) => searchHandler(e.target.value)}
              placeholder="Search"
            ></input>
          )}
          <picture onClick={toggleSearchBar}>
            <img src={searchIcon} alt="search-icon" />
          </picture>
          <picture onClick={toggleNotificationBox}>
            <img src={notificationIcon} alt="notification-icon" />
          </picture>
          {notificationBoxVisibility && <NotificationBox />}
        </div>
        <div className="header__interaction-right">
          <p className="header__interaction-right__name">Jones Ferdinand</p>
          <picture onClick={handleOpenModal}>
            <img
              className="header__interaction-right__avatar avatar"
              src={headerImage}
              alt="header-image"
            />
          </picture>
        </div>
        <BasicModal openModal={openModal} handleClose={handleCloseModal} />
      </div>
    </section>
  );
};

export default Header;
