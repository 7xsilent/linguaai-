// src/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';  // Adjust path if your Sidebar is somewhere else

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1,
  padding: '2rem',
  marginLeft: '220px', // Should match Sidebar width
};

const MainLayout = () => {
  return (
    <div style={layoutStyle}>
      <Sidebar />
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
};


export default MainLayout;
