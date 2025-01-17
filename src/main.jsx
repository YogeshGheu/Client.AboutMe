import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from './pages/Homepage.jsx';
import Aboutpage from "./pages/Aboutpage.jsx"
import Login from "./pages/user/Login.jsx"
import Signup from './pages/user/Signup.jsx';
import Otp from './pages/user/Otp.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user/verify/otp" element={<Otp />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
