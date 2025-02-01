import React from 'react'
import './relatedproduct.css'
import data_product from '../Assets/Frontend_Assets/data'
import Item from '../Items/Item'
export default function Relatedproduct() {
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="related-products-item">
         {
            data_product.map((product,i)=>{
                return(
                    <Item key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price} />
                  );
            })
         }
        </div>
    </div>
  )
}
