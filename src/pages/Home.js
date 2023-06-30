import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LiveDate from '../components/LiveDate';
import MainButton from '../components/MainButton';
import Title from '../components/Title';
import YearInPixels from '../components/YearInPixels';
import YearSelector from '../components/YearSelector'; // Import the YearSelector component
import '../styles/pages/Home.css';
import '../styles/index.css';

function Home ({isAuth}) {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  //useEffect(() => {
    //const storedAuth = localStorage.getItem("isAuth");
    //if (!storedAuth) {
      //navigate("/login");
    //}
  //}, [isAuth, navigate]);

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
