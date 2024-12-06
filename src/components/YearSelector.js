import React from 'react';
import '../styles/components/YearSelector.css'; 

const YearSelector = ({ selectedYear, onYearChange }) => {
  const years = [2021, 2022, 2023, 2024]; 

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    onYearChange(year);
  };

  return (
    <div>
      <label className='labelForYearSelector' htmlFor="year">Select Year: </label>
      <select className="yearSelectorButton" id="year" value={selectedYear} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
