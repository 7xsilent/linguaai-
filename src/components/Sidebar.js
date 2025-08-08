import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Progress', path: '/progress' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav style={styles.sidebar}>
      <h2 style={styles.title}>LinguaAI</h2>
      <ul style={styles.navList}>
        {links.map(({ name, path }) => (
          <li key={name} style={styles.navItem}>
            <NavLink
              to={path}
              style={({ isActive }) => ({
                ...styles.navLink,
                backgroundColor: isActive ? '#3f51b5' : 'transparent',
                color: isActive ? '#fff' : '#333',
              })}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const styles = {
  sidebar: {
    width: '220px',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '1rem',
    boxSizing: 'border-box',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  title: {
    marginBottom: '2rem',
    color: '#3f51b5',
    fontWeight: '700',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
  navItem: {
    marginBottom: '1rem',
  },
  navLink: {
    display: 'block',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
  },
};

export default Sidebar;
