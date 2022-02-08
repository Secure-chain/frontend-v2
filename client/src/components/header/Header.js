import React from 'react';
import './header.css'
function Header({title}) {
  return (
  <div className='header-container'>
    <div className='header'>{title}</div>
  </div>
  );
}

export default Header;
