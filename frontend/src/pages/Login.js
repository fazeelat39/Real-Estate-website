import React, { useContext, useState } from 'react'
import loginIcons from '../assets/sign in 2.jpg'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  
  const [showPassword,setShowPassword] = useState(false)
  const [data,setData] = useState({
    email: "",
    password : "",
   })


   const navigate = useNavigate()
   const { fetchUserDetails ,fetchUserAddToCart } = useContext(Context)

  const handleOnChange = (e) =>{
    const { name, value } = e.target

    setData((preve)=> {
      return{
             ...preve,
             [name] : value
      }
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
      const dataResponse = await fetch(SummaryApi.signIn.url,{
        method : SummaryApi.signIn.method,
        credentials: 'include',
        headers: {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
        
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails() 
        fetchUserAddToCart()
        
       
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

      //toast(dataApi.message)
  
     // console.log("data",dataApi)

    
   }
   
   console.log("data login",data)

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>

        <div className='bg-white p-4  w-full max-w-sm mx-auto border'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icon'/>
          </div>

          

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          

          
              


            <div className='grid'>
              <label className='p-2'>Email:</label>
              <div className='bg-slate-300 p-3 rounded' >
                <input 
                type='email' 
                placeholder='Enter Email' 
                name='email'
                value={data.email}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>


            <div >
              <label className='p-2 '>Password:</label>
              <div className='bg-slate-300 p-3 flex rounded ' >
                <input 
                type={showPassword ? "text" : "password"} 
                placeholder='Enter Password' 
                name='password'
                value={data.password}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'/>
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

             <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600 pt-3 pr-2 '>
             Forgot Password
             </Link>

            </div>

            <button className='bg-slate-700  hover:bg-slate-900 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Login</button>


          </form>

          <p className='my-5'> Don't have account ? <Link to={"/signup"} className='text-red-600 hover:text-red-700 hover:underline'>Sign Up</Link> </p>

          </div>

      </div>
    </section>
  )
}

export default Login