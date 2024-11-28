// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineDeleteForever,
//   MdOutlineModeEdit,
//   MdAddCircleOutline,
// } from "react-icons/md";
// import {
//   getAllAgentsByFranchiseIdAsync,
//   deleteAgentAsync,
//   updateAgentAsync,
//   createAgentAsync,
// } from "../store/features/agents/agentsSlice";

// const FranchiseAgentTable = ({ selectedFranchiseId, onBack }) => {
//   const dispatch = useDispatch();
//   const { agents, loading, error } = useSelector((state) => state.agents);

//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   console.log(selectedFranchiseId);
//   useEffect(() => {
//     dispatch(getAllAgentsByFranchiseIdAsync(selectedFranchiseId));
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
//           <button className="px-3 py-2 border rounded-md" onClick={onBack}>
//             Back to Franchise List
//           </button>
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
//               <th className="py-2 px-4"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {agents?.length > 0 ? (
//               agents.map((agent) => (
//                 <tr key={agent._id} className="border-b hover:bg-gray-100">
//                   <td className="py-3 px-4">{agent?.name}</td>
//                   <td className="py-3 px-4">{agent?.contact}</td>
//                   <td className="py-3 px-4">{agent?.email}</td>
//                   <td className="py-3 px-4">{agent?.location?.address}</td>
//                   <td className="py-3 px-4">{agent?.location?.name}</td>
//                   <td className="py-3 px-4">{agent?.location?.pinCode}</td>
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

// export default FranchiseAgentTable;
//=======================================================
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MdOutlineDeleteForever,
//   MdOutlineModeEdit,
//   MdAddCircleOutline,
// } from "react-icons/md";
// import {
//   getAllAgentsByFranchiseIdAsync,
//   deleteAgentAsync,
//   updateAgentAsync,
//   createAgentAsync,
// } from "../store/features/agents/agentsSlice";

// const FranchiseAgentTable = ({ selectedFranchiseId, onBack }) => {
//   const dispatch = useDispatch();
//   const { agents, loading, error } = useSelector((state) => state.agents);

//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);

//   useEffect(() => {
//     console.log("selectedFranchiseId", selectedFranchiseId);

//     if (selectedFranchiseId) {
//       dispatch(
//         getAllAgentsByFranchiseIdAsync({ franchiseId: selectedFranchiseId })
//       );
//     }
//     // dispatch(getAllAgentsByFranchiseIdAsync(selectedFranchiseId));
//   }, [dispatch, selectedFranchiseId]);

//   const handleCreate = () => {
//     setSelectedAgent({
//       name: "",
//       email: "",
//       password: "",
//       contact: "",
//       location: {
//         address: "",
//         city: "",
//         state: "",
//         pinCode: "",
//       },
//       franchise: selectedFranchiseId,
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
//           <button className="px-3 py-2 border rounded-md" onClick={onBack}>
//             Back to Franchise List
//           </button>
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
//               {/* <th className="py-2 px-4">Location Name</th> */}
//               <th className="py-2 px-4">PIN Code</th>
//               <th className="py-2 px-4"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {agents?.length > 0 ? (
//               agents.map((agent) => (
//                 <tr key={agent._id} className="border-b hover:bg-gray-100">
//                   <td className="py-3 px-4">{agent?.name}</td>
//                   <td className="py-3 px-4">{agent?.contact}</td>
//                   <td className="py-3 px-4">{agent?.email}</td>
//                   <td className="py-3 px-4">
//                     {`${agent?.location?.address}, ${agent?.location?.city}, ${agent?.location?.state}`}
//                   </td>
//                   {/* <td className="py-3 px-4">{agent?.location?.name}</td> */}
//                   <td className="py-3 px-4">{agent?.location?.pinCode}</td>
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
//                 <td colSpan="7" className="py-3 px-4 text-center">
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
//                   required
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
//                   required
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
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block mb-1">Password</label>
//                 <input
//                   type="password"
//                   value={selectedAgent?.password}
//                   onChange={(e) =>
//                     setSelectedAgent({
//                       ...selectedAgent,
//                       password: e.target.value,
//                     })
//                   }
//                   className="w-full border px-3 py-2 rounded-lg"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 <div className="mb-4">
//                   <label className="block mb-1">Address</label>
//                   <input
//                     type="text"
//                     value={selectedAgent?.location?.address}
//                     onChange={(e) =>
//                       setSelectedAgent({
//                         ...selectedAgent,
//                         location: {
//                           ...selectedAgent.location,
//                           address: e.target.value,
//                         },
//                       })
//                     }
//                     className="w-full border px-3 py-2 rounded-lg"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1">City</label>
//                   <input
//                     type="text"
//                     value={selectedAgent?.location?.city}
//                     onChange={(e) =>
//                       setSelectedAgent({
//                         ...selectedAgent,
//                         location: {
//                           ...selectedAgent.location,
//                           city: e.target.value,
//                         },
//                       })
//                     }
//                     className="w-full border px-3 py-2 rounded-lg"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1">State</label>
//                   <input
//                     type="text"
//                     value={selectedAgent?.location?.state}
//                     onChange={(e) =>
//                       setSelectedAgent({
//                         ...selectedAgent,
//                         location: {
//                           ...selectedAgent.location,
//                           state: e.target.value,
//                         },
//                       })
//                     }
//                     className="w-full border px-3 py-2 rounded-lg"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-1">PIN Code</label>
//                   <input
//                     type="text"
//                     value={selectedAgent?.location?.pinCode}
//                     onChange={(e) =>
//                       setSelectedAgent({
//                         ...selectedAgent,
//                         location: {
//                           ...selectedAgent.location,
//                           pinCode: e.target.value,
//                         },
//                       })
//                     }
//                     className="w-full border px-3 py-2 rounded-lg"
//                     required
//                   />
//                 </div>
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

// export default FranchiseAgentTable;
//=============================================
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineDeleteForever,
  MdOutlineModeEdit,
  MdAddCircleOutline,
  MdAttachMoney,
} from "react-icons/md";
import {
  getAllAgentsByFranchiseIdAsync,
  deleteAgentAsync,
  updateAgentAsync,
  createAgentAsync,
  setCommissionForAgentsAsync,
} from "../store/features/agents/agentsSlice";
import toast from "react-hot-toast";

const FranchiseAgentTable = ({ selectedFranchiseId, onBack }) => {
  const dispatch = useDispatch();
  const { agents, loading, error } = useSelector((state) => state.agents);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [commission, setCommission] = useState("");
  const [selectedAgents, setSelectedAgents] = useState([]);

  useEffect(() => {
    if (selectedFranchiseId) {
      dispatch(
        getAllAgentsByFranchiseIdAsync({ franchiseId: selectedFranchiseId })
      );
    }
  }, [dispatch, selectedFranchiseId]);

  const handleCreate = () => {
    setSelectedAgent({
      name: "",
      email: "",
      password: "",
      contact: "",
      location: {
        address: "",
        city: "",
        state: "",
        pinCode: "",
      },
      franchise: selectedFranchiseId,
    });
    setIsCreating(true);
    setShowEditModal(true);
  };

  const handleEdit = (agent) => {
    setSelectedAgent(agent);
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
    if (isCreating) {
      try {
        await dispatch(createAgentAsync({ newData: selectedAgent }));
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
            updatedData: selectedAgent,
          })
        );
        setShowEditModal(false);
        setSelectedAgent(null);
      } catch (error) {
        console.error("Error updating agent:", error);
      }
    }
  };

  const handleSetCommission = () => {
    if (!commission || isNaN(commission)) {
      console.error("Invalid commission amount.");
      return;
    }

    dispatch(
      setCommissionForAgentsAsync({
        agentIds: selectedAgents.map((agent) => agent._id),
        commissionPercentage: parseFloat(commission),
      })
    )
      .then(() => {
        toast.success("Commission updated successfully.");
        setCommission("");
        setSelectedAgents([]);
      })
      .catch((error) => {
        console.error("Error setting commission:", error);
        toast.error("Failed to update commission.");
      });
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agents for Franchise</h2>
        <div className="flex">
          <button
            className="mr-2 px-3 py-2 border rounded-md"
            onClick={handleCreate}
          >
            <MdAddCircleOutline className="inline-block mr-1" />
            Add Agent
          </button>
          <div className="flex items-center">
            <input
              type="number"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              placeholder="Enter commission"
              className="mr-2 px-3 py-2 border rounded-md"
            />
            <button
              className="mr-2 px-3 py-2 border rounded-md"
              onClick={handleSetCommission}
              disabled={selectedAgents.length === 0 || !commission}
            >
              <MdAttachMoney className="inline-block mr-1" />
              Set Commission
            </button>
          </div>
          <button className="px-3 py-2 border rounded-md" onClick={onBack}>
            Back to Franchise List
          </button>
        </div>
      </div>
      {loading ? (
        <p className="py-3 px-4 text-center">Loading agents...</p>
      ) : error ? (
        <p className="py-3 px-4 text-center text-red-500">{error}</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-4">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedAgents(isChecked ? agents : []);
                  }}
                  checked={selectedAgents.length === agents.length}
                />
              </th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Contact Number</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">PIN Code</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {agents?.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedAgents.some((a) => a._id === agent._id)}
                      onChange={() => {
                        setSelectedAgents((prev) =>
                          prev.some((a) => a._id === agent._id)
                            ? prev.filter((a) => a._id !== agent._id)
                            : [...prev, agent]
                        );
                      }}
                    />
                  </td>
                  <td className="py-3 px-4">{agent?.name}</td>
                  <td className="py-3 px-4">{agent?.contact}</td>
                  <td className="py-3 px-4">{agent?.email}</td>
                  <td className="py-3 px-4">
                    {`${agent?.location?.address}, ${agent?.location?.city}, ${agent?.location?.state}`}
                  </td>
                  <td className="py-3 px-4">{agent?.location?.pinCode}</td>
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
                <td colSpan="7" className="py-3 px-4 text-center">
                  No agents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-25"></div>
          <div className="bg-white p-6 rounded-lg z-10 w-1/3">
            <h2 className="text-lg font-bold mb-4">
              {isCreating ? "Add New Agent" : "Edit Agent"}
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
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={selectedAgent?.password}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      password: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="mb-4">
                  <label className="block mb-1">Address</label>
                  <input
                    type="text"
                    value={selectedAgent?.location?.address}
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        location: {
                          ...selectedAgent.location,
                          address: e.target.value,
                        },
                      })
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">City</label>
                  <input
                    type="text"
                    value={selectedAgent?.location?.city}
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        location: {
                          ...selectedAgent.location,
                          city: e.target.value,
                        },
                      })
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">State</label>
                  <input
                    type="text"
                    value={selectedAgent?.location?.state}
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        location: {
                          ...selectedAgent.location,
                          state: e.target.value,
                        },
                      })
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={selectedAgent?.location?.pinCode}
                    onChange={(e) =>
                      setSelectedAgent({
                        ...selectedAgent,
                        location: {
                          ...selectedAgent.location,
                          pinCode: e.target.value,
                        },
                      })
                    }
                    className="w-full border px-3 py-2 rounded-lg"
                    required
                  />
                </div>
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
            <p>Are you sure you want to delete this agent?</p>
            <div className="flex justify-end mt-4">
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
    </div>
  );
};

export default FranchiseAgentTable;
