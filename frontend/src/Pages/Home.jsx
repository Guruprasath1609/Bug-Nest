import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import {FiX} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const [userInfo,setUserInfo]=useState('')
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')
  const [bugsFoundAt,setBugsFoundAt]=useState("Frontend")
  const [array,setArray]=useState([])
  const [refresh,setRefresh]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const navigate=useNavigate()


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
  

  return (
    <>
      
      {/* Navbar */}
      <nav className="relative bg-black h-16 text-white text-3xl w-full flex items-center px-6">
        <div className="flex-1"></div>
        <div className="flex-1">Bug-Nest</div>
        <div className="flex items-center text-xl hover:cursor-pointer">
          <CiUser className="w-6 h-6 mt-0.5 mr-1" />
          <button onClick={handleLogout}> Logout</button>
        </div>
      </nav>


      <main>

        {/* User Profile */}
        <div className="relative  mt-4 flex  flex-col w-full items-center justify-center mb-8">
          <div>
            <h1 className="text-2xl mb-2">
              User Name:{userInfo.name || "name"}
            </h1>
            <h1 className="text-2xl mb-2">
              User Email:{userInfo.email || "email"}
            </h1>
            <h1 className="text-2xl">Number of Tickets Created:{array.length > 0 ? <span>{array.length}</span> : ''}</h1>
          </div>
        </div>


        <div className="w-full flex justify-center">
          <div>
            <button
              className="bg-blue-500 rounded-md p-2"
              onClick={handleToggle}
            >
              Create a new Ticket
            </button>
          </div>
        </div>

          {/* Ticket creation page */}
        {isOpen ? (
          <div className="absolute top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
            <button
              className="absolute z-20 top-16 right-5"
              onClick={handleToggle}
            >
              <FiX className=" w-12 h-12 text-white" />
            </button>
            <div className="bg-white h-[700px] w-[800px] z-10 flex flex-col ">
              <div className="p-2 text-2xl">
                <label>Title:</label>
                <input
                  type="text"
                  className="w-full border-gray-500 border-2 mt-2 h-12 rounded-lg p-2"
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
                  className="w-full border-gray-500 border-2 mt-2 h-96 rounded-lg p-2"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 text-2xl">
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
              <div className="w-full text-end mt-8">
                <button
                  className="mr-12 bg-blue-500 px-4 py-2 rounded-full text-xl"
                  onClick={handleClick}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Table for fetching data from database */}
        {array.length > 0 ? (
          <div className="flex items-center justify-center">
            <table className="border-black border-2 w-[90%] mt-8">
              <thead>
                <tr>
                  <th className="border-black border-2 px-2 py-1 w-[50px]">
                    S.No
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[250px]">Title</th>
                  <th className="border-black border-2 px-2 py-1">
                    Description
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[150px]">
                    Bugs Found at
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[100px]">
                    Status
                  </th>
                  <th className="border-black border-2 px-1 py-1 w-[100px]">
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
    </>
  );
}

export default Home