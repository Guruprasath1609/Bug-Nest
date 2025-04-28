import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Bird from "../assets/Box.jpg";
import { PiDotsNine } from "react-icons/pi";
import AssignedTicketsPage from "./AssignedTicketsPage";

const Home = () => {
  const [userInfo, setUserInfo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugsFoundAt, setBugsFoundAt] = useState("Frontend");
  const [array, setArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState("");
  const [assignedTicketsArray,setAssignedTicketsArray]=useState([])
  const [AssignedTicketsOpen,setAssignedTicketsOpen]=useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAssignedTickets=()=>{
    setAssignedTicketsOpen(!AssignedTicketsOpen)
  }


  // Fetch tickets on initial render and also when ever a new ticket is created
  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/ticket/fetch-tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setArray((prev) => response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, [refresh]);

  // Fetches userInfo and userToken on the initial render
  useEffect(() => {
    if (
      !localStorage.getItem("userInfo") ||
      !localStorage.getItem("userToken")
    ) {
      navigate("/");
    }
    {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  const id = userInfo._id;
  // Click function to create a new ticket in database
  const handleClick = async () => {
    const newTicket = {
      title: title,
      description: description,
      bugsFoundAt: bugsFoundAt,
      id: id,
    };
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
      setTitle("");
      setDescription("");
      handleToggle();
      setRefresh((prev) => !prev);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Handles logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handleUserInfo = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  useEffect(() => {
    const statusData = array.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
    setOpenStatus(statusData);
  }, [array]);

 
  useEffect(() => {
    const fetchAssignedTickets = async () => {
      const token = localStorage.getItem("userToken");
      // const name = JSON.parse(localStorage.getItem("userInfo")).name;
      
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/users/ticket/fetchAssignedTickets`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setAssignedTicketsArray((prev)=>response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignedTickets()
  }, [assignedTicketsArray]);

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Navbar */}
      <nav className="fixed bg-white h-12 text-black text-xl w-full flex items-center px-[13px] md:px-[15px] lg:px-8">
        <div className="flex-1 flex items-center font-[600] ">
          <img src={Bird} className="w-12 h-12  " />
          <div className="text-2xl absolute md:left-[59px] left-[57px] lg:left-[75px]">
            Bug-Nest
          </div>
        </div>

        <div className="flex items-center text-xl hover:cursor-pointer">
          <PiDotsNine
            className="w-7 h-7 text-gray-600 font-bold mr-1.5 hover:text-black"
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
                ? //  " absolute top-12 right-2 h-[215px] w-[300px] bg-gray-200  text-black transform transition-transform duration-1000 opacity-100"
                  "absolute z-40  w-72 text-sm text-gray-900  bg-gray-900  rounded-lg shadow-xs  top-12 right-5 lg:right-10"
                : ""
            }
        `}
          >
            {isToggleOpen && (
              <div
                role="tooltip"
                className="fixed z-50 w-72 text-sm    rounded-lg shadow-xl opacity-100 text-black bg-white border-2 border-gray-300"
              >
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    {/* <a href="#">
                      <img
                        className="w-10 h-10 rounded-full"
                        src=""
                        alt={userInfo.name}
                      />
                    </a> */}
                    <div class="relative w-10 h-10 overflow-hidden bg-gray-900 rounded-full dark:bg-gray-600">
                      <svg
                        class="absolute w-12 h-12 text-gray-300 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>

                    <div>
                      <button
                        type="button"
                        className="text-white font-medium rounded-lg text-md px-3 py-1.5 bg-gray-800  focus:outline-none hover:bg-black"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <p className="text-base font-semibold leading-none text-gray-900 mt-4 mb-1">
                    <a href="#">{userInfo.name || "name"}</a>
                  </p>
                  <p className="mb-3 text-md font-medium">
                    <a href="#" className="">
                      {userInfo.email || "email"}
                    </a>
                  </p>
                  <p className="mb-4 text-md font-medium">
                    A true contributor to the betterment of the project.
                  </p>
                </div>
                <div></div>
              </div>
            )}
          </div>
        }

        <div className="  pt-20 flex  flex-col md:flex-row  items-center justify-start mb-8 md:ml-[25px] lg:ml-[40px]">
          <div className="flex flex-row   gap-5">
            <h1 className="text-lg border-2 py-3  px-4 border-gray-400 w-[180px] rounded-lg">
              All Tickets:
              <div className="text-left font-bold text-3xl">
                {array.length > 0 ? <span>{array.length}</span> : "0"}
              </div>
            </h1>
            <h1 className="text-lg border-2 py-3 px-4  border-gray-400 w-[180px] text-left rounded-lg">
              Open Tickets:
              <div className="text-left font-bold text-3xl">
                {openStatus.open || "0"}
              </div>
            </h1>
          </div>
        </div>

        <div className="flex md:justify-between justify-center md:ml-[25px] lg:ml-[40px] gap-10 ">
          <div>
            <button
              className="bg-gray-800 text-white  p-2 hover:bg-black rounded-lg text-base ml-1"
              onClick={handleToggle}
            >
              Create a new Ticket
            </button>
          </div>

          <div className="lg:mr-10 md:mr-8">
            <button
              className="bg-gray-800 text-white  p-2 hover:bg-black rounded-lg text-base"
              onClick={handleAssignedTickets}
            >
              {AssignedTicketsOpen ? 'Close Assigned Ticket' : 'View Assigned Tickets'}
            </button>
          </div>
        </div>
        

        {AssignedTicketsOpen ?
         (<>
          <div className=" ml-[25px] mt-8 lg:ml-[40px] text-2xl font-bold">
          Tickets Assigned :
        </div>
          <AssignedTicketsPage array={assignedTicketsArray} />
          </>
        ) : 
          ""
        
        }

        <div className=" ml-[25px] mt-8 lg:ml-[40px] text-2xl font-bold">
          Tickets Created :
        </div>

        {/* Ticket creation page */}
        {isOpen ? (
          <div className="fixed top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>

            <div className="bg-white w-[470px] z-10 flex flex-col lg:w-[700px]  rounded-lg p-8 lg:px-12 lg:py-12 ">
              <div className="p-2 text-2xl">
                <div className="flex items-center justify-between border-b-2 border-gray-400">
                  <label className="text-2xl font-bold">
                    Create your Ticket
                  </label>
                  <button className="" onClick={handleToggle}>
                    <FiX className=" w-8 h-12 text-gray-700 hover:text-black" />
                  </button>
                </div>

                <div>
                  <div className="mt-4 text-lg">Title:</div>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2  p-2 rounded-lg outline-none text-base"
                  value={title}
                  placeholder="Enter your title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 text-lg">
                <label>Description:</label>
                <textarea
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2 h-72  p-2 rounded-lg outline-none text-base"
                  value={description}
                  placeholder="Enter description here"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="p-2 text-lg mt-2">
                  <label>Bugs found at :</label>
                  <select
                    className=" border-gray-300 border-2 ml-2 px-1 text-base rounded-md py-1 outline-none  "
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
                    className="mr-2 bg-black text-white px-4 py-1  text-lg rounded-lg"
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
          <div className="flex lg:items-center lg:justify-center overflow-x-auto w-full  font-medium text-base">
            <table className="border-gray-100 border rounded-lg overflow-hidden  mt-8 mb-2 min-w-[1050px] lg:w-[95%] mx-6 lg:mx-0  ">
              <thead className="text-lg font-bold">
                <tr className="bg-gray-200 text-gray-900 ">
                  <th className="border-gray-200 border-b-2 px-4 py-4 md:w-[50px] border-r-2 border-t-2">
                    S.No
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-4 md:w-[200px] border-r-2  border-t-2">
                    Title
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-4 border-r-2 border-t-2">
                    Description
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-4 w-[170px] border-r-2 border-t-2">
                    Bugs Found at
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-4 md:w-[100px] border-r-2 border-t-2">
                    Status
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-4 w-[170px] border-t-2">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {array.map((arr, index) => (
                  <tr
                    key={arr._id}
                    className="text-center hover:bg-gray-200 bg-white text-[16px] text-gray-900"
                  >
                    <td className="border-gray-100 border-b-2 border-r-2 px-4 py-2">
                      {index + 1 + "."}
                    </td>
                    <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2 text-left">
                      {arr.title}
                    </td>
                    <td className="border-gray-100 border-b-2 px-4 py-2 text-left border-r-2">
                      {arr.description}
                    </td>
                    <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2">
                      {arr.bugsFoundAt}
                    </td>
                    <td
                      className={`border-gray-100 border-b-2 px-3 py-2 border-r-2 `}
                    >
                      <div
                        className={`rounded-md px-2 py-1 
                        ${arr.status === "open" ? "bg-yellow-100" : ""}
                        ${arr.status === "processing" ? "bg-pink-100" : ""}
                        ${arr.status === "resolved" ? "bg-blue-100" : ""}
                        ${arr.status === "closed" ? "bg-green-100" : ""}`}
                      >
                        {arr.status == "open" ? "Open" : ""}
                        {arr.status == "processing" ? "Processing" : ""}
                        {arr.status == "resolved" ? "Resolved" : ""}
                        {arr.status == "closed" ? "Closed" : ""}
                      </div>
                    </td>
                    <td className="border-gray-100 border-b-2 px-2 py-2 font-sans font-normal">
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
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 mt-8 text-xl font-bold text-center h-24 w-[90%] flex items-center justify-center sm:w-[95%] ">
              No tickets created
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
