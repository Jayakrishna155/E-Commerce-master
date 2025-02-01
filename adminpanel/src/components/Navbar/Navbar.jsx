import React from 'react'
import './Navbar.css'
import navlogo from '../../Assets/Admin_Assets/nav-logo.svg'
import navprofile from '../../Assets/Admin_Assets/nav-profile.svg'

export default function Navbar() {
  return (
    <div className='navbar'>
       <img src={navlogo}  className="nav-logo"alt="hello" />
       <img src={navprofile} className='nav-profile' alt="Hii" />
    </div>
  )
}
