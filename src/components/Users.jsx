import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "../store/features/auth/userSlice"; // Adjust the path according to your project structure
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userList = users && users.data ? users.data : [];

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User List</h2>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : user.role === "superAdmin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-gray-600">
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-4 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          {userList.length} of {userList.length} row(s) selected.
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page</span>
          <select className="border rounded-md px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <div className="flex justify-end space-x-1 text-gray-500">
            <button className="px-2 py-1 border rounded-md ">
              <FaAnglesLeft />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAngleLeft />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAngleRight />
            </button>
            <button className="px-2 py-1 border rounded-md">
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
//===========================================
