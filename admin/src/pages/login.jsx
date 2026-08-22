import axios from 'axios'
import React, { useContext, useState } from 'react'
import { TrainerContext } from '../context/TrainerContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://fitnesstrainer-cf9v.onrender.com"
  const { setDToken } = useContext(TrainerContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          toast.success("Admin Login Successful")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/trainer/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          toast.success("Trainer Login Successful")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error("Login Failed")
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 p-4">

      {/* FitConnect logo */}
      <span onClick={() => navigate('/')} className="flex items-center gap-2 mb-6 cursor-pointer">
        <span className="size-9 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
          F
        </span>
        <span className="text-3xl font-bold font-mono text-orange-500 tracking-wider">
          FitConnect
        </span>
      </span>

      {/* Login Form */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border bg-white rounded-xl text-[#5E5E5E] text-sm shadow-xl"
      >
        <p className="text-2xl font-semibold m-auto">
          <span className="text-orange-500">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-orange-500 text-white w-full py-2 rounded-md text-base hover:bg-orange-600 transition duration-200">
          Login
        </button>

        {state === 'Admin' ? (
          <p>
            Trainer Login?{' '}
            <span
              onClick={() => setState('Trainer')}
              className="text-orange-500 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              onClick={() => setState('Admin')}
              className="text-orange-500 underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Login
