import { useState } from "react";

import TicketsHeading from "./TicketsHeading";
import TicketsTable from "./TicketsTable";

import ticketOneImage from "../assets/m 5.png";
import ticketTwoImage from "../assets/w 5.png";
import ticketThreeImage from "../assets/w 3.png";
import ticketFourImage from "../assets/m 7.png";
import ticketFiveImage from "../assets/m 6.png";
import ticketSixImage from "../assets/m 4.png";
import ticketSevenImage from "../assets/w 6.png";
import ticketEightImage from "../assets/w 7.png";

const TicketsSection = () => {
  const tableHeadingsArray = [
    "Ticket details",
    "Customer name",
    "Date",
    "Priority",
    "",
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
  return (
    <div className="tickets-section">
      <TicketsHeading />
      <TicketsTable
        tableHeadingsArray={tableHeadingsArray}
        ticketsArray={ticketsArray}
      />
    </div>
  );
};

export default TicketsSection;
