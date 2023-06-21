import React, { useEffect, useState } from 'react';
import '../styles/components/YearInPixels.css';
import { db, auth } from '../config/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const YearInPixels = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const q = query(
          collection(db, 'moods'),
          where('id', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = Array(365).fill(null); 
        querySnapshot.forEach((doc) => {
          const mood = doc.data(); 
          const dayOfYear = getDayOfYear(mood.timestamp.toDate()); 
          data[dayOfYear - 1] = mood.rating; 
        });
        setMoodData(data);
      } catch (error) {
        console.error('Error fetching mood data:', error);
        // Handle the error gracefully
      }
    };
    // need to consider leap years, can sort by year and month, and then wrapped with ToolTip 
    // oh and graphs 
    fetchMoodData();
  }, []);

  const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };
  
  return (
    <div className="year-in-pixels-container">
      <div className="year-in-pixels">
      {moodData.map((rating) => (
          <div
            //key={index}
            className={`pixel ${rating !== null ? `mood-${rating}` : 'grey'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default YearInPixels;
