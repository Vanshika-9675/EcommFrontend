import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const items = useSelector(state => state.cart);

  return (
    <div className='navbar'>
      <span className='logo'>ONLINE STORE</span>
      <div>
        <NavLink exact="true" to='/home' className='navLink' activeClassName='active'>Home</NavLink>
        <NavLink to='/myOrder' className='navLink' activeClassName='active'>My Orders</NavLink>
        <NavLink to='/cart' className='navLink cartCount' activeClassName='active'>Cart: {items.length}</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
