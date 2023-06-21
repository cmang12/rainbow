import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/TextInput.css';

const TextInput = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleTextChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Text:', text);
    setText('');
    navigate('/');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className='Heading'>Tell me more</h1>
        <div>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            rows={6}
            cols={50}
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default TextInput;