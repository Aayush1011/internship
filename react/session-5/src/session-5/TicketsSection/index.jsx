import TicketsHeading from "./TicketsHeading";
import TicketsTable from "./TicketsTable";

const TicketsSection = () => {
  const tableHeadingsArray = [
    "Ticket details",
    "Customer name",
    "Date",
    "Priority",
    "",
  ];
  return (
    <div className="tickets-section">
      <TicketsHeading />
      <TicketsTable tableHeadingsArray={tableHeadingsArray} />
    </div>
  );
};

export default TicketsSection;
