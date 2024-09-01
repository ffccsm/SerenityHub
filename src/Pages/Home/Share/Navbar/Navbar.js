import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenuItem from '../Navbar/SubMenuItem'; // Updated path
import './SubMenuItem.css'; // Ensure this path is correct
import './Navbar.css'; // Ensure this path is correct

const Navbar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleMouseEnter = () => setShowSubMenu(true);
  const handleMouseLeave = () => setShowSubMenu(false);

  const treatmentOptions = [
    { name: 'Addiction Treatment', path: '/treatment/AddictionTreatment' },
    { name: 'Drug Rehab', path: '/treatment/DrugRehab' },
    { name: 'Rehab Programmes', path: '/treatment/Programmes' },
    { name: 'Detoxification', path: '/treatment/Detoxification' },
    { name: 'Therapies', path: '/treatment/Therapies' },
    { name: 'Continuing Care (After Care)', path: '/treatment/Aftercare' },
  ];

  const menuItems = (
    <>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/appointment'>Appointment</Link></li>
      <li 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        className="relative treatment-menu"
      >
        <div className="cursor-pointer">Treatment <span className="arrow">▼</span></div>
        {showSubMenu && (
          <ul className="submenu absolute mt-2 p-2 bg-white shadow-lg">
            {treatmentOptions.map((option, index) => (
              <SubMenuItem
                key={index}
                title={option.name}
                path={option.path}
              />
            ))}
          </ul>
        )}
      </li>
      <li><Link to='/meet-our-team'>Meet Our Team</Link></li> 
      <li><Link to='/contact'>Contact Us</Link></li>
      <li><Link to='/about'>About Us</Link></li>
      <li><Link to='/login' className="btn btn-primary">Admin</Link></li>
      {/* Add Admin Button */}
    </>
  );

  return (
    <div className='px-10'>
      <div className="navbar bg-[#f5f6fa] flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              {menuItems}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost normal-case text-2xl font-semibold text-primary">SerenityHub</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {menuItems}
          </ul>
        </div>
        <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
