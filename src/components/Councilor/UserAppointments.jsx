import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAppointmentsByUserIdAsync,
  approveAppointmentAsync,
  rejectAppointmentAsync,
} from "../../store/features/appoinments/appoinmentsSlice";
import { FaEye } from "react-icons/fa";
import { BsEye } from "react-icons/bs";

const UserAppointments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (userId) {
      dispatch(getAppointmentsByUserIdAsync({ id: userId }));
    }
  }, [dispatch, userId]);

  const handleApprove = (appointmentId, labId) => {
    dispatch(approveAppointmentAsync({ appointmentId, labId }));
    dispatch(getAppointmentsByUserIdAsync({ id: userId }));
  };

  const handleReject = (appointmentId, labId) => {
    dispatch(rejectAppointmentAsync({ appointmentId, labId }));
    dispatch(getAppointmentsByUserIdAsync({ id: userId }));
  };

  const handleViewDetails = (appointment) => {
    navigate(`/councilor-user-booking/${appointment._id}`, {
      state: { appointment },
    });
  };

  const handleAppointmentDetails = (appointment) => {
    navigate("/bookings-details", { state: { appointment } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <h3 className="text-lg font-bold mb-4">User Appointments</h3>
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-gray-200 rounded-lg mb-4"
      >
        Back to Assigned Users
      </button>
      <table className="min-w-full">
        <thead className="bg-blue-50">
          <tr className="text-left border-b">
            <th className="py-2 px-4">Ticket</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Mobile</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Lab</th>
            <th className="py-2 px-4">Tests</th>
            {/* <th className="py-2 px-4">Status</th> */}
            <th className="py-2 px-4">Actions</th>
            <th className="px-4 py-2 border-b">Details</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment._id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{appointment?.ticket}</td>
                <td className="py-3 px-4">{appointment?.createdBy?.name}</td>
                <td className="py-3 px-4">{appointment?.createdBy?.email}</td>
                <td className="py-3 px-4">{appointment?.createdBy?.mobile}</td>
                <td className="py-3 px-4">
                  {new Date(appointment?.appointmentDate).toLocaleString()}
                </td>
                <td className="py-3 px-4">{appointment?.type}</td>
                <td className="py-3 px-4">{appointment?.labs?.lab?.name}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc pl-5">
                    {appointment.labs.tests.map((test) => (
                      <li key={test._id}>{test?.test?.description}</li>
                    ))}
                  </ul>
                </td>
                {/* <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      appointment.status === "Approve"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "Reject"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td> */}
                <td className="py-3 px-4">
                  {/* <button
                    onClick={() =>
                      handleApprove(
                        appointment._id,
                        appointment?.labs?.lab?._id
                      )
                    }
                    className={`px-2 py-1 rounded-md mr-2 ${
                      appointment?.status === "Approve" ||
                      appointment?.status === "Reject"
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-green-500 text-white"
                    }`}
                    disabled={
                      appointment?.status === "Approve" ||
                      appointment?.status === "Reject"
                    }
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleReject(appointment._id, appointment?.labs?.lab?._id)
                    }
                    className={`px-2 py-1 rounded-md mr-2 ${
                      appointment?.status === "Approve" ||
                      appointment?.status === "Reject"
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-red-500 text-white"
                    }`}
                    disabled={
                      appointment?.status === "Approve" ||
                      appointment?.status === "Reject"
                    }
                  >
                    Reject
                  </button> */}
                  <button
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    <FaEye />
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
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-3 px-4 text-center">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserAppointments;
