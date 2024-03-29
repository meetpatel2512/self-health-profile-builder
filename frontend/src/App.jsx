import React, { memo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';
import Home from './pages/Home';
import Allreport from './pages/Allreport';
import Layout from './Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="reports" element={<Allreport />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default memo(App);
