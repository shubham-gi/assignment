import React, { useContext, useState,useEffect } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { validateEmail } from "../utilities/ValidateEmail";
import axios from "axios";
import { LOGIN_URL } from "../Constants";
import { storeToken } from "../utilities/StoreToken";
import { Alert } from "../utilities/Alert";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthContext";
const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const {loggedIn,setloggedIn}=useContext(AuthContext)
  useEffect(() => {
    if(loggedIn){
      navigate('/list')
      Alert("Already Logged In")
    }
  }, [])
  
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert("Please enter valid email");
      return;
    }
    if (!password) {
      Alert("Password cannot be blank");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type if needed
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.token) {
        storeToken(data.token);
        Alert("Login Successfull", "s");
        setloggedIn(true)
        navigate('/list')
        
      } else {
        throw new Error("tokenNotRecieved");
      }
    } catch (error) {
      if(error.response.status==400){

        Alert("Invalid Email or Password", "f");
      }
      else if (error.message === "tokenNotRecieved") {
        Alert("Internal Server Error", "f");
      } else {
        Alert("Something went wrong", "f");
      }
      // console.log(error.message);
    }
  };
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="text-xl  font-semibold ">Sign in with Email</label>
        </div>

        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <Link
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            to="#"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="#"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
