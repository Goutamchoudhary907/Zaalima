import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/Signup'
import Signin from "./pages/Signin";
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <Routes>
    <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
    </Routes>
  </div>
  )
}

export default App
