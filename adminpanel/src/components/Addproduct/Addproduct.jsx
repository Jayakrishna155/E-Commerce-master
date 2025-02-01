import React, { useState } from 'react'
import './Addproduct.css'
import upload_area from '../../Assets/Admin_Assets/upload_area.svg'
export default function Addproduct() {
    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",
    })
    const changeHandler = (e)=>{
         setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const imageHandler = (e)=>{
            setImage(e.target.files[0]);
    }
    const Add_product = async()=>{
        let formData = new FormData();
        formData.append('product', image);
        let responsedata;
    
        await fetch("http://localhost:4000/upload", {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => responsedata = data);
    
        if (responsedata && responsedata.success) {
            productDetails.image = responsedata.image_url;
            console.log(productDetails);
            await fetch("http://localhost:4000/addproduct",{
                method:"POST",
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body :JSON.stringify(productDetails)
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed");
                
            })
        }
    }
  return (
    <div className='add-product'>
        <div className="items-fields">
            <p>Product title</p>
            <input value={productDetails.name} name='name' onChange={changeHandler} type="text" placeholder='type here ..' />
        </div>
        <div className="add-product-price">
             <div className="items-fields">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler}  type="number" name="old_price" placeholder='typehere'/>
             </div>
             <div className="items-fields">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler}  type="number" name="new_price" placeholder='typehere'/>
             </div>
        </div>
        <div className="add-product-category">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler}  name="category" className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="add-product-upload">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='add-product-thumnail-img' alt="" />
                <input  onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </label>
            <button onClick={()=>Add_product()} className='add-product-btn'>Add</button>
        </div>
    </div>
  )
}
