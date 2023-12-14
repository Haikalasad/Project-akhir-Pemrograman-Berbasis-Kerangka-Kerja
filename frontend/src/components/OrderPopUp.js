// OrderPopup.js
import React from 'react';
import '../styling/OrderPopup.css'; 

const OrderPopup = ({
  formData,
  totalPrice,
  onChange,
  onConfirmOrder,
  onClose,
}) => {
  const { startDate, endDate, category } = formData;

  return (
    <div className="orderPopupOverlay">
      <div className="orderPopupContent">
        <h2>Order Details</h2>
        <form>
          <div className="formGroup">
            <label htmlFor="startDate">Tanggal mulai sewa :</label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={onChange} />

            <label htmlFor="endDate">Tanggal akhir sewa :</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={onChange} />

            <label htmlFor="category">Kategori:</label>
            <select id="category" name="category" value={category} onChange={onChange}>
              <option value="harian">Harian</option>
              <option value="bulanan">Bulanan</option>
            </select>
          </div>
        </form>
        <p className="totalPrice">Total Price: {totalPrice}</p>
        <div className="buttonGroup">
          <button className="confirmButton" onClick={onConfirmOrder}>
            Confirm Order
          </button>
          <button className="closeButton" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
