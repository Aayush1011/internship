const OverviewTopSectionItem = ({ itemName, itemQuantity }) => (
  <div className="item">
    <div className="item-name">{itemName}</div>
    <div className="item-quantity">{itemQuantity}</div>
  </div>
);

export default OverviewTopSectionItem;
