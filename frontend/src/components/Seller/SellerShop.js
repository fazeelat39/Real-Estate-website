import React, { useState } from 'react'
import loginIcons from '../../assets/sign in 2.jpg'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../../helpers/imagesTobase64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const SellerShop = () => {

  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
 
  const [data,setData] = useState({
    
    //lastname: "",
    //username:"",
    name: "",
    email: "",
    password : "",
    confirmPassword : "",
    phoneNumber:"",
    profilePic:"",
    realEstate :"",
    zipCode:"",
    address: "",
      
  })

  const navigate = useNavigate()

  const handleOnChange = (e) =>{
    const { name, value } = e.target

    setData((preve)=> {
      return{
             ...preve,
             [name] : value
      }
    })
  }

const handleUploadPic = async(e) => {
const file = e.target.files[0]
const imagePic = await imageTobase64(file)
  setData((preve)=>{
    return{
      ...preve,
      profilePic : imagePic
    }
  })


}


const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (data.password === data.confirmPassword) {

    // Set a timeout duration (in milliseconds)
    const TIMEOUT_DURATION = 10000; // 10 seconds

    // Create an AbortController to handle timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    try {
      // Fetch request with abort signal
      const dataResponse = await fetch('http://localhost:8080/api/seller-create', {
        method: 'POST',
        body : data,
        headers: {
          "content-type": "application/json",
          'Connection': 'keep-alive',
        },
        body: JSON.stringify(data),
       
        signal: controller.signal, // Attach signal to request
      })

     

      // Clear the timeout if the request is successful
      clearTimeout(timeoutId);

      // Parse the response
      const dataApi = await dataResponse.json();

      // Handle success and error responses
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/seller-login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
       else {
            toast.error(dataApi.message);
        }
    }
    
      
    catch (error) {
      // Handle timeout or other fetch errors
      if (error.name === 'AbortError') {
        toast.error("Request timed out. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
        console.error(error);
      }
    }
    
  } else {
    toast.error("Password does not match");
  }
};

   
   
  return (
    <section id='seller'>
      <div className='mx-auto container p-4'>

         <div className='bg-white p-4  w-full sm:max-w-xl mx-auto border'>
          <div className='w-20 h-24 mx-auto relative overflow-hidden rounded-full cursor-pointer '>
          <img src={data.profilePic || loginIcons} alt='login icon'/>
          </div>
          
          <form>
            <label>
            
              <div className='text-xs bg-opacity-80 bg-slate-200 text-red-800 pb-4 pt-2 cursor-pointer text-center' >
                Upload Photo
              </div>
              <input type='file' className='hidden' onChange={handleUploadPic}/>
            </label>
          </form>


      
          <form className='pt-6 flex flex-col gap-2 font-serif' onSubmit={handleSubmit}>

           <div className='grid'>
              <label className='p-2 font-bold'>Name:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='text' 
                placeholder='Enter your name '
                name='name'
                value={data.name}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>

             
            
            <div className='grid'>
              <label className='p-1 font-bold'>Email:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='email' 
                placeholder='Enter Email' 
                name='email'
                value={data.email}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>

            <div className='grid'>
              <label className='p-2 font-bold'>Estate Name:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='realEstate' 
                placeholder='Enter your real estate name '
                name='realEstate'
                value={data.realEstate}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>

            <div className='grid'>
              <label className='p-1 font-bold'>Phone Number:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='phoneNumber' 
                placeholder='0300-111-2222' 
                name='phoneNumber'
                value={data.phoneNumber}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>
            <div className='grid'>
              <label className='p-2 font-bold'>Address:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='text' 
                placeholder='Enter your real estate address '
                name='address'
                value={data.address}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>

            <div className='grid'>
              <label className='p-1 font-bold'>Zip Code:</label>
              <div className='bg-slate-200 p-3 rounded font-bold' >
                <input 
                type='zipCode' 
                placeholder='zipCode' 
                name='zipCode'
                value={data.zipCode}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent font-bold'/>
              </div>
            </div>



            <div >
              <label className='p-2 font-bold'>Password:</label>
              <div className='bg-slate-200 p-3 flex rounded font-bold' >
                <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter Password' 
                name='password'
                value={data.password}
                onChange={handleOnChange}
                required
                className='w-full h-full outline-none bg-transparent font-bold'/>
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>  
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                      :
                      (
                        <FaRegEye/>
                      )

                    }
                   </span>
                </div>
              </div>

             
            </div>

            <div >
              <label className='p-2 font-bold '>Confirm Password:</label>
              <div className='bg-slate-200 p-3 flex rounded font-bold ' >
                <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder='Enter Confirm Password' 
                name='confirmPassword'
                value={data.confirmPassword}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent '/>
                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                  <span>  
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      )
                      :
                      (
                        <FaRegEye/>
                      )

                    }
                   </span>
                </div>
              </div>

             
            </div>

            <button className='bg-slate-700  hover:bg-slate-900 text-white px-4 py-4 font-extrabold  w-full max-w-[400px] rounded-lg hover:scale-110 transition-all mx-auto block mt-6'>
              Become   Seller</button>


          </form>

          <p className='my-5 font-bold'> Already have an seller account?  <Link to={"/seller-login"} className='text-red-600 hover:text-red-700 hover:underline'>Login Seller</Link> </p>

          </div>

      </div>
    </section>
    
  )
}

export default SellerShop

