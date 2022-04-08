import React from 'react';
import '../Styles/Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
    <div className='links'>
      <a href='/'>Home</a>
      <a href='/chats'>Chats</a>
    </div>
    </div>
  );
};

export default Navbar;
