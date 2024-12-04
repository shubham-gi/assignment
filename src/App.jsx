import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./components/UserList";
import AuthProvider from "./providers/AuthProvider";
const App = () => {
  return (
    <>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="list" element={<UserList />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
    </>
  );
};

export default App;
