import React from 'react';
import './AwbModal.css'; 

const AwbModal = ({ data, onClose, showModal }) => {
  return (
    <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {data && data.data && (
          <>
            <h4> Details for AWB Number: {data.data.AwbNumber}</h4>
            <table>
              <tbody>
                <tr>
                  <td>Consignor Name:</td>
                  <td>{data.data.ConsignorName}</td>
                </tr>
                <tr>
                  <td>Booking Date:</td>
                  <td>{data.data.BookingDate}</td>
                </tr>
                <tr>
                  <td>Origin - Destination:</td>
                  <td>{data.data.Origin} - {data.data.Destination} </td>
                </tr>
                <tr>
                  <td>Number of Articles:</td>
                  <td>{data.data.NoOfArticles}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AwbModal;
