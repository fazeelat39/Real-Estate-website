import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard.'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async()=>{
    const response = await fetch(SummaryApi.allProduct.url,{
      method: 'get',
    })
    const dataResponse = await response.json()

    console.log("product data", dataResponse)
      setAllProduct(dataResponse?.data || [])
    
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between  items-center '>
        <h2 className='font-bold text-xl'>All  Products</h2>
        <button className='border-4 py-2 px-4 border-slate-600 text-slate-600 hover:bg-slate-300  font-extrabold font-serif transition-all'onClick={()=>setOpenUploadProduct(true)}>
          Upload Products</button>
      </div>

      {/**all product */}
      <div className='flex items-center flex-wrap gap-5 pl-4 py-4 h-[calc(100vh-190px)] overflow-y-scroll bg-slate-200'>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          })
        }

      </div>

      {/**upload products componenet */}

      {
        openUploadProduct && (
          <UploadProduct onClose= {()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct} />

        )
      }
    </div>
  )
}

export default AllProducts