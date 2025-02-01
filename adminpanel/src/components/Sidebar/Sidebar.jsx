import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product from '../../Assets/Admin_Assets/Product_Cart.svg'
import list_products from '../../Assets/Admin_Assets/Product_list_icon.svg'
export default function Sidebar() {
  return (
    <div className='sidebar'>
        <Link to="/addproduct" style={{textDecoration:"none",color:"slategray"}} >
          <div className="sidebar-icon">
             <img src={add_product} alt="" />
             <p>Add Product</p>
          </div>
        </Link>
        <Link to="/productlist" style={{textDecoration:"none",color:"slategray"}} >
          <div className="sidebar-icon">
             <img src={list_products} alt="" />
             <p>Product List</p>
          </div>
        </Link>
    </div>
  )
}
