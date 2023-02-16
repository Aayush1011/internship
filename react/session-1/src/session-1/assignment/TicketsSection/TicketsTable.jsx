import ticketOneImage from "../assets/m 5.png";
import ticketTwoImage from "../assets/w 5.png";
import ticketThreeImage from "../assets/w 3.png";
import ticketFourImage from "../assets/m 7.png";
import ticketFiveImage from "../assets/m 6.png";
import ticketSixImage from "../assets/m 4.png";
import ticketSevenImage from "../assets/w 6.png";
import ticketEightImage from "../assets/w 7.png";

const TicketsTable = () => {
  const tableHeadingsArray = [
    "Ticket details",
    "Customer name",
    "Date",
    "Priority",
  ];
  const ticketsArray = [
    {
      avatar: ticketOneImage,
      ticketDetails: "Contact Email not Linked",
      ticketDetailsUpdated: "Updated 1 day ago",
      customerName: "Tom Cruise",
      customerNameDate: "on 24.05.2019",
      date: "May 26, 2019",
      time: "6:30 PM",
      priority: "high",
    },
    {
      avatar: ticketTwoImage,
      ticketDetails: "Adding Images to Featured Posts",
      ticketDetailsUpdated: "Updated 1 day ago",
      customerName: "Matt Damon",
      customerNameDate: "on 24.05.2019",
      date: "May 26, 2019",
      time: "8:00 AM",
      priority: "low",
    },
    {
      avatar: ticketThreeImage,
      ticketDetails: "When will I be charged this month?",
      ticketDetailsUpdated: "Updated 1 day ago",
      customerName: "Robert Downey",
      customerNameDate: "on 24.05.2019",
      date: "May 26, 2019",
      time: "7:30 PM",
      priority: "high",
    },
    {
      avatar: ticketFourImage,
      ticketDetails: "Payment not going through",
      ticketDetailsUpdated: "Updated 2 days ago",
      customerName: "Christian Bale",
      customerNameDate: "on 24.05.2019",
      date: "May 25, 2019",
      time: "5:00 PM",
      priority: "normal",
    },
    {
      avatar: ticketFiveImage,
      ticketDetails: "Unable to add replies",
      ticketDetailsUpdated: "Updated 2 days ago",
      customerName: "Henry Cavil",
      customerNameDate: "on 24.05.2019",
      date: "May 25, 2019",
      time: "4:00 PM",
      priority: "high",
    },
    {
      avatar: ticketSixImage,
      ticketDetails: "Downtime since last week",
      ticketDetailsUpdated: "Updated 3 days ago",
      customerName: "Chris Evans",
      customerNameDate: "on 23.05.2019",
      date: "May 25, 2019",
      time: "2:00 PM",
      priority: "normal",
    },
    {
      avatar: ticketSevenImage,
      ticketDetails: "Referral Bonus",
      ticketDetailsUpdated: "Updated 4 days ago",
      customerName: "Sam Smith",
      customerNameDate: "on 22.05.2019",
      date: "May 25, 2019",
      time: "11:30 AM",
      priority: "low",
    },
    {
      avatar: ticketEightImage,
      ticketDetails: "How do I change my password?",
      ticketDetailsUpdated: "Updated 6 days ago",
      customerName: "Steve Rogers",
      customerNameDate: "on 21.05.2019",
      date: "May 24, 2019",
      time: "1:00 PM",
      priority: "normal",
    },
  ];
  const tableHeadings = tableHeadingsArray.map((tableHeading) => {
    return <th className="tickets-table__title">{tableHeading}</th>;
  });
  const ticketDetails = ticketsArray.map((ticket) => {
    return (
      <tr>
        <td className="tickets-table__row">
          <div className="tickets-table__details">
            <picture>
              <img
                className="avatar"
                src={ticket.avatar}
                alt={`${ticket.customerName} image`}
              />
            </picture>
            <div>
              <p className="tickets-table__main-text">{ticket.ticketDetails}</p>
              <p className="tickets-table__sub-text">
                {ticket.ticketDetailsUpdated}
              </p>
            </div>
          </div>
        </td>
        <td className="tickets-table__row">
          <div>
            <p className="tickets-table__main-text">{ticket.customerName}</p>
            <p className="tickets-table__sub-text">{ticket.customerNameDate}</p>
          </div>
        </td>
        <td className="tickets-table__row">
          <div>
            <p className="tickets-table__main-text">{ticket.date}</p>
            <p className="tickets-table__sub-text">{ticket.time}</p>
          </div>
        </td>
        <td className="tickets-table__row">
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
