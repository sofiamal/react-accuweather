import React from 'react'
import { Link } from 'react-router-dom'
import { FcLike } from "react-icons/fc";
import '../style/common.css'

export default function Navbar() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-transparent" style={{backgroundColor: "#e3f2fd"}}>
  <div className="container-fluid">
    <h1 className="navbar-brand">My Weather App</h1>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to={'/favorites'} className="nav-link">Favorites <FcLike className='likeNav' /></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
