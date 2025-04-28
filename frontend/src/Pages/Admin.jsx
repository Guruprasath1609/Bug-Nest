import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Bird from "../assets/Box.jpg";
import { PiDotsNine } from "react-icons/pi";
import { toast } from "sonner";
import { FaPencilAlt } from "react-icons/fa";

const Admin = () => {
  const [userInfo, setUserInfo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugsFoundAt, setBugsFoundAt] = useState("Frontend");
  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [updates, setUpdates] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(true);
  const [isTicketSlideOpen,setIsTicketSlideOpen]=useState(true)

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    priority: "",
    status: "",
    assignTo: [],
  });
  const [statusCount, setStatusCount] = useState({});
  const [priorityCount, setPriorityCount] = useState({});
  const [assignedToCount, setAssignedToCount] = useState({});
  const users = ["User-1", "User-2", "User-3", "User-4", "User-5"];
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("userToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/get-tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewArray(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, [refresh]);

  const handleTicketDetail = () => {
    setIsTicketDetailOpen(!isTicketDetailOpen);
    setIsTicketSlideOpen(!isTicketSlideOpen)
  };

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

  // const id = userInfo._id;

  // const handleClick = async () => {
  //   const newTicket = {
  //     title: title,
  //     description: description,
  //     bugsFoundAt: bugsFoundAt,
  //     id: id,
  //   };
  //   const token = localStorage.getItem("userToken");

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/users/ticket/create-ticket`,
  //       newTicket,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setTitle("");
  //     setDescription("");
  //     handleToggle();
  //     setRefresh((prev) => !prev);

  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    navigate("/");
  };

  const handleUpdate = async (id) => {
    const updateTicket = updates[id];
    if(!updateTicket){
      return toast.error("Please Select values to update", {
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
    }
    const token = localStorage.getItem("userToken");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/update-ticket`,
        { ...updateTicket, ticketId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Ticket updated Successfully", {
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
          marginTop:'30px'
        }
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      status: params.status || "",
      priority: params.priority || "",
      assignTo: params.assignTo ? params.assignTo.split(",") : [],
    });

    const fetchByFilters = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin?${searchParams.toString()}`
        );
        setArray(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchByFilters();
  }, [searchParams, refresh]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilters = { ...filters };

    if (type == "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    if (newArray.length > 0) {
      const statusData = newArray.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCount(statusData);

      const priorityData = newArray.reduce((acc, item) => {
        acc[item.priority] = (acc[item.priority] || 0) + 1;
        return acc;
      }, {});
      setPriorityCount(priorityData);

      const assignedToData = newArray.reduce((acc, item) => {
        acc[item.assignTo] = (acc[item.assignTo] || 0) + 1;
        return acc;
      }, {});
      setAssignedToCount(assignedToData);
    }
  }, [newArray]);

  const handleUserInfo = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed bg-white h-12 text-black text-xl w-full flex items-center px-[13px] md:px-[15px] lg:px-8 z-30">
        <div className="flex-1 flex items-center font-[600] ">
          <img src={Bird} className="w-12 h-12" />
          <div className="text-2xl absolute md:left-[59px] left-[57px] lg:left-[75px] ">
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
        {/* Admin Details */}
        {
          <div
            // " fixed top-12 right-2 h-[215px] w-[300px] bg-gray-200  text-black transform transition-transform duration-1000"
            className={`      
                  fixed z-40  w-72 text-base text-gray-800  bg-gray-900  rounded-lg shadow-xs  top-12 right-5 transform transition-transform  duration-1000 lg:right-10 ${
                    isToggleOpen ? "translate-y-0" : ""
                  }
            
        `}
          >
            {isToggleOpen && (
              <div
                role="tooltip"
                className="fixed z-40 w-72 text-sm   rounded-lg shadow-xs opacity-100 text-gray-800 dark:bg-white border-2 border-gray-300 bg-white"
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
                        className="text-white font-medium rounded-lg text-base px-2 py-1 bg-gray-800 hover:bg-black focus:outline-none "
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <p className="text-base font-semibold leading-none text-gray-800 mt-4 mb-1">
                    <a href="#">{userInfo.name || "name"}</a>
                  </p>
                  <p className="mb-3  font-normal">
                    <a href="#" className="">
                      {userInfo.email || "email"}
                    </a>
                  </p>
                  <p className="mb-4 ">
                    The one who acts as a task assigner and status updater.
                  </p>
                </div>
                <div></div>
              </div>
            )}
          </div>
        }

        <div className="  pt-20 flex  flex-col md:flex-row  items-center justify-start mb-8 md:ml-[25px] lg:ml-[40px] ">
          <div className="flex md:flex-row   gap-5">
            <h1 className="text-lg border-2 py-3  px-4 border-gray-400 w-[180px] rounded-lg">
              All Tickets:
              <div className="text-left font-bold text-3xl">
                {newArray.length > 0 ? <span>{newArray.length}</span> : "0"}
              </div>
            </h1>
            <h1 className="text-lg border-2 py-3 px-4  border-gray-400 w-[180px] text-left rounded-lg">
              Open Tickets:
              <div className="text-left font-bold text-3xl">
                {statusCount.open || 0}
              </div>
            </h1>
          </div>
        </div>

        {/* <div className="  mt-4  w-full  mb-8 flex justify-center">
          <div className="h-[200px] w-[600px] bg-black opacity-75 rounded-xl text-white flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-2 pr-[155px]">
              User Name:{userInfo.name || "name"}
            </h1>
            <h1 className="text-2xl mb-2 ">
              User Email:{userInfo.email || "email"}
            </h1>
            <h1 className="text-2xl pr-[42px]">
              Number of Tickets Created:
              {array.length > 0 ? <span>{array.length}</span> : ""}
            </h1>
          </div>
        </div> */}
        {/* <div className="text-lg ml-8 lg:ml-12">
          Want to know more details?
          <span
            className="text-base ml-4 bg-gray-800 text-white px-2 py-1 rounded-md hover:cursor-pointer"
            onClick={handleTicketDetail}
          >
            Click here
          </span>
        </div> */}
        {isTicketSlideOpen && (
          <div className="flex items-center justify-center ">
            <div
              className={` transform transition-transform duration-700 ease-in-out  flex px-20 lg:px-2 justify-center gap-10   lg:flex-row  lg:items-end items-center flex-col z-20  lg:top-[10%] top-12 border-gray-900  bg-gray-100 p-8  w-[484px]  lg:w-full lg:mx-[42px] mt-2 rounded-xl lg:mt-0 border-4 
            
            ${
              isTicketDetailOpen
                ? "translate-x-0  "
                : "-translate-x-full  overflow-hidden left-0 mr-96"
            }

          `}
            >
              {/* <FiX
              className="absolute w-8 h-8 top-1 right-2 text-gray-700 cursor-pointer hover:text-black"
              onClick={handleTicketDetail}
            /> */}
              <div className="h-[250px] w-[300px] lg:w-[250px] xl:w-[300px] bg-gray-800  flex items-start justify-start text-white p-8  rounded-lg shadow-xl lg:p-6 xl:p-8">
                <div>
                  <h1 className="font-semibold text-xl  mb-8 ">
                    Priority of the Tickets:
                  </h1>
                  <h1 className="text-lg ">
                    <span className="bg-yellow-100 px-2 py-1 rounded-lg text-black">
                      Low
                    </span>{" "}
                    : {priorityCount.Low || 0}
                  </h1>
                  <h1 className="text-lg  mt-3">
                    <span className="bg-pink-100 px-2 py-1 rounded-lg text-black">
                      Medium
                    </span>{" "}
                    : {priorityCount.Medium || 0}
                  </h1>
                  <h1 className="text-lg  mt-3">
                    <span className="bg-blue-100 px-2 py-1 rounded-lg text-black">
                      High
                    </span>{" "}
                    : {priorityCount.High || 0}
                  </h1>
                </div>
              </div>

              <div className="h-[300px] w-[325px] lg:w-[275px] xl:w-[325px] bg-gray-800  text-gray-800 flex items-start justify-start p-12 rounded-lg shadow-xl ">
                <div className="">
                  <h1 className="font-semibold text-xl mb-8 text-white ">
                    Status of the Tickets:
                  </h1>
                  <h1 className="text-lg  text-white">
                    <span className="bg-yellow-100 px-2 py-1 rounded-lg text-black">
                      Open
                    </span>{" "}
                    : {statusCount.open || 0}
                  </h1>
                  <h1 className="text-lg mt-3  text-white">
                    <span className="bg-pink-100 px-2 py-1 rounded-lg text-black">
                      Processing
                    </span>{" "}
                    : {statusCount.processing || 0}
                  </h1>
                  <h1 className="text-lg  mt-3 text-white">
                    <span className="bg-blue-100 px-2 py-1 rounded-lg text-black">
                      Resolved
                    </span>{" "}
                    : {statusCount.resolved || 0}
                  </h1>
                  <h1 className="text-lg  mt-3 text-white">
                    <span className="bg-green-100 px-2 py-1 rounded-lg text-black">
                      Closed
                    </span>{" "}
                    : {statusCount.closed || 0}
                  </h1>
                </div>
              </div>

              <div className="h-[350px] w-[350px] lg:w-[310px] xl:w-[350px] bg-gray-800  text-white flex items-start justify-start p-16 rounded-lg shadow-xl  ">
                <div className="">
                  <h1 className="font-semibold text-xl  mb-7">
                    Assigned User List:
                  </h1>
                  <div className=" ">
                    <div className="">
                      <h1 className="text-lg  ">
                        <span className="bg-yellow-100 px-2 py-1 rounded-lg text-black">
                          Roman
                        </span>{" "}
                        : {assignedToCount["User-1"] || 0}
                      </h1>
                      <h1 className="text-lg  mt-3">
                        <span className="bg-pink-100 px-2 py-1 rounded-lg text-black">
                          Randy
                        </span>{" "}
                        : {assignedToCount["User-2"] || 0}
                      </h1>
                      <h1 className="text-lg  mt-3">
                        <span className="bg-blue-100 px-2 py-1 rounded-lg text-black">
                          John
                        </span>{" "}
                        : {assignedToCount["User-3"] || 0}
                      </h1>
                    </div>
                    <div className="">
                      <h1 className="text-lg  mt-3">
                        <span className="bg-green-100 px-2 py-1 rounded-lg text-black">
                          Peter
                        </span>{" "}
                        : {assignedToCount["User-4"] || 0}
                      </h1>
                      <h1 className="text-lg  mt-3">
                        <span className="bg-red-200 px-2 py-1 rounded-lg text-black">
                          Michael
                        </span>{" "}
                        : {assignedToCount["User-5"] || 0}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters option */}
        <div className="flex gap-10 items-center mt-8">
          <div>
            <button
              className="lg:ml-[40px] ml-[23px] text-lg flex  px-2 py-1  rounded-md bg-gray-800 text-white outline-none border-2 brder-gray-100"
              onClick={handleToggle}
            >
              <span>
                <FaFilter className="w-[15px] h-[15px] mt-[6px] mr-1" />
              </span>
              Filters
            </button>
          </div>

          {
            <div
              className={`fixed w-[300px] h-screen bg-gray-100 top-0  transform transition-transform duration-700 ease-in-out z-50 ${
                isOpen ? " translate-x-0 " : "-translate-x-full"
              }`}
            >
              <div className="border-b-[3px] border-gray-800 flex items-center justify-between px-2 ">
                <h1 className="text-2xl font-bold  text-black ">Filters</h1>

                <FiX
                  className=" w-8 h-12 text-gray-950 hover:text-black hover:cursor-pointer "
                  onClick={handleToggle}
                />
              </div>

              <div className="flex flex-col gap-10 px-8">
                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold mt-8">
                      Priority:
                    </span>
                    <select
                      name="priority"
                      value={filters.priority || ""}
                      className="text-base border-2 border-black px-2 py-1 mt-2  rounded-md outline-none"
                      onChange={(e) => handleFilterChange(e)}
                    >
                      <option value="">Select</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold">Status:</span>
                    <select
                      name="status"
                      value={filters.status || ""}
                      className="text-base border-2 border-black px-2 py-1  rounded-md outline-none mt-2 "
                      onChange={(e) => handleFilterChange(e)}
                    >
                      <option value="">Select</option>
                      <option value="open">Open</option>
                      <option value="processing">Processing</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex-col">
                    <span className="text-xl font-semibold">Assigned To:</span>
                    <div className="flex flex-col gap-3 text-base ml-1 mt-3">
                      {users.map((user) => (
                        <div className="flex" key={user}>
                          <div className="flex items-center space-x-3">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                className=" sr-only peer"
                                type="checkbox"
                                value={user}
                                name="assignTo"
                                checked={(filters.assignTo || []).includes(
                                  user
                                )}
                                onChange={(e) => handleFilterChange(e)}
                              />
                              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-800"></div>
                            </label>
                            <span>
                              {user == "User-1"
                                ? "Roman"
                                : user == "User-2"
                                ? "Randy"
                                : user == "User-3"
                                ? "John"
                                : user == "User-4"
                                ? "Peter"
                                : user == "User-5"
                                ? "Michael"
                                : ""}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div>
                    <button
                      onClick={() => {
                        setSearchParams("");
                        setFilters({ priority: "", status: "", assignTo: [] });
                      }}
                      className="text-lg text-red-600"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        {/* <div className="w-full flex justify-center">
          <div>
            <button
              className="bg-blue-500 rounded-md p-2"
              onClick={handleToggle}
            >
              Create a new Ticket
            </button>
          </div>
        </div> */}

        {/* <div className="absolute top-0 w-full h-screen flex items-center justify-center z-10">
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
          </div> */}

        <div className="ml-[25px] mt-8 lg:ml-[40px] text-2xl font-bold">
          Tickets:
        </div>

        {/* Table for fetching and updating data */}
        {array.length > 0 ? (
          <div className="flex xl:items-center xl:justify-center overflow-x-auto w-full  font-medium text-base ">
            <div className="min-w-[1300px] xl:w-[95%] mt-8 mb-2  mx-6 lg:ml-8 xl:mx-0  border-2 border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="text-[18px] font-bold">
                  <tr className="bg-gray-200 text-gray-900  ">
                    <th className="border-gray-500  px-4 py-5 w-[50px] rounded-tl-lg">
                      S.No
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5 w-[150px]  ">
                      Title
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5   lg:w-[500px] w-[250px] ">
                      Description
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5 w-[190px] ">
                      Bugs found at
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5  w-[140px] ">
                      Priority
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5    w-[155px] ">
                      Status
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5  w-[140px] ">
                      Assign To
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-5    w-[140px] ">
                      Created at
                    </th>
                    <th className="border-gray-200 border-b-2 px-2 py-5 rounded-tr-lg ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((arr, index) => (
                    <tr
                      key={arr._id}
                      className="text-center hover:bg-gray-200 bg-white text-[16px]"
                    >
                      <td className="border-gray-100 border-b-2 border-r-2 px-4 py-2 ">
                        {index + 1 + "."}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2 text-left ">
                        {arr.title}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 text-left border-r-2">
                        {arr.description}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-4 border-r-2">
                        {arr.bugsFoundAt}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2">
                        <select
                          className={`border-black border-2 px-1 py-0.5 text-md w-full rounded-md ${
                            arr.priority === "Low"
                              ? "bg-yellow-100 rounded-md "
                              : ""
                          } ${
                            arr.priority === "Medium"
                              ? "bg-pink-100 rounded-md"
                              : ""
                          }${
                            arr.priority === "High"
                              ? "bg-blue-100 rounded-md"
                              : ""
                          }`}
                          value={
                            updates[arr._id]?.priority !== undefined
                              ? updates[arr._id].priority
                              : arr.priority
                          }
                          onChange={(e) => {
                            setUpdates((prev) => ({
                              ...prev,
                              [arr._id]: {
                                ...prev[arr._id],
                                priority: e.target.value,
                              },
                            }));
                          }}
                        >
                          <option value="">Select</option>
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2">
                        <select
                          className={`w-full border-2 border-black rounded-md ${
                            arr.status === "open" ? "bg-yellow-100" : ""
                          }
                        ${arr.status === "processing" ? "bg-pink-100" : ""}${
                            arr.status === "resolved" ? "bg-blue-100" : ""
                          }${arr.status === "closed" ? "bg-green-100" : ""}`}
                          value={
                            updates[arr._id]?.status !== undefined
                              ? updates[arr._id].status
                              : arr.status
                          }
                          onChange={(e) => {
                            setUpdates((prev) => ({
                              ...prev,
                              [arr._id]: {
                                ...prev[arr._id],
                                status: e.target.value,
                              },
                            }));
                          }}
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          <option value="open">Open</option>
                          <option value="processing">Processing</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-4 border-r-2 ">
                        <select
                          className={`border-black border-2 px-1 py-0.5 text-md w-full rounded-md ${
                            arr.assignTo === "User-1" ? "bg-yellow-100" : ""
                          }${arr.assignTo === "User-2" ? "bg-pink-100" : ""}${
                            arr.assignTo === "User-3" ? "bg-blue-100" : ""
                          }${arr.assignTo === "User-4" ? "bg-green-100" : ""}${
                            arr.assignTo === "User-5" ? "bg-red-200" : ""
                          }`}
                          value={
                            updates[arr._id]?.assignTo !== undefined
                              ? updates[arr._id].assignTo
                              : arr.assignTo
                          }
                          onChange={(e) => {
                            setUpdates((prev) => ({
                              ...prev,
                              [arr._id]: {
                                ...prev[arr._id],
                                assignTo: e.target.value,
                              },
                            }));
                          }}
                        >
                          <option value="">Select</option>
                          <option value="User-1">Roman</option>
                          <option value="User-2">Randy</option>
                          <option value="User-3">John</option>
                          <option value="User-4">Peter</option>
                          <option value="User-5">Michael</option>
                        </select>
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2 font-sans font-normal">
                        {new Date(arr.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="border-gray-100 border-b-2 px-2 py-2">
                        <button
                          className=" px-1.5 py-1  text-[18px]"
                          onClick={() => handleUpdate(arr._id)}
                        >
                          <FaPencilAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 mt-8 text-xl font-bold text-center h-24 w-[90%] flex items-center justify-center sm:w-[95%] ">
              No tickets found
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
