import React from 'react'
import SuccessImage from  '../assets/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4'>
    <img  
    src={SuccessImage}
    width={150}
    height={150} 
   className='mix-blend-multiply' 
    />
    <p>Order Successfully</p>

    <Link to={"/order"} className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold  hover:bg-green-500 '>Back to Order</Link>
</div>

  )
}

export default Success