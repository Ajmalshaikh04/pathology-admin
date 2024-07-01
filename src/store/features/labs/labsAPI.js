import axiosInstance from "../../../api/axiosInstance";

const getAllLabs = async () => {
  return await axiosInstance.get("/labs");
};
const createLab = async (newLabData, headers) => {
  return await axiosInstance.post("/create-lab", newLabData, {
    headers: headers,
  });
};

export { getAllLabs, createLab };
