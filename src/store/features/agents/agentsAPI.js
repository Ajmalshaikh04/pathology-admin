import axiosInstance from "../../../api/axiosInstance";

const getAllAgentsByFranchiseId = async (franchiseId, page, limit, headers) => {
  return await axiosInstance.get(`/agents/${franchiseId}`, {
    params: { page, limit },
    headers: headers,
  });
};
// const getAllAgents = async (headers, page, limit) => {
//   return await axiosInstance.get(
//     `/get-all-agents?page=${page}&limit=${limit}`,
//     { headers: headers }
//   );
// };

const getAllAgents = async (headers, page, limit) => {
  return await axiosInstance.get(`/get-all-agents`, {
    headers: headers,
    params: { page, limit },
  });
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

const setCommissionForSelectedAgents = (agentIds, commissionPercentage) => {
  return axiosInstance.post("/agents-commission", {
    agentIds,
    commissionPercentage,
  });
};

export {
  getAllAgentsByFranchiseId,
  updateAgent,
  deleteAgent,
  createAgent,
  getAllAgents,
  setCommissionForSelectedAgents,
};
//======================================================
