import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uplodImages';
import DisplayImage from './DisplayImage';
import { MdDeleteForever } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'


const UploadProduct = ({
    onClose,
    fetchData
}) => {
    const [data,setData] = useState({
        productName : "",
        brandName  : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""

    })
    const [openFullScreenImage,setOpenFullScreenImage]= useState(false)
 
    const [fullScreenImage,setFullScreenImage]= useState("")

    const handleOnChange = (e)=>{
      const {name,value} = e.target
        setData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
      })
    } 

    

    const handleUploadProduct = async(e)=> {
      const file = e.target.files[0]
      const uploadImageCloudinary = await uploadImage(file)

      setData((preve)=>{
        return{
          ...preve,
          productImage : [ ...preve.productImage,uploadImageCloudinary.url]
        }
      })
    }

    const handleDeleteProductImage = async(index)=>{
      console.log("image index", index)

      const newProductImage = [...data.productImage]
      newProductImage.splice(index,1)
      setData((preve)=>{
        return{
          ...preve,
          productImage : [ ...newProductImage]
        }
      })
    }
    {/**upload product */}
    const handleSubmit = async(e) => {
      e.preventDefault()
   
      const response = await fetch(SummaryApi.uploadProduct.url,{
        method : SummaryApi.uploadProduct.method,
        credentials :'include',
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const responseData = await response.json()

      if(responseData.success){
        toast.success(responseData?.message)
        onClose()
        fetchData()
      }

      if(responseData.error){
        toast.error(responseData?.message)
      }
      
    }
  return (
<div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden '>
       <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-xl'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl cursor-pointer ' onClick={onClose}>
            <FaWindowClose />
          </div>
        </div>

        <form className='grid p-4 gap-3 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit} >

            {/**product name */}
            <label htmlFor='productName'>Product Name : </label>
            <input type='text' id='productName' placeholder='enter product name' name='productName' value={data.productName} onChange={handleOnChange} 
            className='p-2 border-2 bg-slate-100 rounded' required />

            {/**brand name */}

            <label htmlFor='brandName' className='mt-3'>Brand Name : </label>
            <input type='text' id='brandName' placeholder='enter brand name' name='brandName' value={data.brandName} onChange={handleOnChange} 
            className='p-2 border-2 bg-slate-100 rounded' required />

            {/** category*/}

            <label htmlFor='category'className='mt-3'> Category : </label>
            <select value={data.category} name='category' onChange={handleOnChange}  className='p-2 border-2 bg-slate-100 rounded ' required>
            <option className='font-semibold'  value={""} >Select Category</option>

              
              {
                productCategory.map((el,index)=>{
                  return(
                    <option value={el.value} key={el.value+index}> {el.label}</option>
                  
                  )
                })
              }
             </select>

            {/** productImage*/}

            <label htmlFor='productImage'className='mt-3'>Product Image : </label>

          <div className='p-2 border-2 bg-slate-100 rounded h-32 w-full flex justify-center items-center' >            
            <label htmlFor='uploadImageInput'>  

                <div className='text-slate-500 flex justify-center items-center flex-col gap-2 cursor-pointer'>
                 <span className='text-5xl'><FaCloudUploadAlt /></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} required/>
                </div>  
            </label>

          </div>

           
          <div>
              {
                data?.productImage[0]? (
                  <div className='flex items-center gap-2 '>
                    {
                       data.productImage.map((el,index)=>{
                       return(
                       <div className='relative'> 
                          <img src={el} alt={el} width={100} height={80} 
                           className='bg-slate-100 border cursor-pointer  ' 
                          onClick={()=>{
                           setOpenFullScreenImage(true)
                           setFullScreenImage(el)

                         }}/>
                           
                          <div className='absolute bottom-0 right-0 top-0 cursor-pointer text-xl hover:scale-110 transition-all pt-0.5' onClick={()=>handleDeleteProductImage(index)}>
                            <MdDeleteForever />
                          </div> 
                        </div>
                      )
                     })
                    }
                  </div>
               
                ) : (
                  <p className='text-red-600 text-sm'>* please upload product image</p>
                )
              }
            </div>


            

            {/**description */} 

            <label htmlFor='description'className='mt-3'>Description : </label>
            
            <textarea className='h-28 bg-slate-100 border resize-none p-1.5 rounded' 
            placeholder='enter product description'  
            name='description'
            value={data.description}
             rows={3} onChange={handleOnChange} required>

            </textarea>

            {/**price */} 

            <label htmlFor='price'className='mt-3'>price : </label>
            <input type='number' id='price' placeholder='enter price ' name='price' value={data.price} onChange={handleOnChange} 
            className='p-2 border-2 bg-slate-100 rounded' required />

            {/**sellingPrice */} 

            <label htmlFor='sellingPrice'className='mt-3'>Selling Price : </label>
            <input type='number' id='sellingPrice' placeholder='enter selling Price ' name='sellingPrice' value={data.sellingPrice} onChange={handleOnChange} 
            className='p-2 border-2 bg-slate-100 rounded' required />

            {/**upload button */}
           <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 mt-10'>Upload Product</button>

        </form>



    </div>

    {/**display full screen image */}

    {
      openFullScreenImage && (
        
        <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
      )
    }
</div>
  )
}

export default UploadProduct