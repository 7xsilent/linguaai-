import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const SettingsPage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{
      ...styles.container,
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      color: theme === 'dark' ? '#ffffff' : '#333333'
    }}>
      <h2 style={styles.header}>Settings</h2>

      <div style={styles.settingItem}>
        <span style={styles.label}>App Theme</span>
        <button 
          onClick={toggleTheme}
          style={{
            ...styles.themeToggle,
            backgroundColor: theme === 'dark' ? '#4a4a4a' : '#e0e0e0',
            color: theme === 'dark' ? '#ffffff' : '#333333'
          }}
        >
          {theme === 'light' ? (
            <>
              <span style={styles.icon}>🌙</span> Switch to Dark Mode
            </>
          ) : (
            <>
              <span style={styles.icon}>☀️</span> Switch to Light Mode
            </>
          )}
        </button>
      </div>

      <div style={styles.settingItem}>
        <span style={styles.label}>Notifications</span>
        <label style={styles.switch}>
          <input type="checkbox" defaultChecked />
          <span style={{
            ...styles.slider,
            backgroundColor: theme === 'dark' ? '#4a4a4a' : '#ccc',
            '::before': {
              backgroundColor: theme === 'dark' ? '#ffffff' : '#ffffff'
            }
          }}></span>
        </label>
      </div>

      <div style={styles.settingItem}>
        <span style={styles.label}>Language</span>
        <select 
          style={{
            ...styles.select,
            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#333333',
            borderColor: theme === 'dark' ? '#444444' : '#cccccc'
          }}
          defaultValue="en"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div style={styles.settingItem}>
        <span style={styles.label}>Special Effects</span>
        <div style={styles.effectButtons}>
          <button style={{
            ...styles.effectButton,
            backgroundColor: theme === 'dark' ? '#6a0dad' : '#e0d0ff',
            boxShadow: theme === 'dark' ? '0 0 10px #6a0dad' : 'none'
          }}>
            Particle Effects
          </button>
          <button style={{
            ...styles.effectButton,
            backgroundColor: theme === 'dark' ? '#0d6e8e' : '#d0f0ff',
            boxShadow: theme === 'dark' ? '0 0 10px #0d6e8e' : 'none'
          }}>
            Animations
          </button>
        </div>
      </div>

      {theme === 'dark' && (
        <div style={styles.starsContainer}>
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              style={{
                ...styles.star,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  header: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '2px solid #6a0dad',
    display: 'inline-block',
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '1.5rem 0',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  themeToggle: {
    padding: '0.8rem 1.2rem',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
  },
  icon: {
    fontSize: '1.2rem',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '60px',
    height: '34px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    transition: '.4s',
    borderRadius: '34px',
    '::before': {
      position: 'absolute',
      content: '""',
      height: '26px',
      width: '26px',
      left: '4px',
      bottom: '4px',
      borderRadius: '50%',
      transition: '.4s',
    },
  },
  select: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid',
    fontSize: '1rem',
    cursor: 'pointer',
    minWidth: '150px',
  },
  effectButtons: {
    display: 'flex',
    gap: '1rem',
  },
  effectButton: {
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  starsContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '0',
  },
  star: {
    position: 'absolute',
    width: '2px',
    height: '2px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    animation: 'twinkle 2s infinite alternate',
    '@keyframes twinkle': {
      '0%': { opacity: '0.2' },
      '100%': { opacity: '1' },
    },
  },
};

export default SettingsPage;