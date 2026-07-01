import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { TrainerContext } from '../context/TrainerContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(TrainerContext)
  const { aToken } = useContext(AdminContext)

  return (
    <div className='sticky top-0 h-screen overflow-y-auto bg-white border-r'>
      <div className='flex flex-col min-h-full'>
        <div className='flex-grow'>
          {aToken && (
            <ul className='text-[#515151] mt-5'>
              <NavLink to={'/admin-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.home_icon} alt='' />
                <p className='hidden md:block'>Dashboard</p>
              </NavLink>
              <NavLink to={'/all-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.appointment_icon} alt='' />
                <p className='hidden md:block'>Sessions</p>
              </NavLink>
              <NavLink to={'/add-trainer'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.add_icon} alt='' />
                <p className='hidden md:block'>Add Trainer</p>
              </NavLink>
              <NavLink to={'/trainers-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.people_icon} alt='' />
                <p className='hidden md:block'>Trainers List</p>
              </NavLink>
            </ul>
          )}

          {dToken && (
            <ul className='text-[#515151] mt-5'>
              <NavLink to={'/trainer-dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.home_icon} alt='' />
                <p className='hidden md:block'>Dashboard</p>
              </NavLink>
              <NavLink to={'/trainer-appointments'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.appointment_icon} alt='' />
                <p className='hidden md:block'>Sessions</p>
              </NavLink>
              <NavLink to={'/trainer-profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#FFF3EC] border-r-4 border-orange-500' : ''}`}>
                <img className='min-w-5' src={assets.people_icon} alt='' />
                <p className='hidden md:block'>Profile</p>
              </NavLink>
            </ul>
          )}
        </div>
        <div className='flex-grow'></div>
      </div>
    </div>
  )
}

export default Sidebar
