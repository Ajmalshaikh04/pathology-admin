import axiosInstance from "../../../api/axiosInstance";

const register = async (userData) => {
  return await axiosInstance.post("/register-admin", userData);
};

const getAllUsers = async (headers) => {
  return await axiosInstance.get("/all-users", { headers: headers });
};
const getAllCouncilors = async (headers) => {
  return await axiosInstance.get("/all-councilor", { headers: headers });
};
const assignCouncilors = async (userId, counselorId, headers) => {
  return await axiosInstance.put(
    "/assign-counselor",
    { userId, counselorId },
    { headers: headers }
  );
};
const signOutAdmin = async (headers) => {
  return await axiosInstance.post("/admin-signout", { headers: headers });
};

const signInAdmin = async (userData) => {
  return await axiosInstance.post("/signin-admin", userData);
};

const getAllAssignedUsersByCounselorId = async (counselorId, headers) => {
  return await axiosInstance.get(`/counselor-assigned-users/${counselorId}`, {
    headers: headers,
  });
};

export {
  register,
  signInAdmin,
  getAllUsers,
  signOutAdmin,
  getAllCouncilors,
  assignCouncilors,
  getAllAssignedUsersByCounselorId,
};
//=======================================================
