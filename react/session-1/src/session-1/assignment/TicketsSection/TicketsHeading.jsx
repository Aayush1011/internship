import filterIcon from "../assets/filter.svg";
import sortIcon from "../assets/sort.svg";

const TicketsHeading = () => {
  return (
    <div className="tickets-heading">
      <h4 className="tickets-heading__title">All tickets</h4>
      <div className="tickets-heading__interaction">
        <div className="tickets-heading__sort">
          <img src={sortIcon} alt="sort-icon" />
          <p className="tickets-heading__text">Sort</p>
        </div>
        <div className="tickets-heading__filter">
          <img src={filterIcon} alt="filter-icon" />
          <p className="tickets-heading__text">Filter</p>
        </div>
      </div>
    </div>
  );
};

export default TicketsHeading;
