import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'
import Login from '../../pages/Login/Login'
import Register from '../../pages/Register/Register'
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword'
import ResetPassword from '../../pages/ResetPassword/ResetPassword'
import Profile from '../../pages/Profile/Profile'
import AppHeader from '../AppHeader/AppHeader'
import styles from './App.module.css'

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
