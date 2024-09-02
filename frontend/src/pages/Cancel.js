import React from 'react'
import CancelImage from '../assets/cancel.gif'
import { Link } from 'react-router-dom'
const Cancel = () => {
  return (
<div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4'>
    <img  
    src={CancelImage}
    width={150}
    height={150} 
   className='mix-blend-multiply' 
    />
    <p>Order Cancel Successfully</p>

    <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold  hover:bg-green-500 '>Go to Cart</Link>

</div>  
)
}

export default Cancel