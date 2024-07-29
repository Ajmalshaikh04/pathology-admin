import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdOutlineDeleteForever,
  MdOutlineModeEdit,
  MdAddCircleOutline,
} from "react-icons/md";
import {
  getAllAgentsByPinCodeAsync,
  deleteAgentAsync,
  updateAgentAsync,
  createAgentAsync,
} from "../store/features/agents/agentsSlice";

const AgentTable = ({ selectedFranchiseId, onBack }) => {
  const dispatch = useDispatch();
  const { agents, loading, error } = useSelector((state) => state.agents);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  console.log(selectedFranchiseId);
  useEffect(() => {
    dispatch(
      getAllAgentsByPinCodeAsync(selectedFranchiseId?.location?.pinCode)
    );
  }, [dispatch, selectedFranchiseId]);

  const handleCreate = () => {
    setSelectedAgent({
      name: "",
      email: "",
      contact: "",
      location: selectedFranchiseId?.location?._id,
      franchise: selectedFranchiseId?._id,
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
        setIsCreating(false);
      } catch (error) {
        console.error("Error updating agent:", error);
      }
    }
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
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Contact Number</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Location Name</th>
              <th className="py-2 px-4">PIN Code</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {agents?.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{agent.name}</td>
                  <td className="py-3 px-4">{agent.contact}</td>
                  <td className="py-3 px-4">{agent.email}</td>
                  <td className="py-3 px-4">{agent.location.address}</td>
                  <td className="py-3 px-4">{agent.location.name}</td>
                  <td className="py-3 px-4">{agent.location.pinCode}</td>
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
                <td colSpan="4" className="py-3 px-4 text-center">
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

export default AgentTable;
//=======================================================
