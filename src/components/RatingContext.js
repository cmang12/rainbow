import React, { createContext, useState } from 'react';

export const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [rating, setRating] = useState(0);

  const updateRating = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <RatingContext.Provider value={{ rating, updateRating }}>
      {children}
    </RatingContext.Provider>
  );
};