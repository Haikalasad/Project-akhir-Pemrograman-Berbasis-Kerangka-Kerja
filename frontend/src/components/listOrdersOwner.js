import React, { useState, useEffect } from 'react';
import '../styling/ListOrderOwner.css';
import { FaHeart } from 'react-icons/fa';
import { useUser } from '../UserContext';

const MyOrderOwner = () => {
  const { userId } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3001/api/kost/ordersOwner/${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Data from server:', data);
          setOrders(data.data.map(order => ({ ...order, isConfirmed: order.status_pesanan === "Sudah Bayar" })));


        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, [userId]);

  const formatDateString = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const confirmPayment = (orderId) => {
    console.log('orderId:', orderId);
    console.log('userId:', userId);

    // Replace with your server endpoint for confirming payment
    fetch(`http://localhost:3001/api/kost/confirmPayment/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }), // Send userId in the request body
    })
      .then(response => response.json())
      .then(data => {
        console.log('Payment confirmation response:', data);

        // Update the state or perform any other necessary actions
        if (data.success) {
          // Setelah konfirmasi pembayaran berhasil, perbarui state
          setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order => {
              if (order.id === orderId) {
                return { ...order, isConfirmed: true, status_pesanan: 2 }; // Status Pesanan: Sudah bayar
              }
              return order;
            });
            console.log('Updated Orders:', updatedOrders);
            return updatedOrders;
          });
          
        }
      })
      .catch(error => console.error('Error confirming payment:', error));
  };

  return (
    <div className="myorder-section">
      <h1 className="myorder-title">List Pesanan</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div className="orderDetails" key={order.id}>
            <div className="fotokost">
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
              <div className="detail-section">
                <h3 className="detail">Detail Pemesan</h3>
                <p className="nama">Nama pemesan : {order.nama_user}</p>
                <p className="email">Email pemesan : {order.email_user}</p>
              </div>
              <div className="additionalInfo">
                <p className='status'>Status Pesanan: {order.status_pesanan}</p>
                <p className='tanggal'>Rentang tanggal: {formatDateString(order.Tanggal_mulai)} - {formatDateString(order.Tanggal_berakhir)} </p>
                <p className='harga'>Total Harga: Rp {order.Total}</p>
              </div>
              <button
                onClick={() => confirmPayment(order.id)}
                className="konfirmasi"
                disabled={order.isConfirmed}
              >
                {order.isConfirmed ? 'Pembayaran Dikonfirmasi' : 'Konfirmasi Pembayaran'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrderOwner;
