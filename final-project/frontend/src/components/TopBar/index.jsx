import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import ButtonComponent from "../ButtonComponent";

import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import useUserHook from "../../hooks/useUserHook";

const TopBar = ({ onMenuClick }) => {
  const { signOutHandler } = useUserHook();
  const navigate = useNavigate();
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const sessionParams = useParams("id");

  const logOutHandler = () => {
    signOutHandler().then((result) => {
      if (result.data.message_n === "success") {
        window.sessionStorage.removeItem("user");
        localStorage.removeItem("sessionMember");
        navigate("/", { replace: true });
      }
    });
  };

  return (
    <>
      <div className={`topbar ${!sessionParams.id && "topbar--tablet"}`}>
        <div
          className="topbar_hamburger topbar_hamburger--left"
          onClick={() => setShowLeftMenu(true)}
        >
          <RiMenu2Line />
        </div>
        <div className="topbar_logo" onClick={() => navigate("/home")}>
          Poker Planning
        </div>
        <div
          className={`topbar_right-section ${
            showLeftMenu && "topbar_right-tablet"
          }`}
        >
          <div
            className="topbar_right-close"
            onClick={() => setShowLeftMenu(false)}
          >
            <MdClose />
          </div>
          <div className="topbar_user">
            <div className="topbar_avatar">
              <RxAvatar />
            </div>
            <div className="topbar_username">
              {JSON.parse(window.sessionStorage.getItem("user")).userName}
            </div>
          </div>
          <ButtonComponent
            text="Log Out"
            colorClass="button--error topbar_button"
            callback={logOutHandler}
          />
        </div>
        {sessionParams.id && (
          <div
            className="topbar_hamburger topbar_hamburger--right"
            onClick={onMenuClick}
          >
            <RiMenu3Line />
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default TopBar;
