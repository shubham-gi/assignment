import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Login from './components/Login'
const App = () => {
    return (
      <>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </>
  )
}

export default App