import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex fle-row gap-4 place-content-evenly'>
      <NavLink
      to="/"
      >
          Home
      </NavLink>
      <NavLink
      to="/paste"
      >
          Paste
      </NavLink>
    </div>
  )
}

export default Navbar