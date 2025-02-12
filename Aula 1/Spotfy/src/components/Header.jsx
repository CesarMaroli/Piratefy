import React from 'react';
import logoSpotfy from '../assets/logo/logosem.png';
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
      <img 
        src={logoSpotfy} 
        alt="Logo" 
        style={{ width: "140px", height: "100px", objectFit: "cover" }} 
        />
        </Link>
      <Link className='header__link' to='/'>
        <h1>Piratefy</h1>
      </Link>
    </div>
  );
};

export default Header;
