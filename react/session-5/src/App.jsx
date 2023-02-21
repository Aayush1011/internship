import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./session-5/reset.css";

import Dashboard from "./session-5/Dashboard";
import LogInSignUp from "./session-5/LogInSignUp";

export const TicketContext = createContext();
export const SearchContext = createContext();
export const FilterContext = createContext();

function App() {
  const [allTickets, setAllTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  return (
    <BrowserRouter>
      <TicketContext.Provider value={[allTickets, setAllTickets]}>
        <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
          <FilterContext.Provider value={[filter, setFilter]}>
            <Routes>
              <Route path="/" element={<LogInSignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </FilterContext.Provider>
        </SearchContext.Provider>
      </TicketContext.Provider>
    </BrowserRouter>
  );
}

export default App;
