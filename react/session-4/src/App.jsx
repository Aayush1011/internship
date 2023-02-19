import { createContext, useState } from "react";

import "./session-4/reset.css";

import Dashboard from "./session-4/Dashboard";

export const SearchContext = createContext();
export const FilterContext = createContext();

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(null);
  return (
    <SearchContext.Provider value={[searchTerm, setSearchTerm]}>
      <FilterContext.Provider value={[filter, setFilter]}>
        <div>
          <Dashboard />
        </div>
      </FilterContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
