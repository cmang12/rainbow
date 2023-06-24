import React, { useContext, useState } from 'react';
import '../styles/components/RatingInput.css';
import { RatingContext } from './RatingContext';

const RatingInput = () => {
  const { rating, updateRating } = useContext(RatingContext);

  const handleRatingClick = (selectedRating) => {
    updateRating(selectedRating);
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