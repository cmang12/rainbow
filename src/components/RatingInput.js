import React, { useContext, useState, useEffect } from 'react';
import '../styles/components/RatingInput.css';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { RatingContext } from './RatingContext';


const RatingInput = ({ selectedDate }) => {
  const { rating, updateRating } = useContext(RatingContext);
  const [existingEntry, setExistingEntry] = useState(null);

  useEffect(() => {
    const fetchExistingEntry = async () => {
      if (selectedDate) {
        const entryDoc = doc(db, "entries", selectedDate.toISOString());
        const entrySnapshot = await getDoc(entryDoc);
        if (entrySnapshot.exists()) {
          setExistingEntry(entrySnapshot.data());
          updateRating(entrySnapshot.data().rating);
        } else {
          setExistingEntry(null);
        }
      }
    };

    fetchExistingEntry();
  }, [selectedDate, db]);


  const handleRatingClick = (selectedRating) => {
    if (selectedRating === rating) {
      updateRating(0);
    } else {
      updateRating(selectedRating);
    }
  };

  return (
    <div className='rating-input-container'>
      <div className="rating-buttons">
        <div className="labelDiv">
          <label className="label"> How are you feeling today? </label>
        </div>
        <div className="circles">
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <button
              key={value}
              className={`circle ${value === rating ? 'selected' : ''}`}
              value={value.toString()}
              onClick={() => handleRatingClick(value)}
            >
        
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingInput;