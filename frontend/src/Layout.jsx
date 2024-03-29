import React from 'react';
import Navbar from './components/Navbar';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
  const Localtoken = localStorage.getItem('session_Id');
  if (!Localtoken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
