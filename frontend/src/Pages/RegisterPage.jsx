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
import GrayReg from '../assets/GrayReg.jpg'
import GrayRegi from '../assets/GrayRegi.png'
import BlackRegi from '../assets/BlackRegi.png'
import NewReg from '../assets/NewReg.png'
import NewGrayReg from '../assets/NewGrayReg.png'
import { toast } from "sonner";
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
    if(e.target.name){
      setNoEmailError('')
      setNoNameError('')
      setNoPasswordError('')
    }
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
      toast.success("User Created Successfully", {
        style: {
          background: "black",
          color: "white",
          border: "1px solid black",
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.5)",
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        },
      });
      
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
      {/* <div className="flex items-center justify-center w-full md:h-screen bg-black "> */}

      <div className="flex md:flex-row flex-col-reverse  items-center justify-center w-full md:h-screen">
        {/* Image div */}
        <div className="w-[485px] h-[600px] flex  items-center justify-center md:w-[40%] md:h-screen bg-black ">
          {/* <div className="flex items-center justify-center  bg-[rgb(229,249,238)]"> */}
          <img
            src={NewGrayReg}
            alt=""
            className="w-[455px] h-[400px] lg:w-[350px] lg:h-[350px]   md:w-[250px] md:h-[300px] rounded-[50px] "
          />
          {/* </div> */}
        </div>
        {/* Register div */}
        <div className="w-[485px] md:w-[65%] h-[710px] md:h-screen flex items-center justify-center bg-white">
          {/* Image Section */}
          {/* <img
              src={WhiteBGImage}
              alt=""
              className="w-full h-screen relative "
            /> */}
          <div className="flex items-center justify-center flex-col absolute bg-white w-[450px] h-[500px] md:w-[450px] shadow-2xl rounded-xl">
            {/* <h1 className="text-3xl font-semibold mb-8">
              Welcome to Bug-Nest{" "}
            </h1> */}
            <div className=" flex-col items-center justify-center">
              <h1 className="text-[32px]  text-center font-black tracking-normal text-gray-800 ">
                Hello, Ticket Support{" "}
              </h1>

              <h1 className=" mt-2 mb-6 text-left w-[320px]  text-gray-400 font-semibold">
                Welcome to Bug-Nest, create your new account or existing user{" "}
                <span>
                  <button
                    className="hover:cursor-pointer text-gray-800 hover:text-blue-700 font-black text-md underline"
                    onClick={handleNavigate}
                  >
                    Login
                  </button>
                </span>
              </h1>
              <form onSubmit={handleSubmit} className="text-[14px]  ">
                {/* <label className="text-xl">Name:</label> */}
                <div className="flex relative">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className="border-gray-300 border w-full h-10  outline-none px-3 text-gray-400  bg-transparent font-semibold text-md placeholder:text-gray-400 rounded-md"
                    placeholder="Name"
                  />
                  <FaRegUserCircle className="w-[18px] top-2.5 h-[18px]  text-gray-300  absolute right-1.5" />
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
                    className="border-gray-300 border w-full  h-10 outline-none px-3 py-1 bg-transparent  font-semibold text-md text-gray-400  placeholder:text-gray-400 rounded-md"
                    placeholder="Email"
                  />
                  <AiOutlineMail className="w-[18px] top-2 right-1.5 h-[18px]  text-gray-300 absolute " />
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
                    className="border-gray-300 border w-full  h-10 outline-none px-3 py-1 bg-transparent text-gray-400 font-semibold text-md  placeholder:text-gray-400 rounded-md"
                    placeholder="Password"
                  />
                  <RiLockPasswordLine className="w-[19px] top-2 h-[19px]  text-gray-300 absolute right-[5px]" />
                </div>
                <p className="py-1 px-2 h-5 text-red-500 mb-4">
                  {noPasswordError && noPasswordError ? noPasswordError : ""}
                </p>

                <button
                  className=" w-full px-3 border  bg-gray-800 hover:bg-black py-3 flex items-center justify-between text-white rounded-md text-md font-semibold relative"
                  type="submit"
                >
                  <div className="border-none text-[15px] font-semibold">
                    Register
                  </div>
                  <FaArrowRight className="w-[18px] h-[18px] absolute right-1.5" />
                </button>
              </form>
              {/* <p className="text-end mt-2 mr-5 text-lg">
                  Already have an account ?{" "}
                </p> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RegisterPage;
