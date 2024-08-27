import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SubMenuItem.css'; // Import CSS for styling

const SubMenuItem = ({ title, path }) => {
  const location = useLocation(); 
  const isActive = location.pathname === path; 

  return (
    <li className={`submenu-item ${isActive ? 'active' : ''}`} role="menuitem">
      <Link 
        to={path} 
        className={`block px-4 py-2 transition-colors duration-200 ${
          isActive ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'
        }`}
        aria-current={isActive ? 'page' : undefined} 
      >
        {title}
      </Link>
    </li>
  );
};

export default SubMenuItem;
