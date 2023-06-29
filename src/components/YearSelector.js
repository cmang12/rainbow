import React from 'react';

const YearSelector = ({ selectedYear, onYearChange }) => {
  const years = [2021, 2022, 2023]; // Example years, replace with your own logic to generate years

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    onYearChange(year);
  };

  return (
    <div>
      <label htmlFor="year">Select Year: </label>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
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
