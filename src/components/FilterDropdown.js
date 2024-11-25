/*Not using now, This filter option may be used in future*/
// client/src/components/FilterDropdown.js
import React, { useState } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState([]);

  const handleStatusChange = (status) => {
    // Use the updater function to get the latest state value
    setSelectedStatus((prevStatus) => {
      if (prevStatus.includes(status)) {
        return prevStatus.filter((s) => s !== status);
      } else {
        return [...prevStatus, status];
      }
    });

    // Use the updater function to get the latest state value
    onFilterChange((prevStatus) => {
      if (prevStatus.includes(status)) {
        return prevStatus.filter((s) => s !== status);
      } else {
        return [...prevStatus, status];
      }
    });
  };

  return (
    <div className="filter-options">
      <div
        className={`filter-option ${selectedStatus.includes('Delivered') ? 'selected' : ''}`}
        onClick={() => handleStatusChange('Delivered')}
      >
        Delivered
      </div>
      <div
        className={`filter-option ${selectedStatus.includes('Out for Delivery') ? 'selected' : ''}`}
        onClick={() => handleStatusChange('Out for Delivery')}
      >
        Out for Delivery
      </div>
      <div
        className={`filter-option ${selectedStatus.includes('In Transit') ? 'selected' : ''}`}
        onClick={() => handleStatusChange('In Transit')}
      >
        In Transit
      </div>
      <div
        className={`filter-option ${selectedStatus.includes('Cancelled') ? 'selected' : ''}`}
        onClick={() => handleStatusChange('Cancelled')}
      >
        Cancelled
      </div>
    </div>
  );
};

export default FilterDropdown;
