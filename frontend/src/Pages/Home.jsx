import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import {FiX} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bird from '../assets/Box.jpg'
import { PiDotsNine } from "react-icons/pi";


const Home = () => {
  const [userInfo,setUserInfo]=useState('')
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [bugsFoundAt,setBugsFoundAt]=useState("Frontend")
  const [array,setArray]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate()
  const [isToggleOpen,setIsToggleOpen]=useState(false)
  const [openStatus,setOpenStatus]=useState('')


  const handleToggle=()=>{
    setIsOpen(!isOpen)
  }

  // Fetch tickets on initial render and also when ever a new ticket is created
  useEffect( ()=>{
    
    const fetchTickets=async ()=>{ 
      const token=localStorage.getItem('userToken')
     try {
         const response = await axios.get(
           `${import.meta.env.VITE_BACKEND_URL}/api/users/ticket/fetch-tickets`,
           {
            headers:{
              Authorization:`Bearer ${token}`
            },
           }
         );
         
        setArray((prev) => response.data);
       } catch (error) {
        console.error(error);
        
       }
    }
    fetchTickets()

  },[refresh])



  // Fetches userInfo and userToken on the initial render
  useEffect(()=>{
    if (!localStorage.getItem("userInfo") || !localStorage.getItem("userToken")) 
    {navigate('/')}
    {setUserInfo(JSON.parse(localStorage.getItem('userInfo')))}
  },[])
  
  
  
  const id=userInfo._id
  // Click function to create a new ticket in database
  const handleClick=async ()=>{
    const newTicket=
      {
        title: title,
        description: description,
        bugsFoundAt: bugsFoundAt,
        id:id
      }
       const token = localStorage.getItem("userToken");
   
   try {
     const response = await axios.post(
       `${import.meta.env.VITE_BACKEND_URL}/api/users/ticket/create-ticket`,
       newTicket,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
     setTitle('')
     setDescription('')
     handleToggle() 
     setRefresh(prev =>!prev)

     return response.data
   } catch (error) {
    console.error(error);
    
   }


  }

  // Handles logout
  const handleLogout=()=>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userToken')
    navigate('/')

  }

  const handleUserInfo=()=>{
    setIsToggleOpen(!isToggleOpen)
  }

  useEffect(()=>{
    const statusData=array.reduce((acc,item)=>{
      acc[item.status]=(acc[item.status] || 0) + 1
      return acc
    },{})
    setOpenStatus(statusData)
  },[array])
  
  

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Navbar */}
      <nav className="relative bg-white h-12 text-black text-xl w-full flex items-center px-4 ">
        <div className="flex-1 flex items-center font-[600] ">
          <img src={Bird} className="w-12 h-12" />
          <div className="text-2xl absolute left-[55px] ">Bug-Nest</div>
        </div>

        <div className="flex items-center text-xl hover:cursor-pointer">
          <PiDotsNine
            className="w-7 h-7 text-gray-600 font-bold"
            onClick={handleUserInfo}
          />
        </div>
      </nav>

      <main className="">
        {/* User Profile */}

        {
          <div
            className={`${
              isToggleOpen
                ? " fixed top-12 right-2 h-[215px] w-[300px] bg-gray-200  text-black transform transition-transform duration-1000"
                : ""
            }
        `}
          >
            {isToggleOpen && (
              <div className="p-6">
                <h1 className="text-center text-2xl mb-3 font-bold">
                  User's Profile
                </h1>
                <h1 className="text-lg mb-1 font-semibold">
                  Name:
                  <span className="text-lg mb-2 ml-2 font-sans">
                    {userInfo.name || "name"}
                  </span>
                </h1>
                <h1 className="text-lg  font-semibold mb-3">
                  Email:
                  <span className="text-lg font-sans ml-2 break-all">
                    {userInfo.email || "email"}
                  </span>
                </h1>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-1 text-white"
                >
                  {" "}
                  Logout
                </button>
              </div>
            )}
          </div>
        }

        <div className="  pt-8 flex  flex-col md:flex-row w-[full] items-center justify-start mb-8 md:ml-20">
          <div className="flex md:flex-row  gap-10">
            <h1 className="text-lg border-2 p-3 h-[80px] border-gray-400 w-[115px]">
              All Tickets:
              <div className="text-center">
                {array.length > 0 ? <span>{array.length}</span> : ""}
              </div>
            </h1>
            <h1 className="text-lg border-2 p-3 h-[80px] border-gray-400 w-[115px] text-center">
              Open:
              <div className="text-center">{openStatus.open}</div>
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div>
            <button className="bg-black text-white  p-2" onClick={handleToggle}>
              Create a new Ticket
            </button>
          </div>
        </div>

        {/* Ticket creation page */}
        {isOpen ? (
          <div className="absolute top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>

            <div className="bg-white w-[470px] z-10 flex flex-col lg:w-[800px] mt-5 ">
              <div className="p-2 text-2xl">
                <div className="flex items-center justify-between">
                  <label>Title:</label>
                  <button className="" onClick={handleToggle}>
                    <FiX className=" w-8 h-12 text-red-600" />
                  </button>
                </div>

                <input
                  type="text"
                  className="w-full border-gray-500 border-2 mt-2 h-12  p-2"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 text-2xl">
                <label>Description:</label>
                <textarea
                  type="text"
                  className="w-full border-gray-500 border-2 mt-2 h-96  p-2"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="p-2 text-2xl mt-2">
                  <label>Bugs found at:</label>
                  <select
                    className=" border-black border-2 ml-4 px-2 text-lg"
                    value={bugsFoundAt}
                    onChange={(e) => {
                      setBugsFoundAt(e.target.value);
                    }}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="UI">UI</option>
                    <option value="Devops">Devops</option>
                    <option value="Database">Database</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className=" ">
                  <button
                    className="mr-2 bg-black text-white px-4 py-2  text-xl"
                    onClick={handleClick}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Table for fetching data from database */}
        {array.length > 0 ? (
          <div className="flex lg:items-center lg:justify-center overflow-x-auto">
            <table className="border-black border-2 mt-8 mb-10 min-w-[900px]  m-4 lg:mx-20">
              <thead>
                <tr>
                  <th className="border-black border-2 px-2 py-1 md:w-[50px]">
                    S.No
                  </th>
                  <th className="border-black border-2 px-2 py-1 md:w-[250px]">
                    Title
                  </th>
                  <th className="border-black border-2 px-2 py-1">
                    Description
                  </th>
                  <th className="border-black border-2 px-2 py-1 md:w-[150px]">
                    Bugs Found at
                  </th>
                  <th className="border-black border-2 px-2 py-1 md:w-[100px]">
                    Status
                  </th>
                  <th className="border-black border-2 px-1 py-1 md:w-[100px]">
                    Ticket created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {array.map((arr, index) => (
                  <tr key={arr._id} className="text-center">
                    <td className="border-black border-2 px-2 py-1">
                      {index + 1 + "."}
                    </td>
                    <td className="border-black border-2 px-2 py-1">
                      {arr.title}
                    </td>
                    <td className="border-black border-2 px-2 py-1 text-left">
                      {arr.description}
                    </td>
                    <td className="border-black border-2 px-2 py-1">
                      {arr.bugsFoundAt}
                    </td>
                    <td className="border-black border-2 px-2 py-1">
                      {arr.status}
                    </td>
                    <td className="border-black border-2 px-1 py-1">
                      {new Date(arr.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default Home