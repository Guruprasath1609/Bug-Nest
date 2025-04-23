import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Bird from "../assets/Box.jpg";
import { PiDotsNine } from "react-icons/pi";

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

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Navbar */}
      <nav className="relative bg-white h-12 text-black text-xl w-full flex items-center px-[13px] lg:px-8 ">
        <div className="flex-1 flex items-center font-[600] ">
          <img src={Bird} className="w-12 h-12  " />
          <div className="text-2xl absolute lg:left-[75px] left-[57px]">
            Bug-Nest
          </div>
        </div>

        <div className="flex items-center text-xl hover:cursor-pointer">
          <PiDotsNine
            className="w-7 h-7 text-gray-600 font-bold mr-1.5"
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
                  "absolute z-40  w-72 text-sm text-gray-400  bg-gray-900  rounded-lg shadow-xs  top-12 right-5 lg:right-10"
                : ""
            }
        `}
          >
            {isToggleOpen && (
              // <div className="p-6">
              //   <h1 className="text-center text-2xl mb-3 font-bold">
              //     User's Profile
              //   </h1>
              //   <h1 className="text-lg mb-1 font-semibold">
              //     Name:
              //     <span className="text-lg mb-2 ml-2 font-sans">
              //       {userInfo.name || "name"}
              //     </span>
              //   </h1>
              //   <h1 className="text-lg  font-semibold mb-3">
              //     Email:
              //     <span className="text-lg font-sans ml-2 break-all">
              //       {userInfo.email || "email"}
              //     </span>
              //   </h1>
              //   <button
              //     onClick={handleLogout}
              //     className="bg-red-600 px-4 py-1 text-white"
              //   >
              //     {" "}
              //     Logout
              //   </button>
              // </div>
              <div
                role="tooltip"
                className="absolute z-50 w-72 text-sm    rounded-lg shadow-xs opacity-100 dark:text-gray-300 dark:bg-gray-800"
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
                    <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg
                        class="absolute w-12 h-12 text-gray-400 -left-1"
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
                        className="text-white font-medium rounded-lg text-md px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <p className="text-base font-semibold leading-none dark:text-white">
                    <a href="#">{userInfo.name || "name"}</a>
                  </p>
                  <p className="mb-3 text-md font-normal">
                    <a href="#" className="">
                      {userInfo.email || "email"}
                    </a>
                  </p>
                  <p className="mb-4 text-md">
                    A true contributor to the betterment of the project.
                  </p>
                </div>
                <div></div>
              </div>
            )}
          </div>
        }

        <div className="  pt-8 flex  flex-col md:flex-row  items-center justify-start mb-8 md:ml-12">
          <div className="flex md:flex-row  gap-10">
            <h1 className="text-lg border-2 py-3  px-4 border-gray-400 w-[180px]">
              All Tickets:
              <div className="text-left font-bold text-3xl">
                {array.length > 0 ? <span>{array.length}</span> : "0"}
              </div>
            </h1>
            <h1 className="text-lg border-2 py-3 px-4  border-gray-400 w-[180px] text-left">
              Open Tickets:
              <div className="text-left font-bold text-3xl">
                {openStatus.open || "0"}
              </div>
            </h1>
          </div>
        </div>

        <div className="flex lg:justify-start justify-center lg:ml-[35px]">
          <div>
            <button
              className="bg-gray-800 text-white  p-2 hover:bg-black rounded-lg"
              onClick={handleToggle}
            >
              Create a new Ticket
            </button>
          </div>
        </div>

        {/* Ticket creation page */}
        {isOpen ? (
          <div className="absolute top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>

            <div className="bg-white w-[470px] z-10 flex flex-col lg:w-[800px] mt-5 rounded-lg p-4">
              <div className="p-2 text-2xl">
                <div className="flex items-center justify-between border-b-2 border-gray-400">
                  <label>Create your Ticket</label>
                  <button className="" onClick={handleToggle}>
                    <FiX className=" w-8 h-12 text-red-600" />
                  </button>
                </div>

              <div>
                <div className="mt-4 text-xl">Title:</div>

              </div>


                <input
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2 h-12  p-2 rounded-lg outline-none"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="p-2 text-xl">
                <label>Description:</label>
                <textarea
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2 h-96  p-2 rounded-lg outline-none"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="p-2 text-xl mt-2">
                  <label>Bugs found at:</label>
                  <select
                    className=" border-black border-2 ml-2 px-2 text-lg rounded-md "
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
                    className="mr-2 bg-black text-white px-4 py-1  text-xl rounded-lg"
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
          <div className="flex lg:items-center lg:justify-center overflow-x-auto w-full font-sans font-medium text-lg">
            <table className="border-black  mt-8 mb-2 min-w-[950px] lg:w-[95%] mx-6 lg:mx-0 ">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border-gray-500 border-b-2 px-4 py-3 md:w-[50px] border-r-2 border-t-2">
                    S.No
                  </th>
                  <th className="border-gray-500 border-b-2 px-4 py-3 md:w-[200px] border-r-2  border-t-2">
                    Title
                  </th>
                  <th className="border-gray-500 border-b-2 px-4 py-3 border-r-2 border-t-2">
                    Description
                  </th>
                  <th className="border-gray-500 border-b-2 px-4 py-3 md:w-[150px] border-r-2 border-t-2">
                    Bugs Found at
                  </th>
                  <th className="border-gray-500 border-b-2 px-4 py-3 md:w-[100px] border-r-2 border-t-2">
                    Status
                  </th>
                  <th className="border-gray-500 border-b-2 px-4 py-3 md:w-[170px] border-t-2">
                    Ticket created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {array.map((arr, index) => (
                  <tr key={arr._id} className="text-center hover:bg-gray-200">
                    <td className="border-gray-400 border-b-2 border-r-2 px-4 py-4">
                      {index + 1 + "."}
                    </td>
                    <td className="border-gray-400 border-b-2 px-4 py-4 border-r-2 text-left">
                      {arr.title}
                    </td>
                    <td className="border-gray-400 border-b-2 px-4 py-4 text-left border-r-2">
                      {arr.description}
                    </td>
                    <td className="border-gray-400 border-b-2 px-4 py-4 border-r-2">
                      {arr.bugsFoundAt}
                    </td>
                    <td className="border-gray-400 border-b-2 px-4 py-4 border-r-2">
                      {arr.status}
                    </td>
                    <td className="border-gray-400 border-b-2 px-2 py-4 ">
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
};

export default Home;
