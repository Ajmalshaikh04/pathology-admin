import axiosInstance from "../../../api/axiosInstance";

const register = async (userData) => {
  return await axiosInstance.post("/register-admin", userData);
};

const getAllUsers = async (headers) => {
  return await axiosInstance.get("/all-users", { headers: headers });
};

const signInAdmin = async (userData) => {
  return await axiosInstance.post("/signin-admin", userData);
};

export { register, signInAdmin, getAllUsers };
