import React, { useState, ChangeEvent } from 'react';

const Dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative inline-block text-left">
        <select
          value={selectedOption}
          onChange={handleSelect}
          className="block appearance-none w-32 px-4 py-2 border border-gray-300 rounded-md shadow-md bg-slate-300 hover:border-gray-500 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Select an option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {selectedOption && (
        <div className="ml-4">Selected Option: {selectedOption}</div>
      )}
    </div>
  );
};

export default Dropdown;