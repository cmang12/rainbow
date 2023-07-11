import React, { useState, useEffect } from 'react';
import '../styles/components/LiveDate.css';
import { auth } from '../config/firebase-config';

const LiveDate = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const dayOptions = {weekday: 'long'}; 
  const dateOptions = {year: 'numeric', month: 'long', day:'numeric'}

  const formattedDay = date.toLocaleString(undefined, dayOptions);
  const formattedDate = date.toLocaleString(undefined, dateOptions);

  return <div className='divLiveDate'>
  <div>Today is {formattedDay} </div>
  <div>{formattedDate}</div>
  </div>;
};

export default LiveDate;