import React, { useState } from "react";
import { FaCheck, FaEdit, FaEye, FaTrash } from "react-icons/fa";

const UserView = ({
  searchTerm,
  setSearchTerm,
  filteredAppointments,
  handleAppointmentClick,
  handleAppointmentDetails,
  updateCommission,
  deleteAppointment,
}) => {
  // const [editingField, setEditingField] = useState(null);
  // const [updatedCommissions, setUpdatedCommissions] = useState({});

  // const handleEdit = (appointmentId, field) => {
  //   setEditingField(`${appointmentId}-${field}`);
  //   const appointment = filteredAppointments.find(
  //     (appt) => appt._id === appointmentId
  //   );
  //   if (appointment) {
  //     setUpdatedCommissions({
  //       ...updatedCommissions,
  //       [`${appointmentId}-${field}`]:
  //         field === "agent"
  //           ? appointment?.commission?.superAdminToAgent || 0
  //           : appointment?.commission?.superAdminToFranchise || 0,
  //     });
  //   }
  // };

  // const handleOk = (appointmentId, field) => {
  //   updateCommission(
  //     appointmentId,
  //     field === "agent" ? "superAdminToAgent" : "superAdminToFranchise",
  //     updatedCommissions[`${appointmentId}-${field}`]
  //   );
  //   setEditingField(null);
  // };

  // const handleChange = (e, appointmentId, field) => {
  //   setUpdatedCommissions({
  //     ...updatedCommissions,
  //     [`${appointmentId}-${field}`]: e.target.value,
  //   });
  // };
  // console.log("filteredAppointments", filteredAppointments);

  return (
    <div className="w-full p-4">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by user name, email, or problem"
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Table with appointments */}
      {filteredAppointments?.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-2 border-b">User Name</th>
              <th className="p-2 border-b">Email</th>
              <th className="p-2 border-b">Mobile</th>
              <th className="p-2 border-b">Problem</th>
              <th className="p-2 border-b">Ticket</th>
              <th className="p-2 border-b">Commission (Agent)</th>
              <th className="p-2 border-b">Commission (Franchise)</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="p-2 border-b">{appointment?.createdBy?.name}</td>
                <td className="p-2 border-b">
                  {appointment?.createdBy?.email}
                </td>
                <td className="p-2 border-b">
                  {appointment?.createdBy?.mobile ||
                    appointment?.createdBy?.contact}
                </td>
                <td className="p-2 border-b">{appointment?.problem}</td>
                <td className="p-2 border-b">{appointment?.ticket}</td>
                {/* <td className="p-2 border-b">
                  {editingField === `${appointment._id}-agent` ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={updatedCommissions[`${appointment._id}-agent`]}
                        onChange={(e) =>
                          handleChange(e, appointment._id, "agent")
                        }
                        className="p-1 border border-gray-300 rounded w-20 mr-2"
                      />
                      <button
                        onClick={() => handleOk(appointment._id, "agent")}
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        {appointment?.commission?.superAdminToAgent || 0}
                      </span>
                      <button
                        onClick={() => handleEdit(appointment._id, "agent")}
                        className="text-blue-500 hover:underline"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-2 border-b">
                  {editingField === `${appointment._id}-franchise` ? (
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={
                          updatedCommissions[`${appointment._id}-franchise`]
                        }
                        onChange={(e) =>
                          handleChange(e, appointment._id, "franchise")
                        }
                        className="p-1 border border-gray-300 rounded w-20 mr-2"
                      />
                      <button
                        onClick={() => handleOk(appointment._id, "franchise")}
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        <FaCheck />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        {appointment?.commission?.superAdminToFranchise || 0}
                      </span>
                      <button
                        onClick={() => handleEdit(appointment._id, "franchise")}
                        className="text-blue-500 hover:underline"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                </td> */}
                <td className="p-2 border-b">
                  <div className="flex items-center justify-center">
                    {appointment?.referral?.commissionPercentage || "--"}
                  </div>
                </td>
                <td className="p-2 border-b">
                  <div className="flex items-center justify-center">
                    {appointment?.franchise?.commissionPercentage || "--"}
                  </div>
                </td>
                <td className="p-2 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAppointmentClick(appointment)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      View Status
                    </button>
                    <button
                      onClick={() => handleAppointmentDetails(appointment)}
                      className="text-white bg-blue-400 p-2 rounded-lg hover:underline"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="p-2 rounded-lg text-white bg-red-400"
                      onClick={() => deleteAppointment(appointment._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500">No appointments found</div>
      )}
    </div>
  );
};

export default UserView;
