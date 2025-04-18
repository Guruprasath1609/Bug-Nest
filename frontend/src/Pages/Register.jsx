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
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="flex h-[650px] w-[1440px] border-2 border-black">
          <div className="w-[50%] flex items-center justify-center ">
            <div className="flex  ">
              <img
                src="https://plus.unsplash.com/premium_photo-1743727369090-7eccf8dbc20c?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-[700px] h-[620px] object-cover "
              />
            </div>
          </div>

          <div className="h-[620px] w-[700px] flex items-center justify-center flex-col bg-white mt-3">
            <h1 className="text-3xl font-semibold mb-8">
              Welcome to Bug-Nest{" "}
            </h1>
            <div className="border border-black w-[550px] h-[500px] shadow-lg ">
              <div className=" flex-col items-center justify-center">
                <h1 className="text-3xl mt-4 mb-6 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="px-4 ">
                  <label className="text-xl">Name:</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="border-black border w-full mt-4 h-10 outline-none px-2 py-1 mb-4 placeholder:text-black"
                    placeholder="Enter your name"
                  />
                  <label className="text-xl">Email:</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="border-black border w-full mt-4 h-10 outline-none px-2 py-1 placeholder:text-black "
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
                    className="border-black border w-full mt-4 h-10 outline-none px-2 py-1 placeholder:text-black"
                    placeholder="Enter your password"
                  />
                  <button
                    className="mt-8 w-full px-4  h-8 bg-blue-500 text-xl "
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
        </div>
      </div>
    </>
  );
}

export default Register