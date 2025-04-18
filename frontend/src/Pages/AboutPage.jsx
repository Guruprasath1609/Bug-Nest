import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from '../assets/LoginImage.jpg'
import AbstractImage from '../assets/AbstractImage.jpg'
import PinkBackground from '../assets/PinkBackground.jpg'
import { CiUser } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import Logi from '../assets/Logi.png'


const AboutPage = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [noEmail,setNoEmail]=useState('')
  const [noPassword,setNoPassword]=useState('')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleNavigate = () => {
    navigate("/register");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setEmailError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        formData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (userInfo.role == "user") {
        navigate("/home");
      }
      if (userInfo.role == "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      // sets the password mismatch and email not registered error if any
      setPasswordError(error.response.data.passwordmessage);
      setEmailError(error.response.data.usermessage);
      setNoEmail(error.response.data.noemail)
      setNoPassword(error.response.data.nopassword)
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full md:h-screen bg-black ">
        <div className="flex md:flex-row flex-col  container items-center justify-center">
          {/* Image div */}
          <div className="w-[485px] h-[600px] flex items-center  justify-center md:w-[400px] bg-[rgb(44,69,80)]">
            {/* <div className="flex items-center justify-center"> */}
            <img
              src={Logi}
              alt=""
              className="w-[485px] h-[600px] md:w-[400px] md:h-[400px] "
            />
          </div>
          {/* </div> */}

          {/* Login div */}
          <div className="w-[485px] lg:w-[1000px] h-[600px] flex items-center justify-center bg-white">
            {/* Image Section */}
            {/* <img
              src={PinkBackground}
              alt=""
              className="w-[485px] h-[600px] md:w-[400px] md:h-[400px] "
            /> */}

            {/* Box section */}

            <div className=" flex items-center justify-center flex-col absolute bg-white w-[400px] h-[500px] shadow-2xl">
              {/* <h1 className="text-3xl font-semibold mb-8">
                Welcome to Bug-Nest{" "}
              </h1> */}

              <div className=" ">
                <div className=" flex-col items-center justify-center">
                  <h1 className="text-3xl  text-center">
                    Hello, Ticket Support{" "}
                  </h1>
                  <h1 className="text-md mt-2 mb-6 text-center w-[300px]">
                    Log in to your Bug-Nest account to manage your ticket or new
                    user{" "}
                    <span>
                      <button
                        className="hover:cursor-pointer text-blue-700"
                        onClick={handleNavigate}
                      >
                        Register
                      </button>
                    </span>
                  </h1>
                  <form onSubmit={handleSubmit}>
                    {/* <label className="text-xl">Email:</label> */}
                    <div className="flex relative">
                      <input
                        type="email"
                        name="email"
                        className="border-gray-500 border w-full  h-10 outline-none px-2 py-1 bg-transparent placeholder:text-gray-500"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                      <AiOutlineMail className="w-7 top-1 h-7  text-gray-300 absolute right-0.5" />
                    </div>
                    <p className="py-1 px-2 h-5 mb-3 text-red-500">
                      {(emailError && emailError ? emailError : "") ||
                        (noEmail && noEmail ? noEmail : "")}
                    </p>
                    {/* <label className="text-xl">Password:</label> */}
                    <div className="flex relative">
                      <input
                        type="password"
                        name="password"
                        className="border-gray-500 border w-full  h-10 outline-none px-2 py-1 bg-transparent text-black  placeholder:text-gray-500"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                      <RiLockPasswordLine className="w-7 top-1 h-7  text-gray-300 absolute right-0" />
                    </div>
                    <p className="py-1 px-2 h-5 mb-3 text-red-500">
                      {(passwordError && passwordError ? passwordError : "") ||
                        (noPassword && noPassword ? noPassword : "")}
                    </p>
                    <button
                      className=" w-full px-2 border h-10 bg-black py-1 flex items-center justify-between text-white "
                      type="submit"
                    >
                      <div className="border-none text-lg">Login</div>
                      <FaArrowRight className="w-4 h-5" />
                    </button>
                  </form>
                  {/* <p className="text-end mt-2 mr-4 text-lg">
                  
                    Don't have an account ?{" "}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
