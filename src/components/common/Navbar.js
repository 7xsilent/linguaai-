import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ✅ correct path

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>LinguaAI</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/lessons" style={styles.link}>Lessons</Link>
        <Link to="/practice" style={styles.link}>Practice</Link>
        <Link to="/vocabulary" style={styles.link}>Vocabulary</Link>
        <Link to="/grammar" style={styles.link}>Grammar</Link>
        <Link to="/speaking" style={styles.link}>Speaking</Link>
        <Link to="/conversation" style={styles.link}>AI Chat</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/settings" style={styles.link}>Settings</Link>
        {currentUser ? (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',     // ✅ semi-transparent white
    backdropFilter: 'blur(10px)',                    // ✅ blur effect
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    position: 'fixed',                               // ✅ keep it on top
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    backgroundColor: '#fff',
    border: 'none',
    color: '#222',
    padding: '5px 10px',
    cursor: 'pointer'
  }
};

export default Navbar;
