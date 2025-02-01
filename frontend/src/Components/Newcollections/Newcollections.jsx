import React, { useEffect, useState } from 'react'
import './Newcollections.css'
import Item from '../Items/Item'
export default function Newcollections() {
  const [newCollections,setNewCollections] = useState([]);
  useEffect(()=>{
       fetch("https://e-commerce-backend-91i0.onrender.com/newcollections").then((res)=>res.json()).then((data)=> setNewCollections(data));
  },[])
  return (
    <div className='new-collections'>
         <h1>NEW COLLECTIONS</h1>
         <hr />
         <div className="collections">
              {newCollections.map((data,i)=><Item key={i} id={data.id} name={data.name} image={data.image} new_price={data.new_price} old_price={data.old_price}/>)}
         </div>
    </div>
  )
}
