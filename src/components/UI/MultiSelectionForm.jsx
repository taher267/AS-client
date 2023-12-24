import React, { useState } from "react";

const MultiSelectionForm = ({ selectedOptions, setSelectedOptions }) => {
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the selected options as needed
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div>
      <label>Select multiple options:</label>
      <select multiple value={selectedOptions} onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
};

export default MultiSelectionForm;
