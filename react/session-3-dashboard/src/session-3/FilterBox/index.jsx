const FilterBox = ({ filterHandler, filterArray }) => {
  const filterOptions = filterArray.map((filterChoice) => {
    return (
      <p
        className="filter-box__text"
        onClick={() => filterHandler(filterChoice)}
      >
        {filterChoice}
      </p>
    );
  });
  return <div className="filter-box">{filterOptions}</div>;
};

export default FilterBox;
