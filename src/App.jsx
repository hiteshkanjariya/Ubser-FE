import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptionLogin from './pages/CaptionLogin'
import CaptionSignup from './pages/CaptionSignup'
import Home from './pages/Home'
import UserProtectWraper from './pages/UserProtectWraper'
import UserLogout from './pages/UserLogout'
import CaptionProtectWrapper from './pages/CaptionProtectWraper'
import CaptionLogout from './pages/CaptionLogout'
import Riding from './pages/Riding'
import CaptionHome from './pages/Caption/CaptionHome'
import CaptionRiding from './pages/Caption/CaptionRiding'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/login' element={<UserLogin />} />
      <Route path='/signup' element={<UserSignup />} />
      <Route path='/caption-login' element={<CaptionLogin />} />
      <Route path='/caption-signup' element={<CaptionSignup />} />
      <Route path='/home' element={<UserProtectWraper> <Home /></UserProtectWraper>} />
      <Route path='/user/logout' element={<UserProtectWraper><UserLogout /></UserProtectWraper>} />
      <Route path='/caption/logout' element={<CaptionProtectWrapper><CaptionLogout /></CaptionProtectWrapper>} />
      <Route path='/caption-home' element={<CaptionProtectWrapper>  <CaptionHome /></CaptionProtectWrapper>} />

      <Route path='/riding' element={<Riding />} />
      <Route path='/caption-riding' element={<CaptionRiding />} />
    </Routes>
  )
}

export default App
