// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineDeleteForever,
//   MdOutlineModeEdit,
//   MdAddCircleOutline,
//   MdOutlineVisibility,
// } from "react-icons/md";
// import {
//   getAllAgentsByFranchiseIdAsync,
//   deleteAgentAsync,
//   updateAgentAsync,
//   createAgentAsync,
// } from "../store/features/agents/agentsSlice";
// import { useNavigate } from "react-router-dom";

// const AgentsBookings = ({ selectedFranchiseId, onBack }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { agents, loading, error } = useSelector((state) => state.agents);
//   const { user } = useSelector((state) => state.user);
//   // console.log(pinCode);
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     // console.log(pinCode);
//     dispatch(getAllAgentsByFranchiseIdAsync(user || selectedFranchiseId._id));
//   }, [dispatch, selectedFranchiseId]);

//   const handleCreate = () => {
//     setSelectedAgent({
//       name: "",
//       email: "",
//       contact: "",
//       location: selectedFranchiseId?.location?._id,
//       franchise: selectedFranchiseId?._id,
//     });
//     setIsCreating(true);
//     setShowEditModal(true);
//   };

//   const handleEdit = (agent) => {
//     setSelectedAgent(agent);
//     setShowEditModal(true);
//   };

//   const handleDelete = (agent) => {
//     setSelectedAgent(agent);
//     setShowDeleteDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await dispatch(deleteAgentAsync({ agentId: selectedAgent._id }));
//       setShowDeleteDialog(false);
//       setSelectedAgent(null);
//     } catch (error) {
//       console.error("Error deleting agent:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isCreating) {
//       try {
//         await dispatch(createAgentAsync({ newData: selectedAgent }));
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error creating agent:", error);
//       }
//     } else {
//       try {
//         await dispatch(
//           updateAgentAsync({
//             agentId: selectedAgent._id,
//             updatedData: selectedAgent,
//           })
//         );
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error updating agent:", error);
//       }
//     }
//   };

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Agents for Franchise</h2>
//         <div>
//           <button
//             className="mr-2 px-3 py-2 border rounded-md"
//             onClick={handleCreate}
//           >
//             <MdAddCircleOutline className="inline-block mr-1" />
//             Add Agent
//           </button>
//           {/* <button className="px-3 py-2 border rounded-md" onClick={onBack}>
//             Back to Franchise List
//           </button> */}
//         </div>
//       </div>
//       {loading ? (
//         <p className="py-3 px-4 text-center">Loading agents...</p>
//       ) : error ? (
//         <p className="py-3 px-4 text-center text-red-500">{error}</p>
//       ) : (
//         <table className="min-w-full">
//           <thead>
//             <tr className="text-left border-b">
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Contact Number</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Address</th>
//               <th className="py-2 px-4">Location Name</th>
//               <th className="py-2 px-4">PIN Code</th>
//               <th className="py-2 px-4">View Bookings</th>
//               <th className="py-2 px-4"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {agents?.length > 0 ? (
//               agents.map((agent) => (
//                 <tr key={agent._id} className="border-b hover:bg-gray-100">
//                   <td className="py-3 px-4">{agent.name}</td>
//                   <td className="py-3 px-4">{agent.contact}</td>
//                   <td className="py-3 px-4">{agent.email}</td>
//                   <td className="py-3 px-4">{agent.location.address}</td>
//                   <td className="py-3 px-4">{agent.location.name}</td>
//                   <td className="py-3 px-4">{agent.location.pinCode}</td>
//                   <td className="py-3 px-4">
//                     <button
//                       className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                       onClick={() => {
//                         navigate("/my-referral-bookings");
//                       }}
//                     >
//                       <MdOutlineVisibility />
//                     </button>
//                   </td>
//                   <td className="py-3 px-4 text-right">
//                     <button
//                       className="mr-2 px-2 py-1 border rounded-lg bg-green-400 text-white"
//                       onClick={() => handleEdit(agent)}
//                     >
//                       <MdOutlineModeEdit />
//                     </button>
//                     <button
//                       className="mr-2 px-2 py-1 border rounded-lg bg-red-500 text-white"
//                       onClick={() => handleDelete(agent)}
//                     >
//                       <MdOutlineDeleteForever />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-3 px-4 text-center">
//                   No agents found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">
//               {isCreating ? "Add New Agent" : "Edit Agent"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.name}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Contact Number</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.contact}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       contact: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={selectedAgent?.email}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       email: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="mr-2 px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
//                 >
//                   {isCreating ? "Create" : "Update"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {showDeleteDialog && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//             <p>Are you sure you want to delete this agent?</p>
//             <div className="flex justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteDialog(false)}
//                 className="mr-2 px-4 py-2 border rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleConfirmDelete}
//                 className="px-4 py-2 border rounded-lg bg-red-500 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentsBookings;
//=======================================================
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineDeleteForever,
//   MdOutlineModeEdit,
//   MdAddCircleOutline,
//   MdOutlineVisibility,
// } from "react-icons/md";
// import {
//   getAllAgentsByFranchiseIdAsync,
//   deleteAgentAsync,
//   updateAgentAsync,
//   createAgentAsync,
// } from "../store/features/agents/agentsSlice";
// import { useNavigate } from "react-router-dom";

// const AgentsBookings = ({ selectedFranchiseId, onBack }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { agents, loading, error, pagination } = useSelector(
//     (state) => state.agents
//   );
//   const { user } = useSelector((state) => state.user);

//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   useEffect(() => {
//     dispatch(
//       getAllAgentsByFranchiseIdAsync({
//         franchiseId: user || selectedFranchiseId?._id,
//         page: currentPage,
//         limit,
//       })
//     );
//   }, [dispatch, selectedFranchiseId, currentPage, limit]);

//   const handleCreate = () => {
//     setSelectedAgent({
//       name: "",
//       email: "",
//       contact: "",
//       location: selectedFranchiseId?.location?._id,
//       franchise: selectedFranchiseId?._id,
//     });
//     setIsCreating(true);
//     setShowEditModal(true);
//   };

//   const handleEdit = (agent) => {
//     setSelectedAgent(agent);
//     setShowEditModal(true);
//   };

//   const handleDelete = (agent) => {
//     setSelectedAgent(agent);
//     setShowDeleteDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await dispatch(deleteAgentAsync({ agentId: selectedAgent._id }));
//       setShowDeleteDialog(false);
//       setSelectedAgent(null);
//     } catch (error) {
//       console.error("Error deleting agent:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isCreating) {
//       try {
//         await dispatch(createAgentAsync({ newData: selectedAgent }));
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error creating agent:", error);
//       }
//     } else {
//       try {
//         await dispatch(
//           updateAgentAsync({
//             agentId: selectedAgent._id,
//             updatedData: selectedAgent,
//           })
//         );
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error updating agent:", error);
//       }
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page on limit change
//   };

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Agents for Franchise</h2>
//         <div>
//           <button
//             className="mr-2 px-3 py-2 border rounded-md"
//             onClick={handleCreate}
//           >
//             <MdAddCircleOutline className="inline-block mr-1" />
//             Add Agent
//           </button>
//         </div>
//       </div>
//       {loading ? (
//         <p className="py-3 px-4 text-center">Loading agents...</p>
//       ) : error ? (
//         <p className="py-3 px-4 text-center text-red-500">{error}</p>
//       ) : (
//         <>
//           <table className="min-w-full">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Contact Number</th>
//                 <th className="py-2 px-4">Email</th>
//                 <th className="py-2 px-4">Address</th>
//                 <th className="py-2 px-4">Location Name</th>
//                 <th className="py-2 px-4">PIN Code</th>
//                 <th className="py-2 px-4">View Bookings</th>
//                 <th className="py-2 px-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.length > 0 ? (
//                 agents.map((agent) => (
//                   <tr key={agent._id} className="border-b hover:bg-gray-100">
//                     <td className="py-3 px-4">{agent.name}</td>
//                     <td className="py-3 px-4">{agent.contact}</td>
//                     <td className="py-3 px-4">{agent.email}</td>
//                     <td className="py-3 px-4">{agent.location.address}</td>
//                     <td className="py-3 px-4">{agent.location.name}</td>
//                     <td className="py-3 px-4">{agent.location.pinCode}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                         onClick={() => navigate("/my-referral-bookings")}
//                       >
//                         <MdOutlineVisibility />
//                       </button>
//                     </td>
//                     <td className="py-3 px-4 text-right">
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-green-400 text-white"
//                         onClick={() => handleEdit(agent)}
//                       >
//                         <MdOutlineModeEdit />
//                       </button>
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-red-500 text-white"
//                         onClick={() => handleDelete(agent)}
//                       >
//                         <MdOutlineDeleteForever />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="py-3 px-4 text-center">
//                     No agents found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="flex justify-between items-center mt-4">
//             <div>
//               <label className="mr-2">Items per page:</label>
//               <select
//                 value={limit}
//                 onChange={handleLimitChange}
//                 className="border px-2 py-1 rounded"
//               >
//                 {[10, 20, 30, 40, 50].map((limitOption) => (
//                   <option key={limitOption} value={limitOption}>
//                     {limitOption}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <button
//                 disabled={currentPage <= 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 className="px-3 py-1 border rounded-md"
//               >
//                 Previous
//               </button>
//               <span className="mx-3">
//                 Page {currentPage} of {pagination.totalPages}
//               </span>
//               <button
//                 disabled={currentPage >= pagination.totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 className="px-3 py-1 border rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">
//               {isCreating ? "Add New Agent" : "Edit Agent"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.name}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Contact Number</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.contact}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       contact: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={selectedAgent?.email}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       email: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="mr-2 px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
//                 >
//                   {isCreating ? "Create" : "Update"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {showDeleteDialog && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//             <p>Are you sure you want to delete this agent?</p>
//             <div className="flex justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteDialog(false)}
//                 className="mr-2 px-4 py-2 border rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleConfirmDelete}
//                 className="px-4 py-2 border rounded-lg bg-red-500 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AgentsBookings;
//========================================================
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineDeleteForever,
//   MdOutlineModeEdit,
//   MdAddCircleOutline,
//   MdOutlineVisibility,
// } from "react-icons/md";
// import {
//   getAllAgentsByFranchiseIdAsync,
//   deleteAgentAsync,
//   updateAgentAsync,
//   createAgentAsync,
// } from "../store/features/agents/agentsSlice";
// import { useNavigate } from "react-router-dom";

// const AgentsBookings = ({ selectedFranchiseId, onBack }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { agents, loading, error, pagination } = useSelector(
//     (state) => state.agents
//   );
//   const { user } = useSelector((state) => state.user);

//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   // State for location fields
//   const [locationFields, setLocationFields] = useState({
//     address: "",
//     city: "",
//     state: "",
//     pinCode: "",
//   });

//   useEffect(() => {
//     dispatch(
//       getAllAgentsByFranchiseIdAsync({
//         franchiseId: user || selectedFranchiseId?._id,
//         page: currentPage,
//         limit,
//       })
//     );
//   }, [dispatch, selectedFranchiseId, currentPage, limit]);

//   const handleCreate = () => {
//     setSelectedAgent({
//       name: "",
//       email: "",
//       contact: "",
//       location: {
//         address: "",
//         city: "",
//         state: "",
//         pinCode: "",
//       },
//       franchise: selectedFranchiseId?._id,
//     });
//     setIsCreating(true);
//     setShowEditModal(true);
//   };

//   const handleEdit = (agent) => {
//     setSelectedAgent(agent);
//     setLocationFields(
//       agent.location || {
//         address: "",
//         city: "",
//         state: "",
//         pinCode: "",
//       }
//     );
//     setShowEditModal(true);
//   };

//   const handleDelete = (agent) => {
//     setSelectedAgent(agent);
//     setShowDeleteDialog(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await dispatch(deleteAgentAsync({ agentId: selectedAgent._id }));
//       setShowDeleteDialog(false);
//       setSelectedAgent(null);
//     } catch (error) {
//       console.error("Error deleting agent:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const agentData = {
//       ...selectedAgent,
//       location: locationFields,
//     };

//     if (isCreating) {
//       try {
//         await dispatch(createAgentAsync({ newData: agentData }));
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error creating agent:", error);
//       }
//     } else {
//       try {
//         await dispatch(
//           updateAgentAsync({
//             agentId: selectedAgent._id,
//             updatedData: agentData,
//           })
//         );
//         setShowEditModal(false);
//         setSelectedAgent(null);
//         setIsCreating(false);
//       } catch (error) {
//         console.error("Error updating agent:", error);
//       }
//     }
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page on limit change
//   };

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Agents for Franchise</h2>
//         <div>
//           <button
//             className="mr-2 px-3 py-2 border rounded-md"
//             onClick={handleCreate}
//           >
//             <MdAddCircleOutline className="inline-block mr-1" />
//             Add Agent
//           </button>
//         </div>
//       </div>
//       {loading ? (
//         <p className="py-3 px-4 text-center">Loading agents...</p>
//       ) : error ? (
//         <p className="py-3 px-4 text-center text-red-500">{error}</p>
//       ) : (
//         <>
//           <table className="min-w-full">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="py-2 px-4">Name</th>
//                 <th className="py-2 px-4">Contact Number</th>
//                 <th className="py-2 px-4">Email</th>
//                 <th className="py-2 px-4">Address</th>
//                 <th className="py-2 px-4">Location Name</th>
//                 <th className="py-2 px-4">PIN Code</th>
//                 <th className="py-2 px-4">View Bookings</th>
//                 <th className="py-2 px-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.length > 0 ? (
//                 agents.map((agent) => (
//                   <tr key={agent._id} className="border-b hover:bg-gray-100">
//                     <td className="py-3 px-4">{agent.name}</td>
//                     <td className="py-3 px-4">{agent.contact}</td>
//                     <td className="py-3 px-4">{agent.email}</td>
//                     <td className="py-3 px-4">{agent.location.address}</td>
//                     <td className="py-3 px-4">{agent.location.name}</td>
//                     <td className="py-3 px-4">{agent.location.pinCode}</td>
//                     <td className="py-3 px-4">
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                         onClick={() => navigate("/my-referral-bookings")}
//                       >
//                         <MdOutlineVisibility />
//                       </button>
//                     </td>
//                     <td className="py-3 px-4 text-right">
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-green-400 text-white"
//                         onClick={() => handleEdit(agent)}
//                       >
//                         <MdOutlineModeEdit />
//                       </button>
//                       <button
//                         className="mr-2 px-2 py-1 border rounded-lg bg-red-500 text-white"
//                         onClick={() => handleDelete(agent)}
//                       >
//                         <MdOutlineDeleteForever />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="py-3 px-4 text-center">
//                     No agents found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <div className="flex justify-between items-center mt-4">
//             <div>
//               <label className="mr-2">Items per page:</label>
//               <select
//                 value={limit}
//                 onChange={handleLimitChange}
//                 className="border px-2 py-1 rounded"
//               >
//                 {[10, 20, 30, 40, 50].map((limitOption) => (
//                   <option key={limitOption} value={limitOption}>
//                     {limitOption}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <button
//                 disabled={currentPage <= 1}
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 className="px-3 py-1 border rounded-md"
//               >
//                 Previous
//               </button>
//               <span className="mx-3">
//                 Page {currentPage} of {pagination.totalPages}
//               </span>
//               <button
//                 disabled={currentPage >= pagination.totalPages}
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 className="px-3 py-1 border rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//       {showEditModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">
//               {isCreating ? "Add New Agent" : "Edit Agent"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block mb-1">Name</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.name}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       name: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Contact Number</label>
//                 <input
//                   type="text"
//                   value={selectedAgent?.contact}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       contact: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={selectedAgent?.email}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       email: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">Address</label>
//                 <input
//                   type="text"
//                   value={locationFields.address}
//                   onChange={(e) =>
//                     setLocationFields({
//                       ...locationFields,
//                       address: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">City</label>
//                 <input
//                   type="text"
//                   value={locationFields.city}
//                   onChange={(e) =>
//                     setLocationFields({
//                       ...locationFields,
//                       city: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">State</label>
//                 <input
//                   type="text"
//                   value={locationFields.state}
//                   onChange={(e) =>
//                     setLocationFields({
//                       ...locationFields,
//                       state: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-1">PIN Code</label>
//                 <input
//                   type="text"
//                   value={locationFields.pinCode}
//                   onChange={(e) =>
//                     setLocationFields({
//                       ...locationFields,
//                       pinCode: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setShowEditModal(false)}
//                   className="mr-2 px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
//                 >
//                   {isCreating ? "Create" : "Update"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {showDeleteDialog && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="fixed inset-0 bg-black opacity-25"></div>
//           <div className="bg-white p-6 rounded-lg z-10 w-1/3">
//             <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
//             <p className="mb-4">Are you sure you want to delete this agent?</p>
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteDialog(false)}
//                 className="mr-2 px-4 py-2 border rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleConfirmDelete}
//                 className="px-4 py-2 border rounded-lg bg-red-500 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <button
//         onClick={onBack}
//         className="mt-4 px-4 py-2 border rounded-lg bg-gray-200"
//       >
//         Back
//       </button>
//     </div>
//   );
// };

// export default AgentsBookings;
//=============================================
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineDeleteForever,
  MdOutlineModeEdit,
  MdAddCircleOutline,
  MdOutlineVisibility,
} from "react-icons/md";
import {
  getAllAgentsByFranchiseIdAsync,
  deleteAgentAsync,
  updateAgentAsync,
  createAgentAsync,
} from "../store/features/agents/agentsSlice";
import { useNavigate } from "react-router-dom";

const AgentsBookings = ({ selectedFranchiseId, onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { agents, loading, error, pagination } = useSelector(
    (state) => state.agents
  );
  const { user } = useSelector((state) => state.user);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // State for location fields and password
  const [locationFields, setLocationFields] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(
      getAllAgentsByFranchiseIdAsync({
        franchiseId: user || selectedFranchiseId?._id,
        page: currentPage,
        limit,
      })
    );
  }, [dispatch, selectedFranchiseId, currentPage, limit]);

  const handleCreate = () => {
    setSelectedAgent({
      name: "",
      email: "",
      contact: "",
      location: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
      },
      franchise: selectedFranchiseId?._id,
    });
    setLocationFields({
      address: "",
      city: "",
      state: "",
      pinCode: "",
    });
    setPassword("");
    setIsCreating(true);
    setShowEditModal(true);
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setLocationFields(
      agent.location || {
        address: "",
        city: "",
        state: "",
        pinCode: "",
      }
    );
    setPassword(""); // Do not prefill password for security reasons
    setShowEditModal(true);
  };

  const handleDelete = (agent) => {
    setSelectedAgent(agent);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteAgentAsync({ agentId: selectedAgent._id }));
      setShowDeleteDialog(false);
      setSelectedAgent(null);
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const agentData = {
      ...selectedAgent,
      location: locationFields,
      ...(password && { password }), // Include password only if it's not empty
      franchise: user,
    };

    if (isCreating) {
      try {
        await dispatch(createAgentAsync({ newData: agentData }));
        setShowEditModal(false);
        setSelectedAgent(null);
        setIsCreating(false);
      } catch (error) {
        console.error("Error creating agent:", error);
      }
    } else {
      try {
        await dispatch(
          updateAgentAsync({
            agentId: selectedAgent._id,
            updatedData: agentData,
          })
        );
        setShowEditModal(false);
        setSelectedAgent(null);
        setIsCreating(false);
      } catch (error) {
        console.error("Error updating agent:", error);
      }
    }
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
    <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agents for Franchise</h2>
        <div>
          <button
            className="mr-2 px-3 py-2 border rounded-md"
            onClick={handleCreate}
          >
            <MdAddCircleOutline className="inline-block mr-1" />
            Add Agent
          </button>
        </div>
      </div>
      {loading ? (
        <p className="py-3 px-4 text-center">Loading agents...</p>
      ) : error ? (
        <p className="py-3 px-4 text-center text-red-500">{error}</p>
      ) : (
        <>
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Contact Number</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Location Name</th>
                <th className="py-2 px-4">PIN Code</th>
                <th className="py-2 px-4">View Bookings</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <tr key={agent._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{agent.name}</td>
                    <td className="py-3 px-4">{agent.contact}</td>
                    <td className="py-3 px-4">{agent.email}</td>
                    <td className="py-3 px-4">{agent.location.address}</td>
                    <td className="py-3 px-4">{agent.location.name}</td>
                    <td className="py-3 px-4">{agent.location.pinCode}</td>
                    <td className="py-3 px-4">
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
                        onClick={() => navigate("/my-referral-bookings")}
                      >
                        <MdOutlineVisibility />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-green-400 text-white"
                        onClick={() => handleEdit(agent)}
                      >
                        <MdOutlineModeEdit />
                      </button>
                      <button
                        className="mr-2 px-2 py-1 border rounded-lg bg-red-500 text-white"
                        onClick={() => handleDelete(agent)}
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-3 px-4 text-center">
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <label className="mr-2">Items per page:</label>
              <select
                value={limit}
                onChange={handleLimitChange}
                className="border px-2 py-1 rounded"
              >
                {[10, 20, 30, 40, 50].map((limitOption) => (
                  <option key={limitOption} value={limitOption}>
                    {limitOption}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 border rounded-md"
              >
                Previous
              </button>
              <span className="mx-3">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                disabled={currentPage >= pagination.totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 border rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white p-6 rounded-lg z-10 w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isCreating ? "Add Agent" : "Edit Agent"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  value={selectedAgent?.name}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      name: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Contact Number</label>
                <input
                  type="text"
                  value={selectedAgent?.contact}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      contact: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={selectedAgent?.email}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      email: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Address</label>
                <input
                  type="text"
                  value={locationFields.address}
                  onChange={(e) =>
                    setLocationFields({
                      ...locationFields,
                      address: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">City</label>
                <input
                  type="text"
                  value={locationFields.city}
                  onChange={(e) =>
                    setLocationFields({
                      ...locationFields,
                      city: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">State</label>
                <input
                  type="text"
                  value={locationFields.state}
                  onChange={(e) =>
                    setLocationFields({
                      ...locationFields,
                      state: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">PIN Code</label>
                <input
                  type="text"
                  value={locationFields.pinCode}
                  onChange={(e) =>
                    setLocationFields({
                      ...locationFields,
                      pinCode: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mr-2 px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border rounded-lg bg-blue-500 text-white"
                >
                  {isCreating ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white p-6 rounded-lg z-10 w-1/3">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this agent?</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteDialog(false)}
                className="mr-2 px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 border rounded-lg bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 border rounded-lg bg-gray-200"
      >
        Back
      </button>
    </div>
  );
};

export default AgentsBookings;
