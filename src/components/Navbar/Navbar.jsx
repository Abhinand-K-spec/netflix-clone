import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_image from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useState } from 'react';

const Navbar = () => {

  const navRef = useRef();
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark')
      } else {
        navRef.current.classList.remove('nav-dark')
      }
    })
  }, [])


  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="" className='logo' />
        <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse My Language</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt="" className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt="" />
        <div className="navbar_profile">
          <img src={profile_image} alt="" className='profile' />
          <img src={caret_icon} alt="" />
          <div className="drop-down">
            <p onClick={() => { logout() }}>Sign Out of Netflix</p>
          </div>
        </div>
        <div className="menu-icon" onClick={() => { setMobileMenu(prev => !prev) }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
