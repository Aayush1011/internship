import TicketsHeading from "./TicketsHeading";
import TicketsTable from "./TicketsTable";

const TicketsSection = () => {
  return (
    <div className="tickets-section">
      <TicketsHeading />
      <TicketsTable />
    </div>
  );
};

export default TicketsSection;
