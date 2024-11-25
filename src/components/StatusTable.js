import React, { useState } from 'react';
import './StatusTable.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const StatusTable = ({ data, handleGetDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const totalPages = Math.ceil(data.length / resultsPerPage);

  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const indexOfLastResult = validCurrentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = data.slice(indexOfFirstResult, indexOfLastResult);
  
  const handleDetailsClick = (awbNumber) => {
    handleGetDetails(awbNumber);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    let startPage;
    let endPage;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (validCurrentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (validCurrentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = validCurrentPage - 2;
        endPage = validCurrentPage + 2;
      }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => (
      <span
        key={startPage + i}
        className={`page-number ${validCurrentPage === startPage + i ? 'active' : ''}`}
        onClick={() => handlePageChange(startPage + i)}
      >
       <p style={{ fontSize: '13px' }}>{startPage + i}</p>
      </span>
    ));
  };

  const getStatusClass = (status) => {
    if (!status || status.trim() === '') {
      return 'def-status';
    }

    switch (status.toLowerCase()) {
      case 'delivered':
        return 'delivered-status';
      case 'in transit':
        return 'transit-status';
      case 'cancelled':
        return 'cancelled-status';
      case 'out for delivery':
        return 'out-for-delivery-status';
      case 'awb not found':
        return 'error-status';
      default:
        return 'def-status';
    }
  };

  const getStatusContent = (status, date) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <>
            <CheckCircleIcon style={{ fontSize: '20px', color: 'green', verticalAlign: 'middle', marginRight: '4px' }} />
            Delivered (On {date})
          </>
        );
      case 'in transit':
        return (
          <>
            <RvHookupIcon style={{ fontSize: '20px', color: 'orange', verticalAlign: 'middle', marginRight: '4px' }} />
            In Transit
          </>
        );
      case 'cancelled':
        return (
          <>
            <CancelIcon style={{ fontSize: '20px', color: 'black', verticalAlign: 'middle', marginRight: '4px' }} />
            Cancelled
          </>
        );
      case 'out for delivery':
        return (
          <>
            <DeliveryDiningIcon style={{ fontSize: '20px', color: 'green', verticalAlign: 'middle', marginRight: '4px' }} />
            Out for Delivery
          </>
        );
      case '':
        return (
          <>
            <AccessTimeFilledIcon style={{ fontSize: '20px', color: 'black', verticalAlign: 'middle', marginRight: '4px' }} />
            Not Updated
          </>
        );
      default:
        if (status.toLowerCase() === "awb not found") {
          return (
            <>
              <ErrorIcon style={{ fontSize: '20px', color: 'red', verticalAlign: 'middle', marginRight: '4px' }} />
              AWB Not Found
            </>
          );
        } else {
          return (
            <>
              <AccessTimeFilledIcon style={{ fontSize: '20px', color: 'black', verticalAlign: 'middle', marginRight: '4px' }} />
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </>
          );
        }
    }
  };

  return (
    <div className="info-container">
      <div className="table-container">
        <table className="status-table">
          <thead>
            <tr>
              <th>AwbNumber</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map((item, index) => (
              <tr key={index}>
                <td className={`default-status ${getStatusClass(item.Status)}`}>
                  {item.AwbNumber}
                </td>
                <td className={`default-status ${getStatusClass(item.Status)}`}>
                  {getStatusContent(item.Status, item.Date)}
                </td>
                <td className={`default-status ${getStatusClass(item.Status)}`}>
                  {item.Status.toLowerCase() !== 'awb not found' && (
                    <div className="details-button" onClick={() => handleDetailsClick(item.AwbNumber)}>More Info</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 9 && (
        <div className="current-page-info">
          Page {validCurrentPage} of {totalPages}(Results {Math.min(indexOfLastResult, data.length)} of {data.length})
        </div>
      )}
      {data.length > 9 && (
        <div className="pagination-container">
          <div
            onClick={() => handlePageChange(validCurrentPage - 1)}
            disabled={validCurrentPage === 1}
            className="pagination-button"
          >
            <NavigateBeforeIcon style={{ fontSize: '20px' }} />
          </div>
          {renderPageNumbers()}
          <div
            onClick={() => handlePageChange(validCurrentPage + 1)}
            disabled={validCurrentPage === totalPages}
            className="pagination-button"
          >
            <NavigateNextIcon style={{ fontSize: '20px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusTable;
