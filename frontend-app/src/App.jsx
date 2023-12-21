// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmail from './utils/ConfirmEmail';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import ApartmentPage from './pages/ApartmentPage';
import DashboardPage from './pages/DashboardPage';
import NavbarPage from './pages/NavbarPage';
import Clients from './components/tables/Clients';
import Apartments from './components/tables/Apartments';
import Payments from './components/tables/Payments';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/confirm-email/:token' element={<ConfirmEmail />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        {/* <Route path='/reset-password' element={<ResetPasswordPage />} /> */}
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />

        <Route path='/dashboard' element={<DashboardPage />} />

        <Route path='/navbar' element={<NavbarPage />} >
          <Route
            path='/navbar/clients'
            element={<Clients />}
          />
          <Route
            path='/navbar/apartments'
            element={<Apartments />}
          />
          <Route
            path='/navbar/payments'
            element={<Payments />}
          />
        </Route>
        <Route path='/apartments' element={<ApartmentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
