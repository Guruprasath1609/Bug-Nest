import React from 'react'

const AssignedTicketsPage = ({array}) => {
  return (
    <div>
      {array.length > 0 ? (
        <div className="flex xl:items-center xl:justify-center overflow-x-auto w-full  font-medium text-base ">
          <div className="min-w-[1050px] xl:w-[95%] mt-8 mb-2  mx-6 lg:ml-8 xl:mx-0  border-2 border-gray-100 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="text-lg font-bold">
                <tr className="bg-gray-200 text-gray-900 ">
                  <th className="border-gray-500  px-4 py-1  w-[60px] rounded-tl-lg">
                    S.No
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-1 w-[150px]  ">
                    Title
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-1   lg:w-[600px] w-[300px] ">
                    Description
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-1    w-[120px] ">
                    Bugs Found at
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-1  w-[140px] ">
                    Priority
                  </th>
                  {/* <th className="border-gray-200 border-b-2 px-4 py-1    w-[150px] ">
                    Status
                  </th> */}
                  <th className="border-gray-200 border-b-2 px-4 py-1  w-[130px] ">
                    Assign To
                  </th>
                  <th className="border-gray-200 border-b-2 px-4 py-1    w-[130px] ">
                    Ticket created at
                  </th>
                  {/* <th className="border-gray-200 border-b-2 px-4 py-1 rounded-tr-lg "></th> */}
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
                      <div
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
                        value={arr.priority}
                      >
                        {arr.priority}
                      </div>
                    </td>
                    {/* <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2">
                      <div
                        className={`w-full border-2 border-black rounded-md ${
                          arr.status === "open" ? "bg-yellow-100" : ""
                        }
                        ${arr.status === "processing" ? "bg-pink-100" : ""}${
                          arr.status === "resolved" ? "bg-blue-100" : ""
                        }${arr.status === "closed" ? "bg-green-100" : ""}`}
                        value={
                          updates[arr._id]?.status !== undefined
                            ? updates[arr._id].status
                            :
                             arr.status
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
                        {arr.status}
                      </div>
                    </td> */}
                    <td className="border-gray-100 border-b-2 px-4 py-4 border-r-2 ">
                      <div
                        className={`border-black border-2 px-1 py-0.5 text-md w-full rounded-md ${
                          arr.assignTo === "User-1" ? "bg-yellow-100" : ""
                        }${arr.assignTo === "User-2" ? "bg-pink-100" : ""}${
                          arr.assignTo === "User-3" ? "bg-blue-100" : ""
                        }${arr.assignTo === "User-4" ? "bg-green-100" : ""}${
                          arr.assignTo === "User-5" ? "bg-red-200" : ""
                        }`}
                        value={arr.assignTo}
                      >
                        {arr.assignTo == "User-1"
                          ? "Roman"
                          : arr.assignTo == "User-2"
                          ? "Randy"
                          : arr.assignTo == "User-3"
                          ? "John"
                          : arr.assignTo == "User-4"
                          ? "Peter"
                          : arr.assignTo == "User-5"
                          ? "Michael"
                          : ""}
                      </div>
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
                    {/* <td className="border-gray-100 border-b-2 px-2 py-2">
                      <button
                        className="w-full border-black border-2 px-1.5 py-1 bg-gray-800 text-white hover:bg-black rounded-md text-[15px]"
                        onClick={() => handleUpdate(arr._id)}
                      >
                        Update
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-gray-200 mt-8 text-xl font-bold text-center h-24 w-[90%] flex items-center justify-center sm:w-[95%] ">
            No tickets Assigned to you
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedTicketsPage