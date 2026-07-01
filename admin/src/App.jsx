import React, { useContext } from 'react'
import { TrainerContext } from './context/TrainerContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddTrainer from './pages/Admin/AddTrainer';
import TrainersList from './pages/Admin/TrainersList';
import Login from './pages/login';
import TrainerAppointments from './pages/Trainer/TrainerAppointments';
import TrainerDashboard from './pages/Trainer/TrainerDashboard';
import TrainerProfile from './pages/Trainer/TrainerProfile';
import ChatPage from './pages/Trainer/ChatPage';
import CallPage from './pages/Trainer/CallPage';
import { useLocation } from 'react-router-dom';


const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(TrainerContext)

  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat/');

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={
              aToken ? (
                <TrainersList />
              ) : dToken ? (
                <TrainerDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Admin Routes */}
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-trainer' element={<AddTrainer />} />
          <Route path='/trainers-list' element={<TrainersList />} />

          {/* Trainer Routes */}
          <Route path='/trainer-dashboard' element={<TrainerDashboard />} />
          <Route path='/trainer-appointments' element={<TrainerAppointments />} />
          <Route path='/trainer-profile' element={<TrainerProfile />} />
          <Route path='/chat/:id' element={<ChatPage />} />
          <Route path='/call/:id' element={<CallPage />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
