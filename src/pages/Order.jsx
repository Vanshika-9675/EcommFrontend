import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function Order() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');


  const fetchOrders = async () => {
    try {
      const res = await fetch('https://ecomm-2.onrender.com/api/v1/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res);
      
      if (res.ok) {                               
        const data = await res.json();
        setOrders(data.orders);
      } 
      else {
        console.log("Failed to fetch");
      }
    }
    catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className='area'>
      <Navbar/>
       <h1 style={{textAlign:'center'}}>My Orders</h1>
      <div className="orderWrapper">
        {orders.length === 0 ? (
          <h1>You haven't ordered anything!!</h1>
        ) : (
          orders.map(order => (
            <div className="orderCard" key={order._id}>
              <img src={order.image}/>
              <h5>Rs. {order.price}</h5>
              <h5>Rs. {order.totalprice}</h5>
              <div>
                <span>Quantity: {order.quantity}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
