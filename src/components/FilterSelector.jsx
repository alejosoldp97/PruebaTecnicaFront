import React, { useState } from "react";

const FilterSelector = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selected);
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700">Filter by:</span>
      <select
        className="block appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        multiple
        value={selectedOptions}
        onChange={handleOptionChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelector;
