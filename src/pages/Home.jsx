import React from 'react'
import Products from '../components/Products'
import Navbar from '../components/Navbar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigation = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem('token'))
    {
        navigation('/home')
    }
    else{
        navigation('/')
    }
  },[])

  return (
    <div className='area'>
      <Navbar/>
       <section>
        <h3>Products</h3>
        <Products/>
       </section>
    </div>
  )
}

export default Home