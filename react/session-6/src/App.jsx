import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./session-6/Dashboard";
import LogInSignUp from "./session-6/LogInSignUp";
import Overview from "./session-6/Overview";
import Sidebar from "./session-6/Sidebar";
import SingleTicket from "./session-6/SingleTicket";
import NotFound from "./session-6/NotFound";

import overviewIcon from "./session-6/assets/1. overview.svg";
import ticketsIcon from "./session-6/assets/2. tickets.svg";
import ideasIcon from "./session-6/assets/3. ideas.svg";
import contactsIcon from "./session-6/assets/4. contacts.svg";
import agentsIcon from "./session-6/assets/5. agents.svg";
import articlesIcon from "./session-6/assets/6. articles.svg";
import settingsIcon from "./session-6/assets/a_1. settings.svg";
import subscriptionIcon from "./session-6/assets/a_2. subscription.svg";

import "./session-6/reset.css";
import "./session-6/main.css";

export const TicketContext = createContext();
export const SearchContext = createContext();
export const FilterContext = createContext();
const navigableItems = [
  ["/loggedin/", overviewIcon, "Overview"],
  ["/loggedin/dashboard", ticketsIcon, "Tickets"],
];
const primaryNavigationItems = [
  [ideasIcon, "Ideas"],
  [contactsIcon, "Contacts"],
  [agentsIcon, "Agents"],
  [articlesIcon, "Articles"],
];
const secondaryNavigationItems = [
  [settingsIcon, "Settings"],
  [subscriptionIcon, "Subscription"],
];

function App() {
  const [allTickets, setAllTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  return (
    <>
      <TicketContext.Provider value={[allTickets, setAllTickets]}>
        <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
          <FilterContext.Provider value={[filter, setFilter]}>
            <ToastContainer position="top-right" theme="colored" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LogInSignUp />} />
                <Route
                  path="/loggedin"
                  element={
                    <Sidebar
                      navigableItems={navigableItems}
                      primaryNavigationItems={primaryNavigationItems}
                      secondaryNavigationItems={secondaryNavigationItems}
                    />
                  }
                >
                  <Route path="" element={<Overview />} />
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route path=":id" element={<SingleTicket />} />
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FilterContext.Provider>
        </SearchContext.Provider>
      </TicketContext.Provider>
    </>
  );
}

export default App;
