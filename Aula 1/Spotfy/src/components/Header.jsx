import React from 'react'
import logoSpotfy from '../assets/logo/logosem.png'

const Header = () => {
  return <div className='header'>
    <img src ={logoSpotfy} alt='Logo' />
    <a className='header__link' href='/'>
    <h1>Piratefy</h1>    
    </a>
    </div>
  
}

export default Header