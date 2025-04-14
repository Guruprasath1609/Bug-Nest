import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios'

const Register = () => {
const navigate=useNavigate()
    
    const [formData,setFormData]=useState({
      name:'',
      email:'',
      password:''
    })
    const [error,setError]=useState('')


    const handleNavigate = () => {
      navigate("/");
    };

    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }

    // Function for registration
    const handleSubmit=async (e)=>{
      e.preventDefault();      
      try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,formData)
        console.log(response);
        navigate('/')
        
      } catch (error) {
        console.error(error)
        setError(error.response.data.message)
      }
    }
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        <h1 className="text-3xl font-semibold mb-8">Welcome to Bug-Nest </h1>
        <div className="border border-black w-[550px] h-[500px] shadow-lg ">
          <div className=" flex-col items-center justify-center">
            <h1 className="text-3xl mt-4 mb-6 text-center">Register</h1>
            <form onSubmit={handleSubmit} className="px-4 ">
              <label className="text-xl">Name:</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="border-gray-300 border-2 w-full mt-4 h-10 outline-none px-2 py-1 mb-4"
                placeholder="Enter your name"
              />
              <label className="text-xl">Email:</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="border-gray-300 border-2 w-full mt-4 h-10 outline-none px-2 py-1 "
                placeholder="Enter your email"
              />
              <p className="py-1 px-2 h-5 text-red-500 mb-4">
                {error && error ? error : ""}
              </p>
              <label className="text-xl">Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="border-gray-300 border-2 w-full mt-4 h-10 outline-none px-2 py-1"
                placeholder="Enter your password"
              />
              <button
                className="mt-8 w-full px-4 border h-8 bg-blue-500 text-xl"
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className="text-end mt-2 mr-5 text-lg">
              Already have an account ?{" "}
              <span>
                <button
                  className="hover:cursor-pointer text-blue-700"
                  onClick={handleNavigate}
                >
                  Login
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register