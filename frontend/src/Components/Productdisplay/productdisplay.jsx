import React from 'react'
import './productdisplay.css'
import star_icon from '../Assets/Frontend_Assets/star_icon.png'
import star_dull from '../Assets/Frontend_Assets/star_dull_icon.png'
import { Shopcontext } from '../../Context/ShopContext';
import { useContext } from 'react';

export default function Productdisplay(props) {
    const {product} = props;
    const {addToCart} = useContext(Shopcontext);
  return (
    <div className='productdisplay'>
       <div className='productdisplay-left'>
          <div className="productdisplay-img-list">
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
             <img src={product.image} alt="" />
          </div>
          <div className="productdisplay-image">
            <img className='productdisplay-main-img' src={product.image} alt="" />
          </div>
       </div>
       <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_icon} alt="" />
             <img src={star_dull} alt="" />
             <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
              <div className="productdisplay-right-oldprice">
             ${product.old_price}
              </div>
              <div className="productdisplay-right-newprice">
              ${product.new_price}
              </div>
          </div>
          <div className="productright-des">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa qui nam perferendis sint est voluptatum, deserunt obcaecati voluptas aliquam porro. Asperiores iusto explicabo quaerat illum iste voluptate facere ullam culpa.
          </div>
          <div className="productright-sizes">
             <h1>Select Size</h1>
             <div className="sizes">
               
                  <div>S</div>
                  <div>M</div>
                  <div>L</div>
                  <div>XL</div>
                  <div>XXL</div>
             </div>
          </div>
          <button onClick={()=>addToCart(product.id)}>ADD TO CART</button>
          <p className='productdisplay-right-category'><span>Category : </span>Women, Tshirt, Crop Top</p>
          <p className='productdisplay-right-category'><span>Tags : </span>Modern, Latest</p>
       </div>
    </div>
  )
}
