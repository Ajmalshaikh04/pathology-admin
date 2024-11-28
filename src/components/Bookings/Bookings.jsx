// import React, { useEffect, useState, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import UserView from "./UserView";
// import {
//   getAllAppointmentsAsync,
//   updateAppointmentCommissionAsync,
// } from "../../store/features/appoinments/appoinmentsSlice";

// const Bookings = () => {
//   const dispatch = useDispatch();
//   const { appointments, pagination, loading, error } = useSelector(
//     (state) => state.appointments
//   );
//   console.log("Booking Appointment", appointments);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAppointments = (page = 1) =>
//       dispatch(getAllAppointmentsAsync({ page }));
//     fetchAppointments(currentPage);
//   }, [dispatch, currentPage]);

//   useEffect(() => {
//     setFilteredAppointments(appointments);
//   }, [appointments]);

//   const filterAppointments = useCallback(() => {
//     const filtered = appointments?.filter(
//       (appointment) =>
//         appointment?.createdBy?.name
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         appointment?.createdBy?.email
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         appointment?.problem.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredAppointments(filtered);
//   }, [searchTerm, appointments]);

//   const handleAppointmentClick = (appointment) => {
//     navigate("/bookings/view", { state: { appointment } });
//   };

//   const updateCommission = useCallback(
//     (appointmentId, commissionType, value) => {
//       dispatch(
//         updateAppointmentCommissionAsync({
//           appointmentId,
//           commission: { [commissionType]: Number(value) },
//         })
//       )
//         .unwrap()
//         .then(() => {
//           console.log("Commission updated successfully");
//           dispatch(getAllAppointmentsAsync({ page: currentPage }));
//         })
//         .catch((error) => {
//           console.error("Failed to update commission:", error);
//         });
//     },
//     [dispatch, currentPage]
//   );

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   useEffect(() => {
//     filterAppointments();
//   }, [filterAppointments]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold">Booking Management</h2>
//       </div>
//       <UserView
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         filteredAppointments={filteredAppointments}
//         handleAppointmentClick={handleAppointmentClick}
//         updateCommission={updateCommission}
//       />
//       {pagination && (
//         <div className="mt-4 flex justify-center">
//           {Array.from(
//             { length: pagination.totalPages },
//             (_, index) => index + 1
//           ).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-4 py-2 border ${
//                 currentPage === page
//                   ? "bg-blue-500 text-white"
//                   : "bg-white text-gray-700"
//               } hover:bg-blue-500 hover:text-white`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bookings;
//============================================================
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserView from "./UserView";
import {
  deleteAppointmentAsync,
  getAllAppointmentsAsync,
  updateAppointmentCommissionAsync,
} from "../../store/features/appoinments/appoinmentsSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { appointments, pagination, loading, error } = useSelector(
    (state) => state.appointments
  );
  console.log("Booking Appointment", appointments);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // New state for items per page
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = (page = 1, limit = 10) =>
      dispatch(getAllAppointmentsAsync({ page, limit }));
    fetchAppointments(currentPage, itemsPerPage);
    const intervalId = setInterval(fetchAppointments, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  const filterAppointments = useCallback(() => {
    const filtered = appointments?.filter(
      (appointment) =>
        appointment?.createdBy?.name
          .toLowerCase()
          .includes(searchTerm?.toLowerCase()) ||
        appointment?.createdBy?.email
          .toLowerCase()
          .includes(searchTerm?.toLowerCase()) ||
        appointment?.problem?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  const handleDeleteClick = (appointmentId) => {
    setIsDialogOpen(true);
    setAppointmentIdToDelete(appointmentId);
  };

  const confirmDelete = () => {
    if (appointmentIdToDelete) {
      dispatch(deleteAppointmentAsync({ id: appointmentIdToDelete }))
        .unwrap()
        .then(() => {
          console.log("Appointment deleted successfully");
          dispatch(
            getAllAppointmentsAsync({ page: currentPage, limit: itemsPerPage })
          );
        })
        .catch((error) => {
          console.error("Failed to delete appointment:", error);
        });
    }
    setIsDialogOpen(false);
    setAppointmentIdToDelete(null);
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
    setAppointmentIdToDelete(null);
  };

  const handleAppointmentClick = (appointment) => {
    navigate("/bookings/view", { state: { appointment } });
  };
  const handleAppointmentDetails = (appointment) => {
    navigate("/bookings-details", { state: { appointment } });
  };

  const updateCommission = useCallback(
    (appointmentId, commissionType, value) => {
      dispatch(
        updateAppointmentCommissionAsync({
          appointmentId,
          commission: { [commissionType]: Number(value) },
        })
      )
        .unwrap()
        .then(() => {
          console.log("Commission updated successfully");
          dispatch(
            getAllAppointmentsAsync({ page: currentPage, limit: itemsPerPage })
          );
        })
        .catch((error) => {
          console.error("Failed to update commission:", error);
        });
    },
    [dispatch, currentPage, itemsPerPage]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  useEffect(() => {
    filterAppointments();
  }, [filterAppointments]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Booking Management</h2>
        <div>
          <label htmlFor="itemsPerPage" className="mr-2">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="p-2 border rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>
      </div>
      <UserView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredAppointments={filteredAppointments}
        handleAppointmentClick={handleAppointmentClick}
        handleAppointmentDetails={handleAppointmentDetails}
        updateCommission={updateCommission}
        deleteAppointment={handleDeleteClick}
      />
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to delete this appointment?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {pagination && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(5)].map((_, index) => {
            const pageNumber = currentPage - 2 + index;
            if (pageNumber > 0 && pageNumber <= pagination.totalPages) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-blue-500 hover:text-white`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(pagination.totalPages)}
            disabled={currentPage === pagination.totalPages}
            className="px-3 py-1 border rounded bg-white text-gray-700 hover:bg-blue-500 hover:text-white disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
