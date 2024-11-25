import React, { useState, useEffect } from 'react';
import './InputBox.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const InputBox = ({ onTrack }) => {
  const [awbInput, setAwbInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleInputChange = (e) => {
    const cleanedInput = e.target.value.replace(/\s/g, '');
    setAwbInput(cleanedInput);
  };

  const handleTrackClick = () => {
    const awbNumbersArray = awbInput.split(',');
    onTrack(awbNumbersArray);
  };

  return (
    <div className="input-box-container">
      <input
        className="input-box"
        placeholder={isMobile ? "Enter AWB Numbers" : "Enter AWB Numbers (Case-sensitive, separate with commas if multiple)"}
        type="text"
        value={awbInput}
        onChange={handleInputChange}
      />
      <button className="track-button" onClick={handleTrackClick}>
        <div style={{ fontFamily: 'Lato', fontWeight: '600' }}>Track</div> &nbsp;{' '}
        <ArrowForwardIcon style={{ fontWeight: '800' }} />
      </button>
    </div>
  );
};

export default InputBox;
