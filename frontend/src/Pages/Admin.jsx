import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const [userInfo, setUserInfo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugsFoundAt, setBugsFoundAt] = useState("Frontend");
  const [array, setArray] = useState([]);
  const [updates,setUpdates]=useState({})
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams,setSearchParams]=useSearchParams()
  const [filters,setFilters]=useState({
    priority:'',
    status:'',
    assignTo:[]
  })
  const [statusCount,setStatusCount]=useState({})
  const [priorityCount,setPriorityCount]=useState({})
  const [assignedToCount,setAssignedToCount]=useState({})
  const users=['User-1','User-2','User-3','User-4','User-5']
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
        setArray(response.data);       
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
    console.log(refresh);
    
    
   
  }, [refresh]);

        
       


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

const handleUpdate=async (id)=>{
  const updateTicket= updates[id]
  // if(!updateTicket){
  //   alert('Please select values to update')
  //   return
  // }
  const token=localStorage.getItem('userToken')
  try {
    const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/update-ticket`,{...updateTicket,ticketId:id},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
    setRefresh(prev => !prev)
  } catch (error) {
    console.error(error);
    
  };
  
}

useEffect(()=>{
  const params=Object.fromEntries([...searchParams])
  setFilters(
    {
      status:params.status || '',
      priority:params.priority || '',
      assignTo:params.assignTo ? params.assignTo.split(',') : []
    }
  )

  const fetchByFilters=async ()=>{
    try {
      const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin?${searchParams.toString()}`)
      setArray(response.data)
      
    } catch (error) {
      console.error(error);
      
    }
  }
  fetchByFilters()
  
  
},[searchParams,refresh])

const handleFilterChange=(e)=>{
  const {name,value,type,checked}=e.target
  let newFilters= {...filters}
  
  if(type == 'checkbox'){
    if(checked){
    newFilters[name]=[...(newFilters[name] || []),value]
  }
  else{
    newFilters[name]=newFilters[name].filter((item)=>item !== value)
  }
}else{
  newFilters[name]=value
}



setFilters(newFilters)
updateURLParams(newFilters)
}
const updateURLParams=(newFilters)=>{
  const params=new URLSearchParams()

  Object.keys(newFilters).forEach((key)=>{
    if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
      params.append(key,newFilters[key].join(','))
    }else{
      params.append(key,newFilters[key])
    }
  })
  setSearchParams(params)
   navigate(`?${params.toString()}`);
}

useEffect(()=>{
  if(array.length > 0){
    const statusData=array.reduce((acc,item)=>{
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    },{})
    setStatusCount(statusData)
    

    const priorityData=array.reduce((acc,item)=>{
      acc[item.priority]=(acc[item.priority] || 0) + 1
      return acc
    },{})
    setPriorityCount(priorityData)

    const assignedToData=array.reduce((acc,item)=>{
      acc[item.assignTo]=(acc[item.assignTo] || 0) + 1
      return acc
    },{})
    setAssignedToCount(assignedToData); 
  }
    
},[array])





  return (
    <>
      {/* Navbar */}
      <nav className=" fixed top-0 left-0 bg-black h-16 text-white text-3xl w-full flex items-center px-6 opacity-100 z-10">
        <div className="flex-1"></div>
        <div className="flex-1">Bug-Nest</div>

        {/* Logout Button */}
        <div className="flex items-center text-xl hover:cursor-pointer">
          <CiUser className="w-6 h-6 mt-0.5 mr-1" />
          <button onClick={handleLogout}> Logout</button>
        </div>
      </nav>

      <main className="mt-20">
        {/* Admin Details */}
        <div className="  mt-4  w-full  mb-8 flex justify-center">
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
        </div>

        <div className="w-full flex px-20 justify-center gap-20  mb-5">
          <div className="h-[200px] w-[300px] bg-black opacity-75 rounded-xl text-white flex items-center justify-center">
            <div>
              <h1 className="font-semibold text-xl mb-2 ">
                Status of the Tickets:
              </h1>
              <h1 className="text-lg pl-8">Open : {statusCount.open || 0}</h1>
              <h1 className="text-lg pl-8">
                Processing : {statusCount.processing || 0}
              </h1>
              <h1 className="text-lg pl-8">
                Resolved : {statusCount.resolved || 0}
              </h1>
              <h1 className="text-lg pl-8">
                Closed : {statusCount.closed || 0}
              </h1>
            </div>
          </div>

          <div className="h-[200px] w-[300px] bg-black opacity-75 rounded-xl text-white flex items-center justify-center">
            <div>
              <h1 className="font-semibold text-xl  mb-2">
                Priority of the Tickets:
              </h1>
              <h1 className="text-lg pl-8">Low : {priorityCount.Low || 0}</h1>
              <h1 className="text-lg pl-8">
                Medium : {priorityCount.Medium || 0}
              </h1>
              <h1 className="text-lg pl-8">High : {priorityCount.High || 0}</h1>
            </div>
          </div>

          <div className="h-[200px] w-[300px] bg-black opacity-75 rounded-xl text-white flex items-center justify-center">
            <div>
              <h1 className="font-semibold text-xl  mb-2">
                Assigned User List:
              </h1>
              <h1 className="text-lg pl-8">
                User-1 : {assignedToCount["User-1"] || 0}
              </h1>
              <h1 className="text-lg pl-8">
                User-2 : {assignedToCount["User-2"] || 0}
              </h1>
              <h1 className="text-lg pl-8">
                User-3 : {assignedToCount["User-3"] || 0}
              </h1>
              <h1 className="text-lg pl-8">
                User-4 : {assignedToCount["User-4"] || 0}
              </h1>
              <h1 className="text-lg pl-8">
                User-5 : {assignedToCount["User-5"] || 0}
              </h1>
            </div>
          </div>
        </div>

        {/* Filters option */}
        <div className="flex gap-10">
          <div>
            <button
              className="ml-20 text-2xl flex border-2 px-2 py-1  rounded-lg border-gray-500"
              onClick={handleToggle}
            >
              <span>
                <FaFilter className="w-5 h-5 mt-2 mr-1" />
              </span>
              Filters
            </button>
          </div>

          {isOpen ? (
            <div className="flex gap-10">
              <div>
                <div>
                  <span className="text-xl">Priority:</span>
                  <select
                    name="priority"
                    value={filters.priority || ""}
                    className="text-xl border-2 border-black px-2 py-1 ml-1 rounded-md"
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
                <div>
                  <span className="text-xl">Status:</span>
                  <select
                    name="status"
                    value={filters.status || ""}
                    className="text-xl border-2 border-black px-2 py-1 ml-1 rounded-md"
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
                <div className="flex">
                  <span className="text-xl">Assigned To:</span>
                  <div className="flex gap-5 text-xl ml-2">
                    {users.map((user) => (
                      <div className="flex" key={user}>
                        <div>
                          <input
                            className="w-4 h-4 mr-1"
                            type="checkbox"
                            value={user}
                            name="assignTo"
                            checked={(filters.assignTo || []).includes(user)}
                            onChange={(e) => handleFilterChange(e)}
                          />
                          <span>{user}</span>
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
                    className="text-xl text-red-600"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
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

        {/* Table for fetching and updating data */}
        {array.length > 0 ? (
          <div className="flex items-center justify-center">
            <table className="border-black border-2 w-[90%] mt-8 mb-10">
              <thead>
                <tr>
                  <th className="border-black border-2 px-2 py-1 w-[50px]">
                    S.No
                  </th>
                  <th className="border-black border-2 px-1 py-1 w-[250px]">
                    Title
                  </th>
                  <th className="border-black border-2 px-2 py-1">
                    Description
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[120px]">
                    Bugs Found at
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[120px]">
                    Priority
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[120px]">
                    Status
                  </th>
                  <th className="border-black border-2 px-2 py-1 w-[120px]">
                    Assign To
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
                    <td className="border-black border-2 px-1 py-1">
                      {arr.title}
                    </td>
                    <td className="border-black border-2 px-2 py-1 text-left">
                      {arr.description}
                    </td>
                    <td className="border-black border-2 px-2 py-1">
                      {arr.bugsFoundAt}
                    </td>
                    <td className="border-black border-2 px-2 py-1">
                      <select
                        className="border-black border-2 px-1 py-0.5 text-md w-full"
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
                    <td className="border-black border-2 px-2 py-1">
                      <select
                        className="w-full border-2 border-black"
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
                    <td className="border-black border-2 px-2 py-1">
                      <select
                        className="border-black border-2 px-1 py-0.5 text-md w-full"
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
                        <option value="User-1">User-1</option>
                        <option value="User-2">User-2</option>
                        <option value="User-3">User-3</option>
                        <option value="User-4">User-4</option>
                        <option value="User-5">User-5</option>
                      </select>
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
                    <td className="border-black border-2 px-2 py-1">
                      <button
                        className="w-full border-black border-2 px-1 py-0.5 bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleUpdate(arr._id)}
                      >
                        Update
                      </button>
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
};

export default Admin;
