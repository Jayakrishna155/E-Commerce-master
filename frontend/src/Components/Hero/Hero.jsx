import React from 'react'
import './Hero.css'
import handIcon from '../Assets/Frontend_Assets/hand_icon.png'
import arrowIcon from '../Assets/Frontend_Assets/arrow.png'
import heroImg from '../Assets/Frontend_Assets/hero_image.png'
const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
             <h2>NEW ARRIVALS ONLY</h2>
             <div>
                  <div className="hero-hand-icon">
                     <p>New</p>
                     <img src={handIcon} alt="hand-icon" />
                  </div>
                  <p>collections</p>
                  <p>for everyone</p>
             </div>
             <div className="hero-latest-btn">
                  <div>Lastest Collection</div>
                  <img src={arrowIcon} alt="arrowicon" />
             </div>
        </div>
        <div className="hero-right">
          <img src={heroImg} alt="heroimg" />
        </div>
    </div>
  )
}

export default Hero
