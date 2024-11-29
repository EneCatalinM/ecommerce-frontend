import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>E-Commerce</Link>
      </div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </button>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Product Catalog</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
              </li>
              <li>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>User Dashboard</Link>
              </li>
              <li>
                <button className={styles.logoutButton} onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
