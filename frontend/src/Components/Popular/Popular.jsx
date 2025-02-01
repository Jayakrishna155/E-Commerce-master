import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'
export default function Popular() {
  const [data_product,setData_product] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/popularwomen").then((res)=>res.json()).then((data)=> setData_product(data));
  },[])
  return (
    <div className='popular'>
       <h1>POPULAR IN WOMEN</h1>
       <hr />
        <div className="popular-item">
            {data_product.map((data,i)=><Item key={i} id={data.id} name={data.name} image = {data.image} new_price={data.new_price} old_price={data.old_price}/>)}
        </div>
    </div>
  )
}
