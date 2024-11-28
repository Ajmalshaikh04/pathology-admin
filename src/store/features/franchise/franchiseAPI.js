import axiosInstance from "../../../api/axiosInstance";

const getAllFranchises = async (headers, page, limit) => {
  return await axiosInstance.get(
    `/get-all-franchises?page=${page}&limit=${limit}`,
    { headers: headers }
  );
};

const createFranchise = async (newFranchiseData, headers) => {
  return await axiosInstance.post("/create-franchise", newFranchiseData, {
    headers: headers,
  });
};

const updateFranchise = async (updateFranchiseData, franchiseId, headers) => {
  return await axiosInstance.put(
    `/update-franchise/${franchiseId}`,
    updateFranchiseData,
    {
      headers: headers,
    }
  );
};
const deleteFranchise = async (franchiseId, headers) => {
  return await axiosInstance.delete(`/delete-franchise/${franchiseId}`, {
    headers: headers,
  });
};

const setCommissionForSelectedFranchises = (
  franchiseIds,
  commissionPercentage
) => {
  return axiosInstance.post("/franchises-commission", {
    franchiseIds,
    commissionPercentage,
  });
};

export {
  getAllFranchises,
  createFranchise,
  deleteFranchise,
  updateFranchise,
  setCommissionForSelectedFranchises,
};
//================================================================
