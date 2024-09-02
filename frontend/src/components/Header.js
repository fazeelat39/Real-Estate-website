import React, { useContext, useState } from 'react'
import Logo from '../assets/Logo/home.png' ;
import { FaSearch  } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate,  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch =  useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const[search,setSearch] = useState(searchQuery)





  const handleLogout = async () => {
const fetchData = await fetch(SummaryApi.logout_user.url,{
  method : SummaryApi.logout_user.method,
  credentials : 'include'
})

const data = await fetchData.json()

if(data.success){
  toast.success(data.message)
  dispatch(setUserDetails(null))
  navigate("/")
}

  if(data.error){
    toast.error(data.message)
  }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
        <img src={Logo} alt='Wattoo Glass' className='w-28 h-16  mix-blend-multiply pt-1'/>
         
         </Link>
        </div>

       <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
           <input type='text' placeholder='search products here...' className='w-full outline-none 'onChange={handleSearch}/>
             <div className='text-lg min-w-[50px] h-8 bg-slate-900 flex items-center justify-center rounded-r-full text-white'> 
             <FaSearch /> </div>
       </div>

        <div className=' flex items-center gap-6 '> 

          <div className=' relative flex justify-center'>
            {
              user?._id && (
               <div className='text-3xl cursor-pointer relative flex justify-center'onClick={()=>setMenuDisplay(preve => !preve)}>
             {
                user?.profilePic ? (
                <img src={user?.profilePic} className='w-11 h-11 rounded-full'alt={user?.name}/>
                ) : 
                (
                <FaRegUserCircle/>

                )
            }            
           </div>
              )
          
            }
           

           {
            menuDisplay && (
           <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
             <nav>
              {
                user?.role === ROLE.ADMIN && (
                <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-200 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>
                  Admin Panel
                </Link>
                )
              }
              
             </nav>

           </div>

            )
           }

             
          </div>

          

         <Link to={"/cart"} className='text-2xl relative'> 
          <span><FaShoppingCart /></span>

          {
            user?._id && (
                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                 <p className='text-xs'>{context?.cartProductCount}</p>
                </div>
            )
          }
        </Link>


        <div>
            <Link to={"/seller-create"} className='bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 ' >
            Seller
            </Link>
            </div>


            <div>
            <Link to={"/signup"} className='bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 ' >
            SignUp
            </Link>
            </div>

            <div>
            <Link to={"/seller-login"} className='bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 ' >
            SellerLogin
            </Link>
            </div>


            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className='border-4 border-slate-700  hover:bg-slate-300 px-4 py-1.5 font-semibold transition-all'>LogOut</button>
                )
                :(
                     <Link to={"/Login"} className='bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 ' >
                      Login
                    </Link>
                )
              }
              
            </div>
            
            
         

        </div>

      </div>
    </header>
    






    
  )
}

export default Header