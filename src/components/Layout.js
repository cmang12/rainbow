import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';
import '../styles/pages/Layout.css';

const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      navigate('/login');
    });
  };

  useEffect(() => {
    const navigationElement = document.querySelector('.navigation');
    const menuItemsElement = document.querySelector('.menu-items');

    const handleMouseEnter = () => {
      setIsExpanded(true);
    };

    const handleMouseLeave = () => {
      setIsExpanded(false);
    };

    navigationElement.addEventListener('mouseenter', handleMouseEnter);
    navigationElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      navigationElement.removeEventListener('mouseenter', handleMouseEnter);
      navigationElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div className={`navigation ${isExpanded ? 'expanded' : ''}`}>
        <button className="toggle-button" onClick={handleToggleExpand}>
          <span className="menu-icon">☰</span>
        </button>
        <div className="menu-items">
          <ul>
            <li>
              <button className="menu-item" onClick={() => navigate('/')}>
                Home
              </button>
            </li>
            <li>
              <button className="menu-item" onClick={() => navigate('/journal')}>
                Journal
              </button>
            </li>
            <li>
              <button className="menu-item" onClick={handleLogOut}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="page-content">{children}</div>
    </>
  );
};

export default Layout;
