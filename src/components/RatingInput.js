import React, { useState } from 'react';
import '../styles/components/RatingInput.css';
import CreateEntry from './CreateEntry'; 
import {addDoc, collection, serverTimestamp} from "firebase/firestore"; 
import {db, auth} from "../config/firebase-config"; 


const RatingInput = () => {
  const [rating, setRating] = useState(0);

  const [showTextInput, setShowTextInput] = useState(false);

  const moodsCollectionRef = collection(db, "moods"); 

  const handleRatingClick = async (selectedRating) => {
    setRating(selectedRating);
    setShowTextInput(true);

    // Store the rating in Firestore
    try {
      const moodEntry = {
        rating: selectedRating,
        timestamp: serverTimestamp(),
        id: auth.currentUser.uid
      };
      await addDoc(moodsCollectionRef, moodEntry);
      console.log('Mood stored successfully:', moodEntry);
    } catch (error) {
      console.error('Error storing mood:', error);
      // Handle the error gracefully
    }
  };

  return (
    <div className='rating-input-container'>
      {showTextInput ? (
        <CreateEntry />
      ) : (
       
        <div className="rating-buttons">
          <div className="labelDiv" > 
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
      )}
    </div>
  );
};

export default RatingInput;

