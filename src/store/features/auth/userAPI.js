import axiosInstance from "../../../api/axiosInstance";

const register = async (userData) => {
  return await axiosInstance.post("/register-admin", userData);
};

const getAllUsers = async (headers, page = 1, limit = 10) => {
  return await axiosInstance.get(`/all-users?page=${page}&limit=${limit}`, {
    headers: headers,
  });
};
const getAllCouncilors = async (headers, page = 1, limit = 10) => {
  return await axiosInstance.get(`/all-councilor?page=${page}&limit=${limit}`, {
    headers: headers,
  });
};
const assignCouncilors = async (userId, counselorId, headers) => {
  return await axiosInstance.patch(
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

const getAllAssignedUsersByCounselorId = async (
  counselorId,
  page,
  limit,
  headers
) => {
  return await axiosInstance.get(`/counselor-assigned-users/${counselorId}`, {
    params: { page, limit },
    headers: headers,
  });
};
const deleteUserById = async (id, headers) => {
  return await axiosInstance.delete(`/delete-user/${id}`, {
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
  deleteUserById,
};
//=======================================================
