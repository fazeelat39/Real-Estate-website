import {componenet, useState } from 'react'

import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import SellerCreate from './pages/SellerCreate'

function App() {

  const disPatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
      
    if (dataApi.success)
      {
        disPatch(setUserDetails(dataApi.data))
      }

  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()


    setCartProductCount(dataApi?.data?.count)
  }

  
  
  useEffect(() => {
  /* user Details*/ 
  fetchUserDetails()
  /**User Details Cart Product */

  fetchUserAddToCart()
  
},[])

  return (
  <>
 <Context.Provider value={{
         fetchUserDetails, // user detail fetch 
         cartProductCount, // current user add to cart product count,
         fetchUserAddToCart 
  }}>
   <ToastContainer />
   <Header/>
   
   
    <main className='min-h-[calc(100vh-100px)] pt-16'>  
    <Outlet/> 
   </main>
   
   <Footer/>
</Context.Provider>


  </>
  
  );
}

export default App;
