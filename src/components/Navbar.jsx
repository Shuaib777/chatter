import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Chatter</div>
      <div className="user">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <span>Shuaib</span>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Navbar