import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import OrderPopup from './OrderPopUp';
import '../styling/DetailKost.css';
import { useUser } from '../UserContext';

const DetailKost = ({ id }) => {
  const { userId, loading } = useUser();
  console.log('User ID:', userId);

  const [kostDetails, setKostDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!loading) {
      fetch(`http://localhost:3001/api/kost/detail/${id}`)
        .then(response => response.json())
        .then(data => setKostDetails(data.data))
        .catch(error => console.error('Error fetching kost details:', error));
    }
  }, [id, loading]);

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.startDate, formData.endDate, kostDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateTotalPrice = () => {
    const startDateMillis = Date.parse(formData.startDate);
    const endDateMillis = Date.parse(formData.endDate);

    if (isNaN(startDateMillis) || isNaN(endDateMillis)) {
      console.error('Invalid start or end date');
      setTotalPrice(0);
      return;
    }

    const daysDifference = (endDateMillis - startDateMillis) / (1000 * 60 * 60 * 24);
    setTotalPrice(daysDifference * (kostDetails ? kostDetails.Harga : 0));
  };

  const handleOrderConfirmation = () => {
    if (!kostDetails) {
      console.error('Error: kostDetails is null');
      return;
    }

    const orderData = {
      idUser: userId,
      idKost: id,
      Tanggal_mulai: formData.startDate,
      Tanggal_berakhir: formData.endDate,
      Total: totalPrice,
      Kategori: formData.category,
    };

    fetch(`http://localhost:3001/api/kost/order/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Order confirmation response:', data);
        setShowPopup(false);
      })
      .catch(error => console.error('Error confirming order:', error));
  };

  if (!kostDetails) {
    return <p className="loading">Loading...</p>;
  }

  const { nama, deskripsi, foto, alamat, jarak, suka, fasilitas, kategori, jenis, Harga } = kostDetails;

  return (
    <div className="detailPage">
      <h1 className="Detailtitle">Detail kost</h1>

      <div className="productDetails">
        <div className="productImage">
          <img src={foto} alt={nama} />
        </div>
        <div className="productInfo">
          <div className="header-section">
            <h1 className="namakost">{nama}</h1>
            <div className="like-section">
              <div className="loveIcon">
                <FaHeart />
              </div>
              <span className="sukaCount">{suka}</span>
            </div>
          </div>
          <div className="deskripi-section">
            <h5 className="Deskripsi">Deskripsi</h5>
            <p className="productDescription">{deskripsi}</p>
          </div>
          <div className="additionalInfo">
            <p>Fasilitas: {fasilitas}</p>
            <p>Jarak: {jarak}</p>
            <p>Kategori: {kategori}</p>
            <p>Jenis: {jenis}</p>
            <p>Alamat : {alamat}</p>
            <p className='harga'>Harga: {Harga}</p>
          </div>
          <button className="pesanButton" onClick={() => setShowPopup(true)}>
            Pesan
          </button>
        </div>
      </div>

      {showPopup && (
        <OrderPopup
          formData={formData}
          totalPrice={totalPrice}
          onChange={handleInputChange}
          onCalculateTotal={calculateTotalPrice}
          onConfirmOrder={handleOrderConfirmation}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default DetailKost;