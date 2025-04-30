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
import WhiteBGImage from "../assets/WhiteBGImage.jpg"
import BWLoginImage from '../assets/BWLoginImage.jpg'
import GrayLogi from '../assets/GrayLogi.png'
import BG from '../assets/BG.jpg'
import { toast } from "sonner";

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
    if(e.target.name){
      setNoEmail('')
      setNoPassword('')
    }
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

      toast.success("Logged in Successfully", {
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
      {/* <div className="flex items-center justify-center w-full md:h-screen bg-black "> */}
      <div className="flex md:flex-row flex-col-reverse  items-center justify-center w-full md:h-screen">
        {/* Image div */}
        <div className="w-[485px] h-[550px] flex  items-center  justify-center md:w-[40%] md:h-screen bg-black ">
          {/* <div className="flex items-center justify-center bg-[rgb(44,69,80)] "> */}
          <img
            src={GrayLogi}
            alt=""
            className=" lg:w-[350px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[485px] h-[600px]   "
          />
        </div>
        {/* </div> */}

        {/* Login div */}
        <div className="w-[485px] md:w-[65%] h-[730px] md:h-screen flex items-center justify-center bg-white">
          {/* Image Section */}
          {/* <img
              src={BG}
              alt=""
              className="h-screen w-full "
            /> */}

          {/* Box section */}

          <div className=" flex items-center justify-center flex-col absolute bg-white w-[450px] h-[450px] shadow-2xl rounded-xl">
            {/* <h1 className="text-3xl font-semibold mb-8">
                Welcome to Bug-Nest{" "}
              </h1> */}

            <div className=" ">
              <div className=" flex-col items-center justify-center">
                <h1 className="text-[32px]  text-center font-extrabold tracking-normal">
                  Hello, Ticket Support{" "}
                </h1>
                <h1 className="text-md mt-2 mb-6 text-left w-[320px] font-semibold text-gray-400  ">
                  Login to your Bug-Nest account to manage tickets or new user{" "}
                  <span>
                    <button
                      className="hover:cursor-pointer text-gray-800 hover:text-blue-700 underline"
                      onClick={handleNavigate}
                    >
                      Register
                    </button>
                  </span>
                </h1>
                <form onSubmit={handleSubmit} className="text-[14px] ">
                  {/* <label className="text-xl">Email:</label> */}
                  <div className="flex relative">
                    <input
                      type="email"
                      name="email"
                      className="border-gray-300 border w-full  h-10 outline-none px-3 py-1 bg-transparent text-md font-semibold placeholder:text-gray-400 text-gray-400  rounded-md"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <AiOutlineMail className="w-[18px] top-3 h-[18px]  text-gray-300 absolute right-1.5" />
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
                      className="border-gray-300 border w-full  h-10 outline-none px-2 py-1 bg-transparent  
                      text-md font-semibold placeholder:text-gray-400 text-gray-400 rounded-md"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <RiLockPasswordLine className="w-[19px] top-2 h-[19px]  text-gray-300 absolute  right-1" />
                  </div>
                  <p className="py-1 px-2 h-5 mb-3 text-red-500">
                    {(passwordError && passwordError ? passwordError : "") ||
                      (noPassword && noPassword ? noPassword : "")}
                  </p>
                  <button
                    className=" w-full px-3 border bg-black py-3 flex items-center justify-between text-white rounded-md relative"
                    type="submit"
                  >
                    <div className="border-none text-[15px] font-semibold">
                      Login
                    </div>
                    <FaArrowRight className="w-[18px] h-[18px] absolute right-1.5" />
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
      {/* </div> */}
    </>
  );
};

export default AboutPage;
