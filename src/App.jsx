import React from 'react'
import { Route, Routes } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import UserList from './components/UserList';
const App = () => {
    return (
      <>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/list' element={<UserList/>}/>
        </Routes>
        <ToastContainer />
      </>
  )
}

export default App