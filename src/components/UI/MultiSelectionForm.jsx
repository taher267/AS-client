// import React, { useState } from "react";

// const MultiSelectionForm = ({ selectedOptions, setSelectedOptions }) => {
//   const handleSelectChange = (event) => {
//     const selectedValues = Array.from(
//       event.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedOptions(selectedValues);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle the selected options as needed
//     console.log("Selected Options:", selectedOptions);
//   };

//   return (
//     <div>
//       <label>Select multiple options:</label>
//       <select multiple value={selectedOptions} onChange={handleSelectChange}>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         <option value="option3">Option 3</option>
//         {/* Add more options as needed */}
//       </select>
//     </div>
//   );
// };

// export default MultiSelectionForm;'

const initOptions = [
  {
    label: "Name",
    value: "Taher",
  },
  {
    label: "Name1",
    value: "name1",
  },
  {
    label: "Name2",
    value: "name2",
  },
  {
    label: "Name3",
    value: "name3",
  },
  {
    label: "Name4",
    value: "name4",
  },
];

import React from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const MultiSelect = () => (
  <Select
    options={options}
    isMulti
    onChange={(...props) => {
      console.log(...props);
    }}
  />
);
export default MultiSelect;
