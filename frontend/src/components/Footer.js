import React from 'react'
import { Link } from 'react-router-dom'
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa"
import { FaSquareWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-slate-200 min-h-[calc(50vh-50px)]  '>
     <div className='container mx-auto p-4 px-36'>
      
     <p className='text-center font-bold font-serif'>HomeTech Haven</p>
     <h1 className='font-bold text-xl font-serif pb-5'>Contact Us </h1>




     <div className= 'absolute  right-80 px-5 mt-8  border-4  bg-slate-900 text-white p-3 hover: transition-all'>
     <Link to={"/signup"} >Get Started</Link>
     </div>

     <div className= 'absolute  right-44 px-5 mt-8  border-4  bg-slate-900 text-white p-3 hover: transition-all'>
     <Link to={"/ourcompany"} >Know Us</Link>
     </div>

  <div className='  items-center  absolute pl-96 '>
    <div className='font-bold pb-2'>
      <h1>Social Icons</h1>
    </div>
      <div className='flex gap-4 pb-2 hover:underline'>
      <FaSquareInstagram  className='pt-2 text-2xl'/>
      <Link to ={"https://www.instagram.com/"} target='blank'>Instagram</Link>
      </div>

      <div className='flex gap-4 pb-2 hover:underline'>
       <FaYoutube className='pt-2 text-2xl '/> 
      <Link to ={"http://www.youtube.com/"} target='blank'>Youtube</Link>
      </div>

      <div className='flex gap-4 pb-2 hover:underline'>
      <FaFacebook className='pt-2 text-2xl'/>
      <Link to ={"https://www.facebook.com/"} target='blank'>Facebook</Link>
      </div>

      <div className='flex gap-4 pb-2 hover:underline'>
       <FaTwitter className='pt-2 text-2xl'/> 
      <Link to ={"http://www.twitter.com/"} target='blank'>Twitter</Link>
      </div>

      <div className='flex gap-4 pb-2 hover:underline'>
       <FaSquareWhatsapp className='pt-2 text-2xl'/> 
      <Link to ={"http://www.whatsapp.com/"} target='blank'>whatsapp</Link>
      </div>

  </div>


    <div>
      <h1>Email Id : </h1>
     <p className='text-red-600 hover:text-red-700  cursor-pointer group : hover:underline '>homeappliances@gmail.com</p>
     <p>Phone Number :</p>
     <p className='text-red-600 hover:text-red-700  cursor-pointer group : hover:underline' > 03025752586</p>
     <p className='text-red-600 hover:text-red-700  cursor-pointer group : hover:underline' > 03025752586</p>
     </div>

    </div>


     {/**mobile version */}
     <div className='flex h-full w-full overflow-hidden md:hidden'></div>

    </footer>
    
  )
}

export default Footer