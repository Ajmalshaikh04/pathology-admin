import axiosInstance from "../../../api/axiosInstance";

const getAllLabs = async (page, limit) => {
  return await axiosInstance.get(`/labs?page=${page}&limit=${limit}`);
};
const getLabAppointmentsInProgress = async (labId, page, limit, headers) => {
  return await axiosInstance.get(
    `/appointments/lab/${labId}?page=${page}&limit=${limit}`,
    {
      headers: headers,
    }
  );
};
const createLab = async (newLabData, headers) => {
  return await axiosInstance.post("/create-lab", newLabData, {
    headers: headers,
  });
};
const updateLab = async (id, newLabData, headers) => {
  return await axiosInstance.put(`/labs/${id}`, newLabData, {
    headers: headers,
  });
};
const deleteLab = async (id, headers) => {
  return await axiosInstance.delete(`/labs/${id}`, {
    headers: headers,
  });
};
const createTest = async (newTestData, headers) => {
  return await axiosInstance.post("/create-lab-test", newTestData, {
    headers: headers,
  });
};
const updateTest = async (newTestData, headers) => {
  return await axiosInstance.put("/update-lab-test", newTestData, {
    headers: headers,
  });
};
const deleteTest = async (id, headers) => {
  return await axiosInstance.delete(`/delete-lab-test-by-id/${id}`, {
    headers: headers,
  });
};

export {
  getAllLabs,
  createLab,
  updateLab,
  deleteLab,
  createTest,
  updateTest,
  deleteTest,
  getLabAppointmentsInProgress,
};
