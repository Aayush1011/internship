import { useState } from "react";

import FilterBox from "../FilterBox";

import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";

const TicketsHeading = ({ filterTickets, filterHandler, filterArray }) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setFilterVisible((previousFilterVisibility) => !previousFilterVisibility);
  };

  return (
    <div className="tickets-heading">
      <h4 className="tickets-heading__title">All tickets</h4>
      <div className="tickets-heading__interaction">
        <div className="tickets-heading__sort">
          <img src={sortIcon} alt="sort-icon" />
          <p className="tickets-heading__text">Sort</p>
        </div>
        <div
          className="tickets-heading__filter"
          onClick={toggleFilterVisibility}
        >
          <img src={filterIcon} alt="filter-icon" />
          <p className="tickets-heading__text">
            {filterTickets ? filterTickets : "Filter"}
          </p>
        </div>
        {filterVisible && (
          <FilterBox filterHandler={filterHandler} filterArray={filterArray} />
        )}
      </div>
    </div>
  );
};

export default TicketsHeading;
