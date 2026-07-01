import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Trainers from './pages/Trainers'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import EmailVerification from './pages/EmailVerification'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './context/AppContext'

import CallPage from './pages/callPage'
import ChatPage from './pages/chatPage'

const App = () => {
  const { token, userData, isVerified } = useContext(AppContext)



  // Token exists and user is verified - show main app
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trainers' element={<Trainers />} />
        <Route path='/trainers/:speciality' element={<Trainers />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<EmailVerification />} />
        <Route path='/my-profile' element={token ? (userData && !userData.isVerified ? <Navigate to="/verify-email" /> : <MyProfile />) : <Navigate to="/login" />} />
        <Route path='/my-appointments' element={token ? (userData && !userData.isVerified ? <Navigate to="/verify-email" /> : <MyAppointments />) : <Navigate to="/login" />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/call' element={token ? (userData && !userData.isVerified ? <Navigate to="/verify-email" /> : <CallPage />) : <Navigate to="/login" />} />
        <Route path='/chat/:id' element={token ? (userData && !userData.isVerified ? <Navigate to="/verify-email" /> : <ChatPage />) : <Navigate to="/login" />} />
        <Route path='/call/:id' element={token ? (userData && !userData.isVerified ? <Navigate to="/verify-email" /> : <CallPage />) : <Navigate to="/login" />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
