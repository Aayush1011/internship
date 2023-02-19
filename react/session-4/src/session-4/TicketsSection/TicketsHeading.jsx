import { useState, useContext } from "react";

import { FilterContext } from "../../App";
import FilterBox from "../FilterBox";

import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";

const TicketsHeading = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterTickets, setFilterTickets] = useContext(FilterContext);

  const filterArray = ["low", "normal", "high"];

  const toggleFilterVisibility = () => {
    setFilterVisible((previousFilterVisibility) => !previousFilterVisibility);
  };

  const filterHandler = (filterChoice) => {
    if (!filterTickets || filterTickets !== filterChoice) {
      setFilterTickets(filterChoice);
    } else {
      setFilterTickets(null);
    }
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
