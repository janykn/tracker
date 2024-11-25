// Import necessary libraries and components

import React, { useState } from 'react';
import InputBox from './components/InputBox';
import StatusTable from './components/StatusTable';
import Loader from './components/Loader';
import AwbModal from './components/AwbModal';
import './App.css';
import Header from './components/Header';

const App = () => {
  const [statusData, setStatusData] = useState([]);
  const [error, setError] = useState(null);
  const [awbInput, setAwbInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [modalData, setModalData] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const handleGetDetails = async (awbNumber) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/awb/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ awbNumber }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data2',data);
        setModalData(data); 
        setShowModal(true); 
      } else {
        console.log(response);
        setError('Failed to fetch details');
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setError('Error fetching details');
    }
  };

  const handleTrack = async (awbNumbersArray) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const apiBaseURL = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiBaseURL}/awb/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ awbNumbers: awbNumbersArray }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatusData(data.data);
        setError(null);
        setAwbInput(awbNumbersArray.join(', '));
        setShowTable(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Server Error');
      }
    } catch (error) {
      console.error('Client Error:', error);
      setError(error.message || 'Client Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card-container">
        <div className="left-half">
          <h1 style={{ fontSize: '20px' }}>AirwayBill(AWB) Tracker<span className='NavScs' style={{ fontSize: '12px', color: 'rgba(0,0,0,0.5' }}>&nbsp;&nbsp;(From Navata SCS)</span></h1>
          <h5 style={{ color: 'rgba(0,0,0,0.7)' }}>
            (&nbsp;AWB numbers are case-sensitive. If entering multiple AWB's, use commas (e.g., abc123, ab125)&nbsp;)
          </h5>
          <InputBox onTrack={handleTrack} />
          {loading && <Loader />}
          {error && <div className="error-message">{error}</div>}
        </div>
        {showTable && <StatusTable data={statusData} handleGetDetails={handleGetDetails} />}
      </div>
      {showModal && <AwbModal data={modalData} onClose={() => setShowModal(false)} showModal={showModal} />}
      <div className="overlay"></div>
    </div>
  );
};

export default App;
