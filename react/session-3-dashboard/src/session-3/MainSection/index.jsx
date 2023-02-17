import { useState } from "react";

import Header from "../Header";
import TicketsSection from "../TicketsSection";

const MainSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchHandler = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="main-section">
      <Header searchTerm={searchTerm} searchHandler={searchHandler} />
      <TicketsSection searchTerm={searchTerm} />
    </div>
  );
};

export default MainSection;
