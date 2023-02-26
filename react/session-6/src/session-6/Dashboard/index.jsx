import { Outlet, useParams, Navigate } from "react-router-dom";

import Header from "../Header";
import TicketsSection from "../TicketsSection";

const Dashboard = () => {
  const { id } = useParams();
  const loggedIn = window.sessionStorage.getItem("loggedIn");

  return (
    <>
      {loggedIn ? (
        <div className="dashboard">
          <Header headerTitle="Tickets" />
          {!id && <TicketsSection />}
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Dashboard;
