import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { remove, increase, decrease,removeAll} from '../store/cartSlice';
import Navbar from '../components/Navbar'

function Cart() {
  const products = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

 const addOrder = async (data) => {
    try {
        const res = await fetch('https://ecomm-2.onrender.com/api/v1/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
          });

        if (res.ok) {
            console.log("Product added to order List!!");
        }
    } catch (error) {
        console.log("Cannot add product to order list");
    }
};

  const handleRemove = (id) =>{
    dispatch(remove(id));
  }
  const inc = (id) => {
    dispatch(increase(id))
  }
  const dec = (id) => {
    dispatch(decrease(id))
  }

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(removeAll());
    products.forEach(async (product) => {
        await addOrder(product);
    });
    alert("Order Successfull")
};

  return (
    <div className='area'>
      <Navbar />
      <h3>Cart</h3>
      <div className="shopping">
      <div className="cartWrapper">
      {products.length === 0 ? (
          <h1>Nothing in the cart :(</h1>
        ): (
         products.map(p => (
          <div className="cartCard" key={p._id}>
            <img src={p.image} alt="" />
            <h5>{p.title}</h5>
            <h5>Rs. {p.totalprice}</h5>
            <div>
              <button onClick={() => inc(p._id)}>+</button>
              <span>&nbsp;&nbsp; Quantity: {p.quantity} &nbsp;&nbsp;</span>
              <button onClick={() => dec(p._id)}>-</button>
            </div>
            <button className='btn' onClick={()=>handleRemove(p._id)}>Remove</button>
          </div>
        ))
      )}
      </div>
     <div className="order">
         <button className='btn' onClick={(e)=>handleOrder(e)}>ORDER NOW</button>
     </div>
      </div>
    
    </div>
  )
}

export default Cart
