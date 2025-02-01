import React from 'react'
import './Footer.css'
import footerLogo from '../Assets/Frontend_Assets/logo_big.png'
import instaIcon from '../Assets/Frontend_Assets/instagram_icon.png'
import pinIcon from '../Assets/Frontend_Assets/pintester_icon.png'
import whatsappIcon from '../Assets/Frontend_Assets/whatsapp_icon.png'
export default function Footer() {
  return (
    <div className='footer'>
           <div className="footer-logo">
             <img src={footerLogo} alt="" />
             <p>SHOPPER</p>
           </div>
           <ul className="footer-links">
              <li>Company</li>
              <li>Products</li>
              <li>Offices</li>
              <li>About</li>
              <li>Contact</li>
           </ul>
           <div className="footer-social-icons">
             <div className='icons-flex'>
                <div className="footer-icons-container">
                    <img src={instaIcon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinIcon} alt="" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsappIcon} alt="" />
                </div>
             </div>
             <div className="footer-copyright">
                 <hr />
                 <p>Copyright@2023 -All Rights Reserved</p>
             </div>
           </div>
    </div>
  )
}
