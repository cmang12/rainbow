import React, { useState } from 'react';
import LiveDate from '../components/LiveDate';
import MainButton from '../components/MainButton';
import Title from '../components/Title';
import YearInPixels from '../components/YearInPixels';
import YearSelector from '../components/YearSelector'; // Import the YearSelector component
import '../styles/pages/Home.css';
import '../styles/index.css';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <Title />
        <LiveDate />
        <MainButton />
        <YearInPixels selectedYear={selectedYear} />
        <YearSelector selectedYear={selectedYear} onYearChange={handleYearChange} />
      </header>
    </div>
  );
};

export default Home;
