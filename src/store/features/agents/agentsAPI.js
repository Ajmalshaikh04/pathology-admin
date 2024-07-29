import axiosInstance from "../../../api/axiosInstance";

const getAllAgentsByPinCode = async (pinCode, headers) => {
  return await axiosInstance.get(`/location/${pinCode}`, { headers: headers });
};

const createAgent = async (newData, headers) => {
  return await axiosInstance.post(`/create-agent`, newData, {
    headers: headers,
  });
};
const updateAgent = async (agentId, updatedData, headers) => {
  return await axiosInstance.put(`/update-agent/${agentId}`, updatedData, {
    headers: headers,
  });
};

const deleteAgent = async (agentId, headers) => {
  return await axiosInstance.delete(`/delete-agent/${agentId}`, {
    headers: headers,
  });
};

export { getAllAgentsByPinCode, updateAgent, deleteAgent, createAgent };
//======================================================
