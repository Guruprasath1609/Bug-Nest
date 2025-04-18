import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RegisterImage from "../assets/RegisterImage.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import WhiteBGImage from '../assets/WhiteBGImage.jpg'
import Reg from '../assets/Reg.jpg'
import Regi from '../assets/Regi.png'
const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [emailNotMatchError, setEmailNotMatchError] = useState("");
  const [noNameError, setNoNameError] = useState("");
  const [noEmailError, setNoEmailError] = useState("");
  const [noPasswordError, setNoPasswordError] = useState("");
  

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        formData
      );
      
      navigate("/");
    } catch (error) {
      console.error(error);
      setEmailNotMatchError(error.response.data.message);
      setNoNameError(error.response.data.namemessage);
      setNoEmailError(error.response.data.emailmessage);
      setNoPasswordError(error.response.data.passwordmessage);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center w-full md:h-screen bg-black ">

      <div className="flex md:flex-row flex-col  container items-center justify-center">
        {/* Image div */}
        <div className="w-[485px] h-[600px] flex items-center  justify-center md:w-[400px] bg-[rgb(229,249,238)]">
          {/* <div className="flex items-center justify-center  "> */}
            <img
              src={Regi}
              alt=""
              className="w-[485px] h-[600px] md:w-[400px] md:h-[400px]  "
            />
          {/* </div> */}
        </div>
        {/* Register div */}
        <div className="w-[485px] lg:w-[1000px] h-[600px] flex items-center justify-center bg-white">
          {/* Image Section */}
          {/* <img
              src={WhiteBGImage}
              alt=""
              className="w-[500px] md:w-[800px] h-[600px] relative "
            /> */}
          <div className="flex items-center justify-center flex-col absolute bg-white w-[400px] h-[500px] shadow-2xl">
            {/* <h1 className="text-3xl font-semibold mb-8">
              Welcome to Bug-Nest{" "}
            </h1> */}
            <div className=" flex-col items-center justify-center">
              <h1 className="text-3xl  text-center">Hello, Ticket Support </h1>

              <h1 className="text-md mt-2 mb-6 text-center w-[300px]">
                Welcome to Bug-Nest,create your new account or existing user{" "}
                <span>
                  <button
                    className="hover:cursor-pointer text-blue-700"
                    onClick={handleNavigate}
                  >
                    Login
                  </button>
                </span>
              </h1>
              <form onSubmit={handleSubmit}>
                {/* <label className="text-xl">Name:</label> */}
                <div className="flex relative">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="border-gray-500 border w-full  h-10 outline-none px-2 py-1 bg-transparent placeholder:text-gray-500"
                    placeholder="Name"
                  />
                  <FaRegUserCircle className="w-7 top-1 h-7  text-gray-300  absolute right-0.5" />
                </div>
                <p className="py-1 px-2 h-5 text-red-500 mb-4">
                  {noNameError && noNameError ? noNameError : ""}
                </p>
                {/* <label className="text-xl">Email:</label> */}
                <div className="flex relative">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="border-gray-500 border w-full  h-10 outline-none px-2 py-1 bg-transparent text-black  placeholder:text-gray-500"
                    placeholder="Email"
                  />
                  <AiOutlineMail className="w-7 top-1 right-0.5 h-7  text-gray-300 absolute " />
                </div>
                <p className="py-1 px-2 h-5 text-red-500 mb-4">
                  {(emailNotMatchError && emailNotMatchError
                    ? emailNotMatchError
                    : "") || (noEmailError && noEmailError ? noEmailError : "")}
                </p>
                {/* <label className="text-xl">Password:</label> */}
                <div className="flex relative ">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="border-gray-500 border w-full  h-10 outline-none px-2 py-1 bg-transparent text-black  placeholder:text-gray-500"
                    placeholder="Password"
                  />
                  <RiLockPasswordLine className="w-7 top-1 h-7  text-gray-300 absolute right-0" />
                </div>
                <p className="py-1 px-2 h-5 text-red-500 mb-4">
                  {noPasswordError && noPasswordError ? noPasswordError : ""}
                </p>

                <button
                  className=" w-full px-2 border h-10 bg-black py-1 flex items-center justify-between text-white "
                  type="submit"
                >
                  <div className="border-none text-lg">Register</div>
                  <FaArrowRight className="w-4 h-5" />
                </button>
              </form>
              {/* <p className="text-end mt-2 mr-5 text-lg">
                  Already have an account ?{" "}
                </p> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default RegisterPage;
