// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";

// const LabAppointments = () => {
//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);
//   const { user } = useSelector((state) => state.user);
//   console.log("LABBS IN PROGRESS", labs);

//   useEffect(() => {
//     if (user) {
//       dispatch(getLabAppointmentsInProgressAsync(user));
//     }
//   }, [dispatch, user]);

//   if (loading) return <div>Loading appointments...</div>;
//   if (error) return <div>Error loading appointments: {error}</div>;

//   const appointmentList = Array.isArray(labs) ? labs : [];

//   return (
//     <div>
//       <h2>Lab Appointments In Progress</h2>
//       {appointmentList.length === 0 ? (
//         <p>No appointments in progress.</p>
//       ) : (
//         <ul>
//           {appointmentList.map((appointment) => (
//             <li key={appointment._id}>
//               <div>Appointment ID: {appointment._id}</div>
//               <div>Type: {appointment.type}</div>
//               <div>Problem: {appointment.problem}</div>
//               <div>Status: {appointment.status}</div>
//               <div>
//                 Appointment Date:{" "}
//                 {new Date(appointment.appointmentDate).toLocaleDateString()}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LabAppointments;
//=============================================
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";

// const LabAppointments = () => {
//   const dispatch = useDispatch();
//   const { labs, loading, error } = useSelector((state) => state.labs);
//   const { user } = useSelector((state) => state.user);
//   console.log("LABS IN PROGRESS", labs);

//   useEffect(() => {
//     if (user) {
//       dispatch(getLabAppointmentsInProgressAsync(user));
//     }
//   }, [dispatch, user]);

//   const handleViewClick = (appointmentId) => {
//     // Handle the view action here, e.g., navigate to a detail page or open a modal
//     console.log("View appointment details for ID:", appointmentId);
//   };

//   if (loading)
//     return (
//       <div className="text-center text-xl mt-4">Loading appointments...</div>
//     );
//   if (error)
//     return (
//       <div className="text-center text-red-600 text-xl mt-4">
//         Error loading appointments: {error}
//       </div>
//     );

//   const appointmentList = Array.isArray(labs) ? labs : [];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Lab Appointments In Progress
//       </h2>
//       {appointmentList.length === 0 ? (
//         <p className="text-center text-lg">No appointments in progress.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border-b">Appointment ID</th>
//                 <th className="px-4 py-2 border-b">Type</th>
//                 <th className="px-4 py-2 border-b">Problem</th>
//                 <th className="px-4 py-2 border-b">Status</th>
//                 <th className="px-4 py-2 border-b">Appointment Date</th>
//                 <th className="px-4 py-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointmentList.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border-b">{appointment._id}</td>
//                   <td className="px-4 py-2 border-b">{appointment.type}</td>
//                   <td className="px-4 py-2 border-b">{appointment.problem}</td>
//                   <td className="px-4 py-2 border-b">{appointment.status}</td>
//                   <td className="px-4 py-2 border-b">
//                     {new Date(appointment.appointmentDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button
//                       onClick={() => handleViewClick(appointment._id)}
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabAppointments;
//===========================================
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";
// import { useNavigate } from "react-router-dom";
// import { BsEye } from "react-icons/bs";

// const LabAppointments = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { labs, loading, error } = useSelector((state) => state.labs);
//   const { user } = useSelector((state) => state.user);
//   console.log("LABS IN PROGRESS", labs);

//   useEffect(() => {
//     if (user) {
//       dispatch(getLabAppointmentsInProgressAsync(user));
//     }
//   }, [dispatch, user]);

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   if (loading)
//     return (
//       <div className="text-center text-xl mt-4">Loading appointments...</div>
//     );
//   if (error)
//     return (
//       <div className="text-center text-red-600 text-xl mt-4">
//         Error loading appointments: {error}
//       </div>
//     );

//   const appointmentList = Array.isArray(labs) ? labs : [];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Lab Appointments In Progress
//       </h2>
//       {appointmentList.length === 0 ? (
//         <p className="text-center text-lg">No appointments in progress.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border-b">Name</th>
//                 <th className="px-4 py-2 border-b">Email</th>
//                 <th className="px-4 py-2 border-b">Type</th>
//                 <th className="px-4 py-2 border-b">Problem</th>
//                 <th className="px-4 py-2 border-b">Description</th>
//                 <th className="px-4 py-2 border-b">Gender</th>
//                 <th className="px-4 py-2 border-b">Status</th>
//                 <th className="px-4 py-2 border-b">Appointment Date</th>
//                 <th className="px-4 py-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointmentList.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.name}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.email}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.type}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.problem}</td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.problemDescription}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.gender}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.status}</td>
//                   <td className="px-4 py-2 border-b">
//                     {new Date(
//                       appointment?.appointmentDate
//                     ).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     <button
//                       onClick={() => handleViewBookings(appointment)}
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
//                     >
//                       <BsEye />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabAppointments;
//===================================================
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";
// import { useNavigate } from "react-router-dom";
// import { BsEye, BsUpload } from "react-icons/bs";
// import UploadReportModal from "./UploadReportModal";

// const LabAppointments = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { labs, loading, error } = useSelector((state) => state.labs);
//   const { user } = useSelector((state) => state.user);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   useEffect(() => {
//     if (user) {
//       dispatch(getLabAppointmentsInProgressAsync(user));
//     }
//   }, [dispatch, user]);

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   const handleUploadReport = (appointment) => {
//     setSelectedAppointment(appointment);
//   };

//   const closeModal = () => {
//     setSelectedAppointment(null);
//   };

//   if (loading)
//     return (
//       <div className="text-center text-xl mt-4">Loading appointments...</div>
//     );
//   if (error)
//     return (
//       <div className="text-center text-red-600 text-xl mt-4">
//         Error loading appointments: {error}
//       </div>
//     );

//   const appointmentList = Array.isArray(labs) ? labs : [];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Lab Appointments In Progress
//       </h2>
//       {appointmentList.length === 0 ? (
//         <p className="text-center text-lg">No appointments in progress.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border-b">Name</th>
//                 <th className="px-4 py-2 border-b">Email</th>
//                 <th className="px-4 py-2 border-b">Type</th>
//                 <th className="px-4 py-2 border-b">Problem</th>
//                 <th className="px-4 py-2 border-b">Description</th>
//                 <th className="px-4 py-2 border-b">Gender</th>
//                 <th className="px-4 py-2 border-b">Status</th>
//                 <th className="px-4 py-2 border-b">Appointment Date</th>
//                 <th className="px-4 py-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointmentList.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.name}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.email}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.type}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.problem}</td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.problemDescription}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.gender}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.status}</td>
//                   <td className="px-4 py-2 border-b">
//                     {new Date(
//                       appointment?.appointmentDate
//                     ).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border-b flex items-center space-x-2">
//                     <button
//                       onClick={() => handleViewBookings(appointment)}
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
//                     >
//                       <BsEye />
//                     </button>
//                     {appointment?.labs?.tests.some(
//                       (test) =>
//                         test?.status === "Completed" ||
//                         test?.status === "Closed"
//                     ) && (
//                       <button
//                         onClick={() => handleUploadReport(appointment)}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded"
//                       >
//                         <BsUpload />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <UploadReportModal
//         isOpen={!!selectedAppointment}
//         onClose={closeModal}
//         appointment={selectedAppointment}
//       />
//     </div>
//   );
// };

// export default LabAppointments;
//============================================
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";
// import { useNavigate } from "react-router-dom";
// import { BsEye, BsUpload } from "react-icons/bs";
// import UploadReportModal from "./UploadReportModal";

// const LabAppointments = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { labs, loading, error, pagination } = useSelector(
//     (state) => state.labs
//   );
//   const { user } = useSelector((state) => state.user);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit, setLimit] = useState(10);

//   useEffect(() => {
//     if (user) {
//       dispatch(
//         getLabAppointmentsInProgressAsync({
//           labId: user,
//           page: currentPage,
//           limit,
//         })
//       );
//     }
//   }, [dispatch, user, currentPage, limit]);

//   const handleViewBookings = (appointment) => {
//     navigate(`/bookings/view`, {
//       state: { appointment, from: "appointments" },
//     });
//   };

//   const handleUploadReport = (appointment) => {
//     setSelectedAppointment(appointment);
//   };

//   const closeModal = () => {
//     setSelectedAppointment(null);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleLimitChange = (e) => {
//     setLimit(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page on limit change
//   };

//   if (loading)
//     return (
//       <div className="text-center text-xl mt-4">Loading appointments...</div>
//     );
//   if (error)
//     return (
//       <div className="text-center text-red-600 text-xl mt-4">
//         Error loading appointments: {error}
//       </div>
//     );

//   const appointmentList = Array.isArray(labs) ? labs : [];

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         Lab Appointments In Progress
//       </h2>
//       {appointmentList.length === 0 ? (
//         <p className="text-center text-lg">No appointments in progress.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border-b">Name</th>
//                 <th className="px-4 py-2 border-b">Email</th>
//                 <th className="px-4 py-2 border-b">Type</th>
//                 <th className="px-4 py-2 border-b">Problem</th>
//                 <th className="px-4 py-2 border-b">Description</th>
//                 <th className="px-4 py-2 border-b">Gender</th>
//                 <th className="px-4 py-2 border-b">Status</th>
//                 <th className="px-4 py-2 border-b">Appointment Date</th>
//                 <th className="px-4 py-2 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointmentList.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.name}
//                   </td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.createdBy?.email}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.type}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.problem}</td>
//                   <td className="px-4 py-2 border-b">
//                     {appointment?.problemDescription}
//                   </td>
//                   <td className="px-4 py-2 border-b">{appointment?.gender}</td>
//                   <td className="px-4 py-2 border-b">{appointment?.status}</td>
//                   <td className="px-4 py-2 border-b">
//                     {new Date(
//                       appointment?.appointmentDate
//                     ).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 border-b flex items-center space-x-2">
//                     <button
//                       onClick={() => handleViewBookings(appointment)}
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
//                     >
//                       <BsEye />
//                     </button>
//                     {appointment?.labs?.tests.some(
//                       (test) =>
//                         test?.status === "Completed" ||
//                         test?.status === "Closed"
//                     ) && (
//                       <button
//                         onClick={() => handleUploadReport(appointment)}
//                         className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded"
//                       >
//                         <BsUpload />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           <label className="mr-2">Items per page:</label>
//           <select
//             value={limit}
//             onChange={handleLimitChange}
//             className="border px-2 py-1 rounded"
//           >
//             {[10, 20, 30, 40, 50].map((limitOption) => (
//               <option key={limitOption} value={limitOption}>
//                 {limitOption}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <button
//             disabled={currentPage <= 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="px-3 py-1 border rounded-md"
//           >
//             Previous
//           </button>
//           <span className="mx-3">
//             Page {currentPage} of {pagination.totalPages}
//           </span>
//           <button
//             disabled={currentPage >= pagination.totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="px-3 py-1 border rounded-md"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       <UploadReportModal
//         isOpen={!!selectedAppointment}
//         onClose={closeModal}
//         appointment={selectedAppointment}
//       />
//     </div>
//   );
// };

// export default LabAppointments;
//========================================================
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLabAppointmentsInProgressAsync } from "../../store/features/labs/labsSlice";
import { useNavigate } from "react-router-dom";
import { BsEye, BsUpload } from "react-icons/bs";
import UploadReportModal from "./UploadReportModal";
import axiosInstance from "../../api/axiosInstance";

const LabAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { labs, loading, error, pagination } = useSelector(
    (state) => state.labs
  );
  const { user, token } = useSelector((state) => state.user); // Get user info from Redux
  const [selectedAppointment, setSelectedAppointment] = useState(null); // For report modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // Separate state for report modal
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [labBoys, setLabBoys] = useState([]); // Store lab boys list for the specific lab ID
  const [isLabBoyModalOpen, setIsLabBoyModalOpen] = useState(false); // Modal visibility state for lab boy selection
  const [selectedLabBoy, setSelectedLabBoy] = useState(""); // Track selected lab boy

  useEffect(() => {
    if (user) {
      dispatch(
        getLabAppointmentsInProgressAsync({
          labId: user, // Using user (labId) from Redux store
          page: currentPage,
          limit,
        })
      );
    }
  }, [dispatch, user, currentPage, limit]);

  useEffect(() => {
    const fetchLabBoys = async () => {
      try {
        if (user) {
          const response = await axiosInstance.get(
            `/get-lab-boy-by-lab-id/${user}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          setLabBoys(response);
        }
      } catch (error) {
        console.error("Error fetching lab boys:", error);
      }
    };

    fetchLabBoys();
  }, [user, token]); // Fetch lab boys whenever labId (user) changes

  const handleViewBookings = (appointment) => {
    navigate(`/bookings/view`, {
      state: { appointment, from: "appointments" },
    });
  };

  const handleUploadReport = (appointment) => {
    setSelectedAppointment(appointment);
    setIsReportModalOpen(true); // Open the report modal
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsReportModalOpen(false); // Close the report modal
    setIsLabBoyModalOpen(false); // Close the lab boy modal
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on limit change
  };

  const openLabBoySelectionModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsLabBoyModalOpen(true); // Open the lab boy selection modal
  };

  const handleLabBoySelectChange = (e) => {
    setSelectedLabBoy(e.target.value);
  };

  const handleSaveLabBoy = async () => {
    if (!selectedLabBoy) return;

    try {
      await axiosInstance.put(
        "/assign-lab-boy-to-appointment",
        {
          labBoyId: selectedLabBoy,
          appointmentId: selectedAppointment._id,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // Optionally refresh the appointments list after assignment
      dispatch(
        getLabAppointmentsInProgressAsync({
          labId: user, // Using user (labId) from Redux store
          page: currentPage,
          limit,
        })
      );
      closeModal();
    } catch (error) {
      console.error("Error assigning lab boy:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center text-xl mt-4">Loading appointments...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 text-xl mt-4">
        Error loading appointments: {error}
      </div>
    );

  const handleAppointmentDetails = (appointment) => {
    navigate("/bookings-details", { state: { appointment } });
  };

  const appointmentList = Array.isArray(labs) ? labs : [];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Lab Appointments In Progress
      </h2>
      {appointmentList.length === 0 ? (
        <p className="text-center text-lg">No appointments in progress.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Type</th>
                <th className="px-4 py-2 border-b">Problem</th>
                <th className="px-4 py-2 border-b">Description</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Appointment Date</th>
                <th className="px-4 py-2 border-b">Lab Boy</th>
                <th className="px-4 py-2 border-b">Actions</th>
                <th className="px-4 py-2 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {appointmentList.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">
                    {appointment?.createdBy?.name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {appointment?.createdBy?.email}
                  </td>
                  <td className="px-4 py-2 border-b">{appointment?.type}</td>
                  <td className="px-4 py-2 border-b">{appointment?.problem}</td>
                  <td className="px-4 py-2 border-b">
                    {appointment?.problemDescription}
                  </td>
                  <td className="px-4 py-2 border-b">{appointment?.gender}</td>
                  <td className="px-4 py-2 border-b">{appointment?.status}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(
                      appointment?.appointmentDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {appointment.labBoy ? (
                      appointment.labBoy.name
                    ) : (
                      <button
                        onClick={() => openLabBoySelectionModal(appointment)}
                        className="bg-blue-50 px-2 py-1 rounded"
                      >
                        Assign Lab Boy
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b ">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBookings(appointment)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
                      >
                        <BsEye />
                      </button>
                      {appointment?.labs?.tests.some(
                        (test) =>
                          test?.status === "Completed" ||
                          test?.status === "Closed"
                      ) && (
                        <button
                          onClick={() => handleUploadReport(appointment)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded"
                        >
                          <BsUpload />
                        </button>
                      )}
                    </div>
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
      )}
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
        <div className="flex">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-300 px-3 py-1 rounded-l disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage >= pagination.totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-300 px-3 py-1 rounded-r disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Report Modal */}
      {isReportModalOpen && (
        <UploadReportModal
          isOpen={Boolean(selectedAppointment)}
          onClose={closeModal}
          appointment={selectedAppointment}
        />
      )}
      {/* Lab Boy Selection Modal */}
      {isLabBoyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 w-96">
            <h2 className="text-lg font-semibold mb-4">Assign Lab Boy</h2>
            <select
              value={selectedLabBoy}
              onChange={handleLabBoySelectChange}
              className="border w-full p-2 rounded mb-4"
            >
              <option value="">Select Lab Boy</option>
              {labBoys.map((labBoy) => (
                <option key={labBoy._id} value={labBoy._id}>
                  {labBoy.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLabBoy}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabAppointments;
