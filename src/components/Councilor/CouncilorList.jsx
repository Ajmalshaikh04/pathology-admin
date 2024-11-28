import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

const CouncilorList = ({
  councilors,
  handleCouncilorClick,
  handleDeleteClick,
}) => (
  <table className="min-w-full">
    <thead className="bg-blue-50">
      <tr className="text-left border-b">
        <th className="py-2 px-4">Name</th>
        <th className="py-2 px-4">Email</th>
        <th className="py-2 px-4">Mobile</th>
        <th className="py-2 px-4">Role</th>
        <th className="py-2 px-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody>
      {councilors.length > 0 ? (
        councilors.map((user) => (
          <tr
            key={user._id}
            className="border-b hover:bg-gray-100 cursor-pointer"
          >
            <td
              className="py-3 px-4"
              onClick={() => handleCouncilorClick(user._id)}
            >
              {user.name}
            </td>
            <td
              className="py-3 px-4"
              onClick={() => handleCouncilorClick(user._id)}
            >
              {user.email}
            </td>
            <td
              className="py-3 px-4"
              onClick={() => handleCouncilorClick(user._id)}
            >
              {user.mobile}
            </td>
            <td
              className="py-3 px-4"
              onClick={() => handleCouncilorClick(user._id)}
            >
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.role === "admin"
                    ? "bg-blue-50 text-blue-800"
                    : user.role === "superAdmin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
            </td>
            <td className="py-3 px-4 text-right">
              <button
                onClick={() => handleDeleteClick(user)}
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="py-3 px-4 text-center">
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default CouncilorList;
