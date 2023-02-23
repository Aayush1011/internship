import Header from "../Header";
import TicketsSection from "../TicketsSection";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header headerTitle="Tickets" />
      <TicketsSection />
    </div>
  );
};

export default Dashboard;
