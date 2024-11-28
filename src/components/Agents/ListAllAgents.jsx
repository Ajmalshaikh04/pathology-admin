// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { MdOutlineVisibility } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { getAllAgentsAsync } from "../../store/features/agents/agentsSlice";

// const ListAllAgents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { agents, loading, error } = useSelector((state) => state.agents);

//   useEffect(() => {
//     dispatch(getAllAgentsAsync());
//   }, [dispatch]);

//   const handleAgentClick = (agentId) => {
//     navigate(`/appointments/${agentId}`);
//   };
//   return (
//     <div className="p-4 mt-16">
//       <h1 className="text-lg font-bold mb-4">List of Agents</h1>
//       {loading && <p className="text-blue-600">Loading...</p>}
//       {error && <p className="text-red-600">Error: {error}</p>}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Email</th>
//               <th className="py-2 px-4 border-b">Contact</th>
//               <th className="py-2 px-4 border-b">Address</th>
//               <th className="py-2 px-4 border-b">View Referral Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {agents.map((agent) => (
//               <tr key={agent._id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{agent?.name}</td>
//                 <td className="py-2 px-4 border-b">{agent?.email}</td>
//                 <td className="py-2 px-4 border-b">{agent?.contact}</td>
//                 <td className="py-2 px-4 border-b">
//                   {`${agent?.location?.address}, ${agent?.location?.city}, ${agent?.location?.state} ${agent?.location?.pinCode}`}
//                 </td>
//                 <td className="py-2 px-4 border-b flex items-center justify-center">
//                   <button
//                     className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                     onClick={() => handleAgentClick(agent._id)}
//                   >
//                     <MdOutlineVisibility />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ListAllAgents;
//=============================================================
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { MdOutlineVisibility } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { getAllAgentsAsync } from "../../store/features/agents/agentsSlice";

// const ListAllAgents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { agents, loading, error, pagination } = useSelector(
//     (state) => state.agents
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10); // Default limit

//   useEffect(() => {
//     dispatch(getAllAgentsAsync({ page: currentPage, limit }));
//   }, [dispatch, currentPage, limit]);

//   const handleAgentClick = (agentId) => {
//     navigate(`/appointments/${agentId}`);
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page on limit change
//   };

//   return (
//     <div className="p-4 mt-16">
//       <h1 className="text-lg font-bold mb-4">List of Agents</h1>
//       {loading && <p className="text-blue-600">Loading...</p>}
//       {error && <p className="text-red-600">Error: {error}</p>}
//       <div className="mb-4 flex justify-between items-center">
//         <div>
//           <label className="mr-2">Show</label>
//           <select
//             className="border rounded-md px-3 py-2"
//             value={limit}
//             onChange={handleLimitChange}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={30}>30</option>
//           </select>
//           <label className="ml-2">per page</label>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Email</th>
//               <th className="py-2 px-4 border-b">Contact</th>
//               <th className="py-2 px-4 border-b">Address</th>
//               <th className="py-2 px-4 border-b">View Referral Booking</th>
//             </tr>
//           </thead>
//           <tbody>
//             {agents.map((agent) => (
//               <tr key={agent._id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{agent?.name}</td>
//                 <td className="py-2 px-4 border-b">{agent?.email}</td>
//                 <td className="py-2 px-4 border-b">{agent?.contact}</td>
//                 <td className="py-2 px-4 border-b">
//                   {`${agent?.location?.address}, ${agent?.location?.city}, ${agent?.location?.state} ${agent?.location?.pinCode}`}
//                 </td>
//                 <td className="py-2 px-4 border-b flex items-center justify-center">
//                   <button
//                     className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                     onClick={() => handleAgentClick(agent._id)}
//                   >
//                     <MdOutlineVisibility />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="px-3 py-2 border rounded-md"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {pagination?.totalPages || 1}
//         </span>
//         <button
//           className="px-3 py-2 border rounded-md"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pagination?.totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ListAllAgents;
//======================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllAgentsAsync } from "../../store/features/agents/agentsSlice";

const ListAllAgents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agents, loading, error, pagination } = useSelector(
    (state) => state.agents
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit

  useEffect(() => {
    dispatch(getAllAgentsAsync({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handleAgentClick = (agentId) => {
    navigate(`/appointments/${agentId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on limit change
  };

  return (
    <div className="p-4 mt-16">
      <h1 className="text-lg font-bold mb-4">List of Agents</h1>
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Show</label>
          <select
            className="border rounded-md px-3 py-2"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <label className="ml-2">per page</label>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Contact</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">View Referral Booking</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{agent?.name}</td>
                <td className="py-2 px-4 border-b">{agent?.email}</td>
                <td className="py-2 px-4 border-b">{agent?.contact}</td>
                <td className="py-2 px-4 border-b">
                  {`${agent?.location?.address}, ${agent?.location?.city}, ${agent?.location?.state} ${agent?.location?.pinCode}`}
                </td>
                <td className="py-2 px-4 border-b flex items-center justify-center">
                  <button
                    className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
                    onClick={() => handleAgentClick(agent._id)}
                  >
                    <MdOutlineVisibility />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pagination?.totalPages || 1}
        </span>
        <button
          className="px-3 py-2 border rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListAllAgents;
