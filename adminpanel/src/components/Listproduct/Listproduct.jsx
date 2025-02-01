import React, { useEffect, useState } from 'react'
import './Listproduct.css'
import remove_icon from'../../Assets/Admin_Assets/cross_icon.png'
export default function Listproduct() {
  const [allproducts,setAllproducts] =useState([]);
  const fetchInfo=async()=>{
      await fetch("https://e-commerce-backend-91i0.onrender.com/allproducts")
      .then((res)=>res.json())
      .then((data)=>{setAllproducts(data)})
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const removeProduct = async(id)=>{
    await fetch("https://e-commerce-backend-91i0.onrender.com/deleteproduct",{
       method:"POST",
       headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
       },
       body: JSON.stringify({id: id})
    });
    await fetchInfo();
 } 
  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="list-product-format-main">
           <p>Products</p>
           <p>Title</p>
           <p>Old Price</p>
           <p>New Price</p>
           <p>Category</p>
           <p>Remove</p>
        </div>
        <hr />
        <div className="listproduct-allproducts">
  {allproducts.length > 0 ? (
    allproducts.map((product, index) => (
      <React.Fragment key={index}>
        <div className="list-product-format-main list-product-format">
          <img src={product.image} alt="" className="list-product-icon" />
          <p>{product.name}</p>
          <p>${product.old_price}</p>
          <p>${product.new_price}</p>
          <p>{product.category}</p>
          <img onClick={() => removeProduct(product.id)} src={remove_icon} alt="" className="list-product-remove-icon" />
        </div>
        <hr />
      </React.Fragment>
    ))
  ) : (
    <h3 style={{textAlign:"center",color:"red"}}>No products available</h3>
  )}
</div>

    </div>
  )
}
