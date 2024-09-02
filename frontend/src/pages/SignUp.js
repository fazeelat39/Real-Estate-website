import React, { useState } from 'react'
import loginIcons from '../assets/sign in 2.jpg'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imagesTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
 
  const [data,setData] = useState({
    
    //lastname: "",
    //username:"",
    name: "",
    email: "",
    password : "",
    confirmPassword : "",
    //phoneNumber:"",
    profilePic:"",
    
      
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


  const handleSubmit = async(e) =>{
    e.preventDefault()

    if(data.password === data.confirmPassword){

      const dataResponse = await fetch(SummaryApi.signUP.url,{
        method : SummaryApi.signUP.method,
        headers: {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
        
      const dataApi = await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

      //toast(dataApi.message)
  
     // console.log("data",dataApi)

    }else{
      toast.error("Password does not Match")

    }
   }
   
   
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>

         <div className='bg-white p-4  w-full max-w-sm mx-auto border'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full cursor-pointer '>
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


      
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

           <div className='grid'>
              <label className='p-2'>Name:</label>
              <div className='bg-slate-300 p-3 rounded' >
                <input 
                type='name' 
                placeholder='Enter your name '
                name='name'
                value={data.name}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>

             
            
 


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
                onChange={handleOnChange}
                required
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

             
            </div>

            <div >
              <label className='p-2 '>Confirm Password:</label>
              <div className='bg-slate-300 p-3 flex rounded ' >
                <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder='Enter Confirm Password' 
                name='confirmPassword'
                value={data.confirmPassword}
                required
                onChange={handleOnChange}
                className='w-full h-full outline-none bg-transparent'/>
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

            <button className='bg-slate-700  hover:bg-slate-900 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Sign Up</button>


          </form>

          <p className='my-5 font-bold'> Already have an account?  <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link> </p>

          </div>

      </div>
    </section>
    
  )
}

export default SignUp