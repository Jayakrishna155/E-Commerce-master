import React from 'react'
import './breadcrum.css'
import {Link} from 'react-router-dom'
import arrowIcon from '../Assets/Frontend_Assets/breadcrum_arrow.png'
export default function Breadcrum (props) {
    const {product} = props;
  return (
    <div className='breadcrum'>
      <a> <Link style={{textDecoration:"none",color:"#626262"}} to="/">HOME</Link> </a> <img src={arrowIcon} alt="" />       <a> <Link style={{textDecoration:"none",color:"#626262"}} to="/">SHOP</Link> </a> <img src={arrowIcon} alt="" />      <a> <Link style={{textDecoration:"none",color:"#626262"}} to={`/${product.category}s`}>{product.category}</Link> </a> <img src={arrowIcon} alt="" />
      <span>{product?.name}</span>
       
    </div>
  )
}
