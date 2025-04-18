import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
 
    const navigate=useNavigate()
    const [passwordError,setPasswordError]=useState('')
    const [emailError,setEmailError]=useState('')
    const [formData,setFormData]=useState({
      email:'',
      password:''
    })
    
    const handleNavigate = () => {
      navigate("/register");
    };
    
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
    }
    
    // Function for login
    const handleSubmit=async (e)=>{
      e.preventDefault();
      setPasswordError('')
      setEmailError('')
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,formData)
        localStorage.setItem('userInfo',JSON.stringify(response.data.user))
        localStorage.setItem('userToken',response.data.token)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        
        if(userInfo.role == 'user')
       { navigate('/home')}
        if(userInfo.role == 'admin')
        {navigate('/admin')}
      } catch (error) {
        console.error(error)
        // sets the password mismatch and email not registered error if any
        setPasswordError(error.response.data.passwordmessage)  
        setEmailError(error.response.data.usermessage)      
      }
    }


  return (
    <>
        <div className="flex items-center justify-center w-full h-screen bg-gray-900">
      <div className="flex flex-row h-[650px] w-[1440px]  border-2 border-black">
          <div className="w-[60%] flex items-center  justify-center ">
            <div className=" h-screen w-full flex items-center justify-center">
              <img
                src="https://plus.unsplash.com/premium_photo-1724252291595-9b82c9d28727?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJ1dHRlcmZseSUyMGdyb3VwfGVufDB8fDB8fHww"
                alt=""
                className="h-[640px] w-full object-cover px-3 relative"
              />
             
            </div>
          </div>

          <div className="w-[50%] h-[640px] flex items-center justify-center bg-gray-100 mt-1">
            <div className=" flex items-center justify-center flex-col h-[600px] w-full">
              <h1 className="text-3xl font-semibold mb-8">
                Welcome to Bug-Nest{" "}
              </h1>
              <div className="border border-black w-[520px] h-[450px] shadow-lg ">
                <div className=" flex-col items-center justify-center">
                  <h1 className="text-3xl mt-4 mb-6 text-center">Login</h1>
                  <form onSubmit={handleSubmit} className="px-4 ">
                    <label className="text-xl">Email:</label>
                    <input
                      type="email"
                      name="email"
                      className="border-gray-900 border w-full mt-4 h-10 outline-none px-2 py-1 bg-transparent placeholder:text-black"
                      placeholder="Enter your email"
                      onChange={handleChange}
                    />
                    <p className="py-1 px-2 h-5 mb-2 text-red-500">
                      {emailError && emailError ? emailError : ""}
                    </p>
                    <label className="text-xl">Password:</label>
                    <input
                      type="password"
                      name="password"
                      className="border-gray-900 border w-full mt-4 h-10 outline-none px-2 py-1 bg-transparent text-black  placeholder:text-black"
                      placeholder="Enter your password"
                      onChange={handleChange}
                    />
                    <p className="py-1 px-2 h-5 text-red-500">
                      {passwordError && passwordError ? passwordError : ""}
                    </p>
                    <button
                      className="mt-8 w-full px-4 border h-8 bg-blue-500 border-none text-xl"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                  <p className="text-end mt-2 mr-4 text-lg">
                    Don't have an account ?{" "}
                    <span>
                      <button
                        className="hover:cursor-pointer text-blue-700"
                        onClick={handleNavigate}
                      >
                        Register
                      </button>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




      
export default Login