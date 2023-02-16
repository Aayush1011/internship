import "../reset.css";
import "../main.css";

import Sidebar from "../Sidebar";
import MainSection from "../MainSection";

import overviewIcon from "../assets/1. overview.svg";
import ticketsIcon from "../assets/2. tickets.svg";
import ideasIcon from "../assets/3. ideas.svg";
import contactsIcon from "../assets/4. contacts.svg";
import agentsIcon from "../assets/5. agents.svg";
import articlesIcon from "../assets/6. articles.svg";
import settingsIcon from "../assets/a_1. settings.svg";
import subscriptionIcon from "../assets/a_2. subscription.svg";

const Dashboard = () => {
  const primaryNavigationItems = [
    [overviewIcon, "Overview"],
    [ticketsIcon, "Tickets"],
    [ideasIcon, "Ideas"],
    [contactsIcon, "Contacts"],
    [agentsIcon, "Agents"],
    [articlesIcon, "Articles"],
  ];
  const secondaryNavigationItems = [
    [settingsIcon, "Settings"],
    [subscriptionIcon, "Subscription"],
  ];
  return (
    <div className="dashboard">
      <Sidebar
        primaryNavigationItems={primaryNavigationItems}
        secondaryNavigationItems={secondaryNavigationItems}
      />
      <MainSection />
    </div>
  );
};

export default Dashboard;
