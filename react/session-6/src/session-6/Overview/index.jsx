import Header from "../../session-6/Header";
import OverviewTopSection from "../OverviewTopSection";
import { Navigate } from "react-router-dom";

const Overview = () => {
  const loggedIn = window.sessionStorage.getItem("loggedIn");
  console.log(loggedIn);
  return (
    <>
      {loggedIn ? (
        <div className="overview">
          <Header headerTitle="Overview" />
          <OverviewTopSection />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Overview;
