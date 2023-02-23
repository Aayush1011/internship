import OverviewTopSectionItem from "../OverviewTopSectionItem";

const OverviewTopSection = () => (
  <div className="overview-top-section">
    <OverviewTopSectionItem itemName="Unresolved" itemQuantity="60" />
    <OverviewTopSectionItem itemName="Overdue" itemQuantity="16" />
    <OverviewTopSectionItem itemName="Open" itemQuantity="43" />
    <OverviewTopSectionItem itemName="On hold" itemQuantity="64" />
  </div>
);

export default OverviewTopSection;
