// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   assignCouncilorsAsync,
//   getAllCouncilorsAsync,
//   getAllUsersAsync,
// } from "../store/features/auth/userSlice"; // Adjust the path according to your project structure
// import {
//   FaAnglesLeft,
//   FaAnglesRight,
//   FaAngleLeft,
//   FaAngleRight,
// } from "react-icons/fa6";
// import { BsThreeDots } from "react-icons/bs";

// const Users = () => {
//   const dispatch = useDispatch();
//   const { users, councilors, loading, error } = useSelector(
//     (state) => state.user
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedCounselor, setSelectedCounselor] = useState("");
//   const [counselorAssigned, setCounselorAssigned] = useState(false);

//   useEffect(() => {
//     dispatch(getAllUsersAsync());
//     dispatch(getAllCouncilorsAsync());
//   }, [dispatch]);

//   useEffect(() => {
//     if (counselorAssigned) {
//       dispatch(getAllUsersAsync());
//       setCounselorAssigned(false);
//     }
//   }, [counselorAssigned, dispatch]);

//   const handleAssignCounselor = () => {
//     if (selectedUser && selectedCounselor) {
//       dispatch(
//         assignCouncilorsAsync({
//           userId: selectedUser._id,
//           counselorId: selectedCounselor,
//         })
//       ).then(() => {
//         setCounselorAssigned(true);
//       });
//       setSelectedUser(null);
//       setSelectedCounselor("");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const userList = users && users.data ? users.data : [];

//   // Filter users based on search query and selected role
//   const filteredUsers = userList.filter((user) => {
//     const matchesSearchQuery =
//       user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user?.role?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesSelectedRole =
//       selectedRole === "" || user?.role === selectedRole;

//     return matchesSearchQuery && matchesSelectedRole;
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "--";
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
//       <div className="flex flex-col mb-4">
//         <h2 className="text-xl font-bold">User List</h2>
//         <div className="flex justify-between">
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border w-72 mt-4 rounded-lg px-3 py-2"
//           />
//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="border w-72 mt-4 rounded-lg px-3 py-2"
//           >
//             <option value="">All Roles</option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             <option value="superAdmin">Super Admin</option>
//             <option value="counselor">Counselor</option>
//           </select>
//         </div>
//       </div>

//       <table className="min-w-full">
//         <thead className="bg-blue-50">
//           <tr className="text-left border-b">
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Email</th>
//             <th className="py-2 px-4">Mobile</th>
//             <th className="py-2 px-4">Last login</th>
//             <th className="py-2 px-4">Last logout</th>
//             <th className="py-2 px-4">Role</th>
//             <th className="py-2 px-4">Assigned Counselor</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-100">
//                 <td className="py-3 px-4">{user.name}</td>
//                 <td className="py-3 px-4">{user.email}</td>
//                 <td className="py-3 px-4">{user.mobile}</td>
//                 <td className="py-3 px-4">{formatDate(user.lastLogin)}</td>
//                 <td className="py-3 px-4">{formatDate(user.lastLogout)}</td>

//                 <td className="py-3 px-4">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       user.role === "admin"
//                         ? "bg-blue-50 text-blue-800"
//                         : user.role === "superAdmin"
//                         ? "bg-purple-100 text-purple-800"
//                         : "bg-green-100 text-green-800"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4">{user?.assignedCounselor?.name}</td>
//                 <td className="py-3 px-4 text-center">
//                   <button
//                     className="text-gray-600 border rounded-lg p-1"
//                     onClick={() => setSelectedUser(user)}
//                   >
//                     <BsThreeDots />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="py-3 px-4 text-center">
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <div className="mt-4 flex justify-between items-center">
//         <p className="text-sm text-gray-600">
//           {filteredUsers.length} of {userList.length} row(s) selected.
//         </p>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600">Rows per page</span>
//           <select className="border rounded-md px-2 py-1">
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <div className="flex justify-end space-x-1 text-gray-500">
//             <button className="px-2 py-1 border rounded-md ">
//               <FaAnglesLeft />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAngleLeft />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAngleRight />
//             </button>
//             <button className="px-2 py-1 border rounded-md">
//               <FaAnglesRight />
//             </button>
//           </div>
//         </div>
//       </div>
//       {selectedUser && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg">
//             <h3 className="text-lg font-bold mb-4">
//               Assign Counselor to {selectedUser.name}
//             </h3>
//             <select
//               value={selectedCounselor}
//               onChange={(e) => setSelectedCounselor(e.target.value)}
//               className="border rounded-md px-2 py-1 mb-4 w-full"
//             >
//               <option value="">Select a counselor</option>
//               {councilors?.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
//                 onClick={handleAssignCounselor}
//               >
//                 Assign
//               </button>
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded-md"
//                 onClick={() => setSelectedUser(null)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Users;
//==================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignCouncilorsAsync,
  deleteUserByIdAsync,
  getAllCouncilorsAsync,
  getAllUsersAsync,
} from "../store/features/auth/userSlice";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
  FaTrash,
} from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const Users = () => {
  const dispatch = useDispatch();
  const { users, councilors, loading, error, pagination } = useSelector(
    (state) => state.user
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [counselorAssigned, setCounselorAssigned] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  console.log(users);

  useEffect(() => {
    dispatch(
      getAllUsersAsync({ page: pagination.currentPage, limit: rowsPerPage })
    );
    dispatch(getAllCouncilorsAsync());
  }, [dispatch, rowsPerPage]);

  useEffect(() => {
    if (counselorAssigned) {
      dispatch(
        getAllUsersAsync({ page: pagination.currentPage, limit: rowsPerPage })
      );
      setCounselorAssigned(false);
    }
  }, [counselorAssigned, dispatch, pagination.currentPage, rowsPerPage]);

  const handleAssignCounselor = () => {
    if (selectedUser && selectedCounselor) {
      dispatch(
        assignCouncilorsAsync({
          userId: selectedUser._id,
          counselorId: selectedCounselor,
        })
      ).then(() => {
        setCounselorAssigned(true);
      });
      setSelectedUser(null);
      setSelectedCounselor("");
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(getAllUsersAsync({ page: newPage, limit: rowsPerPage }));
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const userList = users && users.data ? users.data : [];
  const userList = users && users;

  // Filter users based on search query and selected role
  const filteredUsers = userList.filter((user) => {
    const matchesSearchQuery =
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSelectedRole =
      selectedRole === "" || user?.role === selectedRole;

    return matchesSearchQuery && matchesSelectedRole;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "--";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      dispatch(deleteUserByIdAsync({ id: userToDelete._id })).then(() => {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
        dispatch(
          getAllUsersAsync({ page: pagination.currentPage, limit: rowsPerPage })
        );
      });
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold">User List</h2>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border w-72 mt-4 rounded-lg px-3 py-2"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border w-72 mt-4 rounded-lg px-3 py-2"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superAdmin">Super Admin</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>
      </div>

      <table className="min-w-full">
        <thead className="bg-blue-50">
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Mobile</th>
            <th className="py-2 px-4">Last login</th>
            <th className="py-2 px-4">Last logout</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Assigned Counselor</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.mobile}</td>
                <td className="py-3 px-4">{formatDate(user.lastLogin)}</td>
                <td className="py-3 px-4">{formatDate(user.lastLogout)}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  {user.assignedCounselor?.name || (
                    <div
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-500 cursor-pointer flex items-center space-x-1"
                    >
                      {/* <span>Assign Counselor</span>
                      <BsThreeDots /> */}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4">
                  {/* {selectedUser && selectedUser._id === user._id && (
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedCounselor}
                        onChange={(e) => setSelectedCounselor(e.target.value)}
                        className="border rounded-lg px-2 py-1"
                      >
                        <option value="">Select a Counselor</option>
                        {councilors.map((counselor) => (
                          <option key={counselor._id} value={counselor._id}>
                            {counselor.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssignCounselor}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Assign
                      </button>
                    </div>
                  )} */}

                  {/* Add a Delete button */}
                  <button
                    onClick={() => {
                      setUserToDelete(user);
                      setIsDeleteDialogOpen(true);
                    }}
                    className="ml-2 bg-red-400 text-white px-4 py-2 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold">Confirm Deletion</h3>
            <p>Are you sure you want to delete this user?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div>
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.currentPage === 1}
            className={`px-2 py-1 border rounded-l-lg ${
              pagination.currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            }`}
          >
            <FaAnglesLeft />
          </button>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className={`px-2 py-1 border ${
              pagination.currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            }`}
          >
            <FaAngleLeft />
          </button>
          <span className="px-4">
            {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`px-2 py-1 border ${
              pagination.currentPage === pagination.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            }`}
          >
            <FaAngleRight />
          </button>
          <button
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={pagination.currentPage === pagination.totalPages}
            className={`px-2 py-1 border rounded-r-lg ${
              pagination.currentPage === pagination.totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500"
            }`}
          >
            <FaAnglesRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
