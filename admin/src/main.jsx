import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "stream-chat-react/dist/css/v2/index.css";
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import TrainerContextProvider from './context/TrainerContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <TrainerContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TrainerContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
