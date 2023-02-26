import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { TicketContext } from "../../App";

import backArrowIcon from "../assets/arrow-left.svg";

const SingleTicket = () => {
  const [allTickets, setAllTickets] = useContext(TicketContext);
  const { id } = useParams();
  const navigateToTicketsTable = useNavigate();
  const ticketToDisplay = allTickets.find((ticket) => {
    return ticket.id == id;
  });
  const goBack = () => {
    navigateToTicketsTable(-1);
  };

  return (
    <div className="single-ticket">
      <picture className="single-ticket__back-button" onClick={goBack}>
        <img src={backArrowIcon} alt="go-back" width="15" height="15" />
      </picture>
      <div className="single-ticket__heading">
        <picture className="single-ticket__avatar">
          <img className="avatar" src={ticketToDisplay.avatar} alt="avatar" />
        </picture>
        <div>
          <p className="single-ticket__details-info single-ticket__issue">
            {ticketToDisplay.ticketDetails}
          </p>
          <p className="single-ticket__details single-ticket__updated">
            {ticketToDisplay.ticketDetailsUpdated}
          </p>
        </div>
      </div>
      <p className="single-ticket__details">
        Customer name:{" "}
        <span className="single-ticket__details-info">
          {ticketToDisplay.customerName}
        </span>{" "}
      </p>
      <p className="single-ticket__details">
        Posted:{" "}
        <span className="single-ticket__details-info">
          {ticketToDisplay.customerNameDate}
        </span>{" "}
      </p>
      <p className="single-ticket__details">
        Last Updated on:{" "}
        <span className="single-ticket__details-info">
          {ticketToDisplay.date}
        </span>{" "}
      </p>
      <p className="single-ticket__details">
        Last Updated time:{" "}
        <span className="single-ticket__details-info">
          {ticketToDisplay.time}
        </span>{" "}
      </p>
      <div
        className="single-ticket__priority-pill"
        style={{
          background:
            ticketToDisplay.priority === "high"
              ? "#F12B2C"
              : ticketToDisplay.priority === "normal"
              ? "#29CC97"
              : "#FEC400",
        }}
      >
        <p className="single-ticket__priority-pill-text">
          {ticketToDisplay.priority}
        </p>
      </div>
    </div>
  );
};

export default SingleTicket;
