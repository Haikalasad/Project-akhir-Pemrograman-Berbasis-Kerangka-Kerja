import React, { useState, useEffect } from 'react';
import '../styling/MyOrder.css'; // Adjust the path accordingly
import { FaHeart } from 'react-icons/fa';
import { useUser } from '../UserContext';

const MyOrder = () => {
  const { userId } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/kost/orders/${userId}`)
      .then(response => response.json())
      .then(data => setOrders(data.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, [userId]);

  console.log(userId)

  const formatDateString = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <div className="myorder-section">
      <h1 className="myorder-title">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div className="orderDetails" key={order.id}>
            <div className="orderImage">
              <img src={order.foto} alt={order.nama} />
            </div>
            <div className="orderInfo">
              <div className="header-section">
                <h1 className="namaOrder">{order.nama}</h1>
                <div className="like-section">
                  <div className="loveIcon">
                    <FaHeart />
                  </div>
                  <span className="sukaCount">{order.suka}</span>
                </div>
              </div>
              <div className="deskripsi-section">
                <h5 className="Deskripsi">Deskripsi</h5>
                <p className="kostDeskripsi">{order.deskripsi}</p>
              </div>
              <div className="additionalInfo">
                <p>Fasilitas: {order.fasilitas}</p>
                <p>Alamat: {order.alamat}</p>
                <p>Jarak: {order.jarak} Km</p>
                <p>Jenis: {order.jenis}</p>
                <p className='status'>Status Pesanan: {order.status_pesanan}</p>
                <p className='tanggal'>Rentang tanggal: {formatDateString(order.Tanggal_mulai)} - {formatDateString(order.Tanggal_berakhir)} </p>
    
                <p className='harga'>Total Harga: Rp {order.Total}</p>
              </div>
              <button className="invoiceButton">Invoice</button>
            </div>
            
          </div>
          
        ))
      )}
    </div>
    
  );
};

export default MyOrder;
