// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAppointmentsByAgentsIdAsync } from "../../store/features/appoinments/appoinmentsSlice";

// const Appointments = () => {
//   const { agentId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { appointments, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   console.log("AgentComponent", appointments);

//   useEffect(() => {
//     if (agentId) {
//       dispatch(getAppointmentsByAgentsIdAsync({ agentId }));
//     }
//   }, [dispatch, agentId]);

//   if (loading) {
//     return <p className="text-blue-600">Loading appointments...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">Error: {error}</p>;
//   }

//   if (!appointments || appointments.length === 0) {
//     return <p className="text-gray-600">No appointments found.</p>;
//   }
//   return (
//     <div className="p-4">
//       <button
//         onClick={() => navigate("/agents")}
//         className="mb-4 px-4 py-2 bg-gray-100 rounded-lg "
//       >
//         Back to Agents
//       </button>
//       <h1 className="text-lg font-bold my-10">
//         Appointments for Agent ID: {agentId}
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-6 border-b-2">Type</th>
//               <th className="py-3 px-6 border-b-2">Age</th>
//               <th className="py-3 px-6 border-b-2">Gender</th>
//               <th className="py-3 px-6 border-b-2">Problem</th>
//               <th className="py-3 px-6 border-b-2">Description</th>
//               <th className="py-3 px-6 border-b-2">Status</th>
//               <th className="py-3 px-6 border-b-2">Appointment Date</th>
//               <th className="py-3 px-6 border-b-2">Ticket</th>
//               <th className="py-3 px-6 border-b-2">Labs</th>
//               <th className="py-3 px-6 border-b-2">Tests</th>
//               <th className="py-3 px-6 border-b-2">Commission</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {appointments.map((appointment) => (
//               <tr
//                 key={appointment._id}
//                 className="hover:bg-gray-100 transition-colors"
//               >
//                 <td className="py-3 px-6 border-b">{appointment.type}</td>
//                 <td className="py-3 px-6 border-b">{appointment.age}</td>
//                 <td className="py-3 px-6 border-b">{appointment.gender}</td>
//                 <td className="py-3 px-6 border-b">{appointment.problem}</td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment.problemDescription}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   <span
//                     className={`px-3 py-1 inline-block rounded-full text-sm ${
//                       appointment.status === "Approve"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {appointment.status}
//                   </span>
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {new Date(appointment.appointmentDate).toLocaleDateString()}
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment.ticket}</td>
//                 <td className="py-3 px-6 border-b">
//                   <div>
//                     <p className="font-semibold">
//                       {appointment?.labs?.lab.name}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       {appointment.labs.lab.contactNumber}
//                     </p>
//                     <img
//                       src={appointment?.labs?.lab.image}
//                       alt={appointment?.labs?.lab.name}
//                       className="w-12 h-12 rounded-full mt-2"
//                     />
//                   </div>
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment.labs.tests.map((test) => (
//                     <div key={test._id} className="mb-4">
//                       <p className="font-semibold">{test.test.name}</p>
//                       <p className="text-sm text-gray-500">
//                         {test.test.description}
//                       </p>
//                       <p className="text-sm">Price: ${test?.test?.price}</p>
//                       <p className="text-sm">
//                         Status:{" "}
//                         <span
//                           className={`px-2 py-1 inline-block rounded-full text-xs ${
//                             test.status === "Completed"
//                               ? "bg-blue-100 text-blue-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {test?.status}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Updated By: {test?.updatedBy?.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Updated At: {new Date(test.updatedAt).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   <p className="text-sm">
//                     Franchise: {appointment.commission.superAdminToFranchise}%
//                   </p>
//                   <p className="text-sm">
//                     Agent: {appointment.commission.superAdminToAgent}%
//                   </p>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;
//===========================================================
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAppointmentsByAgentsIdAsync } from "../../store/features/appoinments/appoinmentsSlice";
// import { MdOutlineVisibility } from "react-icons/md";

// const Appointments = () => {
//   const { agentId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { appointments, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   const { user } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (agentId) {
//       dispatch(getAppointmentsByAgentsIdAsync({ agentId: user || agentId }));
//     }
//     dispatch(getAppointmentsByAgentsIdAsync({ agentId: user }));
//   }, [dispatch, agentId]);

//   if (loading) {
//     return <p className="text-blue-600">Loading appointments...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">Error: {error}</p>;
//   }

//   if (!appointments || appointments.length === 0) {
//     return <p className="text-gray-600">No appointments found.</p>;
//   }

//   // const handleViewBookings = (appointment) => {
//   //   navigate(`/bookings/view`, { state: { appointment } });
//   // };

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   // const handleViewBookings = (appointment) => {
//   //   console.log("Navigating with appointment:", appointment);
//   //   const agentId = appointment?.referral;
//   //   if (agentId) {
//   //     navigate(`/appointments/${agentId}`);
//   //   } else {
//   //     console.error("Agent ID is undefined");
//   //     // Handle error or fallback
//   //   }
//   // };

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => navigate("/agents")}
//         className="mb-4 px-4 py-2 bg-gray-100 rounded-lg "
//       >
//         Back to Agents
//       </button>
//       <h1 className="text-lg font-bold my-10">
//         Appointments for Agent ID: {agentId}
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-6 border-b-2">User Name</th>
//               <th className="py-3 px-6 border-b-2">Email</th>
//               <th className="py-3 px-6 border-b-2">Mobile</th>
//               <th className="py-3 px-6 border-b-2">Problem</th>
//               <th className="py-3 px-6 border-b-2">Lab Name</th>
//               <th className="py-3 px-6 border-b-2">Test Name</th>
//               <th className="py-3 px-6 border-b-2">Ticket</th>
//               <th className="py-3 px-6 border-b-2">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {appointments.map((appointment) => (
//               <tr
//                 key={appointment?._id}
//                 className="hover:bg-gray-100 transition-colors"
//               >
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.email}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.mobile}
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.problem}</td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.labs?.lab?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   <ul>
//                     {appointment?.labs?.tests.map((test) => (
//                       <li className="list-disc" key={test?._id}>
//                         {test?.test?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.ticket}</td>
//                 <td className="py-3 px-6 border-b">
//                   <button
//                     className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                     onClick={() => handleViewBookings(appointment)}
//                   >
//                     <MdOutlineVisibility />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;
//==============================================
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { getAppointmentsByAgentsIdAsync } from "../../store/features/appoinments/appoinmentsSlice";
// import { MdOutlineVisibility } from "react-icons/md";

// const Appointments = () => {
//   const { agentId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { appointments, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   const { user } = useSelector((state) => state.user);
//   console.log(user);

//   useEffect(() => {
//     if (agentId) {
//       console.log("AgentID", agentId);

//       dispatch(getAppointmentsByAgentsIdAsync({ agentId: user || agentId }));
//     } else {
//       dispatch(getAppointmentsByAgentsIdAsync({ agentId: user }));
//     }
//   }, [dispatch, agentId, user]);

//   if (loading) {
//     return <p className="text-blue-600">Loading appointments...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">Error: {error}</p>;
//   }

//   if (!appointments || appointments.length === 0) {
//     return <p className="text-gray-600">No appointments found.</p>;
//   }

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   return (
//     <div className="p-4">
//       {location.pathname !== "/my-referral-bookings" && (
//         <button
//           onClick={() => navigate("/agents")}
//           className="mb-4 px-4 py-2 bg-gray-100 rounded-lg "
//         >
//           Back to Agents
//         </button>
//       )}
//       <h1 className="text-lg font-bold my-10">
//         Appointments for Agent ID: {agentId}
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-6 border-b-2">User Name</th>
//               <th className="py-3 px-6 border-b-2">Email</th>
//               <th className="py-3 px-6 border-b-2">Mobile</th>
//               <th className="py-3 px-6 border-b-2">Problem</th>
//               <th className="py-3 px-6 border-b-2">Lab Name</th>
//               <th className="py-3 px-6 border-b-2">Test Name</th>
//               <th className="py-3 px-6 border-b-2">Ticket</th>
//               <th className="py-3 px-6 border-b-2">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {appointments.map((appointment) => (
//               <tr
//                 key={appointment?._id}
//                 className="hover:bg-gray-100 transition-colors"
//               >
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.email}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.mobile}
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.problem}</td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.labs?.lab?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   <ul>
//                     {appointment?.labs?.tests.map((test) => (
//                       <li className="list-disc" key={test?._id}>
//                         {test?.test?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.ticket}</td>
//                 <td className="py-3 px-6 border-b">
//                   <button
//                     className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                     onClick={() => handleViewBookings(appointment)}
//                   >
//                     <MdOutlineVisibility />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;
//============================================
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { getAppointmentsByAgentsIdAsync } from "../../store/features/appoinments/appoinmentsSlice";
// import { MdOutlineVisibility } from "react-icons/md";

// const Appointments = () => {
//   const { agentId: paramAgentId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { appointments, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   const { user, role } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (role === "superAdmin" && paramAgentId) {
//       dispatch(getAppointmentsByAgentsIdAsync({ agentId: paramAgentId }));
//     } else if (role === "agent") {
//       dispatch(getAppointmentsByAgentsIdAsync({ agentId: user }));
//     }
//   }, [dispatch, paramAgentId, user, role]);

//   if (loading) {
//     return <p className="text-blue-600">Loading appointments...</p>;
//   }

//   if (error) {
//     return <p className="text-red-600">Error: {error}</p>;
//   }

//   if (!appointments || appointments.length === 0) {
//     return <p className="text-gray-600">No appointments found.</p>;
//   }

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   return (
//     <div className="p-4">
//       {location.pathname !== "/my-referral-bookings" && (
//         <button
//           onClick={() => navigate("/agents")}
//           className="mb-4 px-4 py-2 bg-gray-100 rounded-lg"
//         >
//           Back to Agents
//         </button>
//       )}
//       <h1 className="text-lg font-bold my-10">
//         Appointments for Agent ID: {paramAgentId}
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead className="bg-blue-50">
//             <tr>
//               <th className="py-3 px-6 border-b-2">User Name</th>
//               <th className="py-3 px-6 border-b-2">Email</th>
//               <th className="py-3 px-6 border-b-2">Mobile</th>
//               <th className="py-3 px-6 border-b-2">Problem</th>
//               <th className="py-3 px-6 border-b-2">Lab Name</th>
//               <th className="py-3 px-6 border-b-2">Test Name</th>
//               <th className="py-3 px-6 border-b-2">Ticket</th>
//               <th className="py-3 px-6 border-b-2">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {appointments.map((appointment) => (
//               <tr
//                 key={appointment?._id}
//                 className="hover:bg-gray-100 transition-colors"
//               >
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.email}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.createdBy?.mobile}
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.problem}</td>
//                 <td className="py-3 px-6 border-b">
//                   {appointment?.labs?.lab?.name}
//                 </td>
//                 <td className="py-3 px-6 border-b">
//                   <ul>
//                     {appointment?.labs?.tests.map((test) => (
//                       <li className="list-disc" key={test?._id}>
//                         {test?.test?.labCategory?.name}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="py-3 px-6 border-b">{appointment?.ticket}</td>
//                 <td className="py-3 px-6 border-b">
//                   <button
//                     className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
//                     onClick={() => handleViewBookings(appointment)}
//                   >
//                     <MdOutlineVisibility />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Appointments;
//==================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getAppointmentsByAgentsIdAsync } from "../../store/features/appoinments/appoinmentsSlice";
import { MdOutlineVisibility } from "react-icons/md";
import { BsEye } from "react-icons/bs";

const Appointments = () => {
  const { agentId: paramAgentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { appointments, loading, error, pagination } = useSelector(
    (state) => state.appointments
  );
  const { user, role } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (role === "superAdmin" && paramAgentId) {
      dispatch(
        getAppointmentsByAgentsIdAsync({
          agentId: paramAgentId,
          page: currentPage,
          limit,
        })
      );
    } else if (role === "agent") {
      dispatch(
        getAppointmentsByAgentsIdAsync({
          agentId: user,
          page: currentPage,
          limit,
        })
      );
    }
  }, [dispatch, paramAgentId, user, role, currentPage, limit]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on limit change
  };

  if (loading) {
    return <p className="text-blue-600">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  if (!appointments || appointments.length === 0) {
    return <p className="text-gray-600">No appointments found.</p>;
  }

  const handleViewBookings = (appointment) => {
    navigate(`/bookings/view`, {
      state: { appointment, from: "appointments" },
    });
  };

  const handleAppointmentDetails = (appointment) => {
    navigate("/bookings-details", { state: { appointment } });
  };

  return (
    <div className="p-4">
      {location.pathname !== "/my-referral-bookings" && (
        <button
          onClick={() => navigate("/agents")}
          className="mb-4 px-4 py-2 bg-gray-100 rounded-lg"
        >
          Back to Agents
        </button>
      )}
      <h1 className="text-lg font-bold my-10">
        Appointments for Agent ID: {paramAgentId}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="py-3 px-6 border-b-2">User Name</th>
              <th className="py-3 px-6 border-b-2">Email</th>
              <th className="py-3 px-6 border-b-2">Mobile</th>
              <th className="py-3 px-6 border-b-2">Problem</th>
              <th className="py-3 px-6 border-b-2">Lab Name</th>
              <th className="py-3 px-6 border-b-2">Test Name</th>
              <th className="py-3 px-6 border-b-2">Ticket</th>
              <th className="py-3 px-6 border-b-2">Action</th>
              <th className="px-4 py-2 border-b">Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {appointments.map((appointment) => (
              <tr
                key={appointment?._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6 border-b">
                  {appointment?.createdBy?.name}
                </td>
                <td className="py-3 px-6 border-b">
                  {appointment?.createdBy?.email}
                </td>
                <td className="py-3 px-6 border-b">
                  {appointment?.createdBy?.mobile}
                </td>
                <td className="py-3 px-6 border-b">{appointment?.problem}</td>
                <td className="py-3 px-6 border-b">
                  {appointment?.labs?.lab?.name}
                </td>
                <td className="py-3 px-6 border-b">
                  <ul>
                    {appointment?.labs?.tests.map((test) => (
                      <li className="list-disc" key={test?._id}>
                        {test?.test?.labCategory?.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-6 border-b">{appointment?.ticket}</td>
                <td className="py-3 px-6 border-b">
                  <button
                    className="mr-2 px-2 py-1 border rounded-lg bg-blue-500 text-white"
                    onClick={() => handleViewBookings(appointment)}
                  >
                    <MdOutlineVisibility />
                  </button>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleAppointmentDetails(appointment)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
                  >
                    <BsEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Items per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border px-2 py-1 rounded"
          >
            {[10, 20, 30, 40, 50].map((limitOption) => (
              <option key={limitOption} value={limitOption}>
                {limitOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded-md"
          >
            Previous
          </button>
          <span className="mx-3">
            Page {currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={currentPage >= pagination.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
