import React from 'react'
import img from "./images/logo.png"
import './Header.css'

function Header() {
  return (
    <div className='head'>
        <img className = "logo"  src = {img} alt = "logo"/>
    </div>
  )
}

export default Header