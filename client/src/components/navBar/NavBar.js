import React from 'react';
import NavBarStyle from './NavBar.css'

function NavBar({account}) {
  return( 
  <>
    <nav className="navbar">
        <div className="navbar-logo">
            <p class="navbar-logo-text">Secure<span style={{fontWeight:`400`}}>chain</span></p>
        </div>
        <div className="nav-bar-welcome">
          <p class="navbar-welcome">Welcome, {account}</p>
        </div>
    </nav>
  </>
  )
}

export default NavBar;
