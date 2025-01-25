import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/application/Homepage.jsx';
import Aboutpage from "./pages/application/Aboutpage.jsx"
import Login from "./pages/user/Login.jsx"
import Signup from './pages/user/Signup.jsx';
import Otp from './pages/user/Otp.jsx';
import AccountConfirmation from './pages/user/AccountConfirmation.jsx';
import ForgotPassword from './pages/user/ForgotPassword.jsx';
import YouTube from "./pages/application/YouTube/YouTube.jsx"
import Channel from "./pages/application/YouTube/Channel.jsx"
import Videos from "./pages/application/YouTube/Videos.jsx"



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user/verify/otp" element={<Otp />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/account/creation/confirmation' element={<AccountConfirmation />} />
        <Route path='/account/password-reset' element={<ForgotPassword />} />

        <Route path='/' element={<App />}>
          <Route index element={<Homepage />} />
          <Route path={"/about"} element={<Aboutpage />} />

          <Route path={"/youtube/"} element={<YouTube />}>
            {/* <Route index element={<Channel />} /> */}
            <Route path='channel' element={<Channel />} />
            <Route path='videos' element={<Videos />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
