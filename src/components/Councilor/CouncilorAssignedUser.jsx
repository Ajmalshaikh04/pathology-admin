// // CouncilorAssignedUser.js
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { getAllAssignedUsersByCounselorIdAsync } from "../../store/features/auth/userSlice";

// const CouncilorAssignedUser = () => {
//   const { councilorId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { councilorUsers, loading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(
//       getAllAssignedUsersByCounselorIdAsync({ counselorId: councilorId })
//     );
//   }, [dispatch, councilorId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
//       <h2 className="text-xl font-bold mb-4">
//         Assigned Users for Councilor {councilorId}
//       </h2>
//       <button
//         onClick={() => navigate("/councilor")}
//         className="px-3 py-1 bg-gray-200 rounded-lg mb-4"
//       >
//         Back to Councilor List
//       </button>
//       <table className="min-w-full">
//         <thead className="bg-blue-50">
//           <tr className="text-left border-b">
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Email</th>
//             <th className="py-2 px-4">Mobile</th>
//           </tr>
//         </thead>
//         <tbody>
//           {councilorUsers.length > 0 ? (
//             councilorUsers.map((user) => (
//               <tr key={user._id} className="border-b">
//                 <td className="py-3 px-4">{user.name}</td>
//                 <td className="py-3 px-4">{user.email}</td>
//                 <td className="py-3 px-4">{user.mobile}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="py-3 px-4 text-center">
//                 No assigned users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CouncilorAssignedUser;
//==========================================================
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAssignedUsersByCounselorIdAsync } from "../../store/features/auth/userSlice";

const CouncilorAssignedUser = () => {
  const { councilorId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { councilorUsers, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      getAllAssignedUsersByCounselorIdAsync({
        counselorId: councilorId,
      })
    );
  }, [dispatch, councilorId]);

  const handleUserClick = (userId) => {
    navigate(`/councilor/user-appointments/${userId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <h2 className="text-xl font-bold mb-4">
        Assigned Users for Councilor {councilorId}
      </h2>
      <button
        onClick={() => navigate("/councilor")}
        className="px-3 py-1 bg-gray-200 rounded-lg mb-4"
      >
        Back to Councilor List
      </button>
      <table className="min-w-full">
        <thead className="bg-blue-50">
          <tr className="text-left border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {councilorUsers.length > 0 ? (
            councilorUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-100"
                onClick={() => handleUserClick(user._id)}
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-4 text-center">
                No assigned users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouncilorAssignedUser;
