import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

export default function Item(props) {
  // Replace localhost URL with the new backend URL
  const updatedImageUrl = props.image.replace('http://localhost:4000/images/', 'https://e-commerce-backend-91i0.onrender.com/images/');

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={updatedImageUrl} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
}
