import { useState, useContext } from "react";

import { FilterContext } from "../../App";
import FilterBox from "../FilterBox";
import { TicketModal } from "../Modal";

import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";
import plusIcon from "../assets/plus.svg";

const TicketsHeading = ({ setAllTickets }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterTickets, setFilterTickets] = useContext(FilterContext);
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="tickets-heading">
      <h4 className="tickets-heading__title">All tickets</h4>
      <div className="tickets-heading__interaction">
        <div className="tickets-heading__sort tickets-heading__interaction-item">
          <img src={sortIcon} alt="sort-icon" />
          <p className="tickets-heading__text">Sort</p>
        </div>
        <div
          className="tickets-heading__filter tickets-heading__interaction-item"
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
        <div
          className="tickets-heading__add tickets-heading__interaction-item"
          onClick={handleOpenModal}
        >
          <img src={plusIcon} alt="add-icon" />
          <p className="tickets-heading__text">Add Ticket</p>
        </div>
        <TicketModal openModal={openModal} handleClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default TicketsHeading;
