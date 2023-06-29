import React, { useEffect, useState } from 'react';
import '../styles/components/YearInPixels.css';
import { db, auth } from '../config/firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const YearInPixels = ({ selectedYear }) => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const q = query(
          collection(db, 'entries'),
          where('author.id', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = Array(365).fill(0);
        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          const entryDate = new Date(entry.selectedDate);
          if (entryDate.getFullYear() === selectedYear) {
            const dayOfYear = getDayOfYear(entryDate);
            data[dayOfYear - 1] = entry.rating;
          }
        });
        setMoodData(data);
      } catch (error) {
        console.error('Error fetching mood data:', error);
        // Handle the error gracefully
      }
    };

    fetchMoodData();
  }, [selectedYear]);

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
            className={`pixel ${rating !== 0 ? `mood-${rating}` : 'grey'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default YearInPixels;
