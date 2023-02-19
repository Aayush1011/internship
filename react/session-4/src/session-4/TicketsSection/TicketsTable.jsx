import { useState, useContext } from "react";

import { SearchContext, FilterContext } from "../../App";

import deleteIcon from "../assets/trash-solid.svg";

const TicketsTable = ({ tableHeadingsArray, ticketsArray }) => {
  const [allTableHeadings, setAllTableHeadings] = useState(tableHeadingsArray);
  const [allTickets, setAllTickets] = useState(ticketsArray);
  const [searchTerm, setSearchTerm] = useContext(SearchContext);
  const [filterTickets, setFilterTickets] = useContext(FilterContext);

  const deleteTicket = (index) => {
    setAllTickets(allTickets.filter((ticket, i) => i !== index));
  };
  const tableHeadings = allTableHeadings.map((tableHeading) => {
    return <th className="tickets-table__title">{tableHeading}</th>;
  });

  const ticketDetails = allTickets
    .filter((ticket) =>
      searchTerm
        ? ticket.ticketDetails.toLowerCase().includes(searchTerm)
        : true
    )
    .filter((ticket) =>
      filterTickets ? ticket.priority === filterTickets : true
    )
    .map((ticket, index) => {
      return (
        <tr className="tickets-table__row">
          <td className="tickets-table__data">
            <div className="tickets-table__details">
              <picture>
                <img
                  className="avatar"
                  src={ticket.avatar}
                  alt={`${ticket.customerName} image`}
                />
              </picture>
              <div>
                <p className="tickets-table__main-text">
                  {ticket.ticketDetails}
                </p>
                <p className="tickets-table__sub-text">
                  {ticket.ticketDetailsUpdated}
                </p>
              </div>
            </div>
          </td>
          <td className="tickets-table__data">
            <div>
              <p className="tickets-table__main-text">{ticket.customerName}</p>
              <p className="tickets-table__sub-text">
                {ticket.customerNameDate}
              </p>
            </div>
          </td>
          <td className="tickets-table__data">
            <div>
              <p className="tickets-table__main-text">{ticket.date}</p>
              <p className="tickets-table__sub-text">{ticket.time}</p>
            </div>
          </td>
          <td className="tickets-table__data">
            <div
              className="tickets-table__priority-pill"
              style={{
                background:
                  ticket.priority === "high"
                    ? "#F12B2C"
                    : ticket.priority === "normal"
                    ? "#29CC97"
                    : "#FEC400",
              }}
            >
              <p className="tickets-table__priority-pill-text">
                {ticket.priority}
              </p>
            </div>
          </td>
          <td className="tickets-table__data">
            <picture
              className="tickets-table__delete"
              onClick={() => deleteTicket(index)}
            >
              <img src={deleteIcon} alt="delete-icon" />
            </picture>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <table className="tickets-table">
        <thead>
          <tr>{tableHeadings}</tr>
        </thead>
        <tbody>{ticketDetails}</tbody>
      </table>
    </div>
  );
};

export default TicketsTable;
