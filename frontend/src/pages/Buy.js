// src/PaymentForm.js
import React, { useState } from 'react';
const Buy = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    lastname: '',
    email: '',
    address: '',
    confirmaddress : '',
    phone : '',
    paymentMethod : '',
    terms : '',
    privacy : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add payment processing logic here
    console.log('Payment Data:', formData);
  };

  return (
    <div className='mx-auto container p-4 w-fit'>
      <div className='bg-slate-200 p-4    mx-auto border '>
      <div className=" mx-auto p-8 w-full bg-white shadow-lg rounded-lg">


  <form className="payment-form  className='pt-6 flex flex-col gap-2 "  onSubmit={handleSubmit} >
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>

      <div className="grid">
        <label htmlFor="fullname" >Full Name </label>
        <div className='bg-slate-300 p-3 rounded' >
        <input 
          type="text" 
          id="fullname" 
          name="fullname" 
          value={formData.fullname} 
          onChange={handleChange} 
          required 
          className='w-full h-full bg-transparent outline-none'

        />
      </div></div>

      <div className="grid w-100">
        <label htmlFor="lastname">Last Name </label>
        <div className='bg-slate-300 p-3 rounded' >

        <input 
          type="text" 
          id="lastname" 
          name="lastname" 
          value={formData.lastname} 
          onChange={handleChange} 
          className='w-full h-full outline-none bg-transparent'

          required 
        />
      </div></div>

      <div className="grid">
        <label htmlFor="email">Email</label>
        <div className='bg-slate-300 p-3 rounded' >

        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className='w-full h-full outline-none bg-transparent'

          required 
        />
      </div></div>

      <div className="grid">
        <label htmlFor="phone">Phone Number</label>
        <div className='bg-slate-300 p-3 rounded' >

        <input 
          type="number" 
          id="phone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          className='w-full h-full outline-none bg-transparent'

          required 
        />
      </div></div>
      
      <div className="grid ">
        <label htmlFor="address" >Address</label>
        <p> (Street Address,City,State,Province,ZIP Code , Postal Code,Country)</p>

        <div className='bg-slate-300 p-3 rounded' >

        <input 
          type="address" 
          id="address" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          className='w-full h-full outline-none bg-transparent'

          required 
        />
      </div></div>

      <div className="grid ">
        <label htmlFor="confirmaddress" >Confirm Address</label>

        <div className='bg-slate-300 p-3 rounded' >

        <input 
          type="address" 
          id="confirmaddress" 
          name="confirmaddress" 
          value={formData.confirmaddress} 
          onChange={handleChange} 
          className='w-full h-full outline-none bg-transparent'

          required 
        />
      </div></div>

      

      
      

      <div className="grid">
        <label htmlFor="paymentmethod">Payment Method</label>
        <div className='bg-slate-300 p-3 rounded' >

        <select id="paymentMethod" name="paymentMethod" required  
        className='w-full h-full outline-none bg-transparent'>

            <option value="creditCard">Credit/Debit Card</option>
            <option value="paypal">Jazz Cash</option>
            <option value="bankTransfer">EasyPaisa</option>
            <option value="bankTransfer">Bank Transfer</option>

        </select>

      </div></div>

      <div className="grid">
        <label htmlFor="terms"  
        className='w-full h-full outline-none bg-transparent'>terms </label>

      </div>

      <div className="grid">
        <label htmlFor="confirmaddress" className='w-full h-full outline-none bg-transparent'
        >privacy </label>
      </div>
      <button type="submit" className='bg-slate-600 hover:bg-slate-700 p-4 rounded  hover:text-white'>Submit Payment</button>
    </form>

    </div>
    </div>
    </div>
  );
};

export default Buy;
