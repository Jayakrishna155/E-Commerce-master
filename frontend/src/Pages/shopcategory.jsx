import React, { useContext } from 'react'
import {Shopcontext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/Frontend_Assets/dropdown_icon.png'
import './Css/shopcategory.css'
import Item from '../Components/Items/Item';

export default function Shopcategory(props) {
  const {Allproducts} = useContext(Shopcontext);
  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexsort">
            <p>
               <span>Showing 1-12</span> out of 36 products
            </p>
            <div className="shopcategory-sort">
              Sort by <img src={dropdown_icon}
              alt=""/>
            </div>
        </div>
        <div className="shopcategory-products">
          {Allproducts.map((product,i)=> {
             if(props.category === product.category)
             {
                return(
                  <Item key={i} id={product.id} name={product.name} image={product.image} new_price={product.new_price} old_price={product.old_price} />
                );
             }
             else{
              return null;
             }
          })}
        </div>
        <div className="shopcategory-loadmore">
           Explore More
        </div>
    </div>
  )
}
