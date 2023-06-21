import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MainButton.css';

const MainButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the desired page
    navigate('/Question');
  };

  return (
    <button className='button'
    onClick={handleButtonClick}> Write your feelings. </button>
  );
};

export default MainButton;