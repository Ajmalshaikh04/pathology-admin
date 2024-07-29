import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCouncilorsAsync,
  getAllAssignedUsersByCounselorIdAsync,
} from "../store/features/auth/userSlice";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import {
  approveAppointmentAsync,
  getAppointmentsByUserIdAsync,
  rejectAppointmentAsync,
} from "../store/features/appoinments/appoinmentsSlice";

const Councilor = () => {
  const dispatch = useDispatch();
  const { councilors, loading, error, councilorUsers } = useSelector(
    (state) => state.user
  );
  const { appointments } = useSelector((state) => state.appointments);
  const [selectedCouncilorId, setSelectedCouncilorId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllCouncilorsAsync());
  }, [dispatch]);

  const handleCouncilorClick = (id) => {
    setSelectedCouncilorId(id);
    dispatch(getAllAssignedUsersByCounselorIdAsync({ counselorId: id }));
  };

  const handleUserClick = (id) => {
    setSelectedUserId(id);
    dispatch(getAppointmentsByUserIdAsync({ id }));
  };

  const handleBackClick = () => {
    if (selectedUserId) {
      setSelectedUserId(null);
    } else if (selectedCouncilorId) {
      setSelectedCouncilorId(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Councilor List</h2>
      </div>

      {!selectedCouncilorId ? (
        <CouncilorList
          councilors={councilors}
          handleCouncilorClick={handleCouncilorClick}
        />
      ) : !selectedUserId ? (
        <AssignedUsers
          users={councilorUsers}
          handleBackClick={handleBackClick}
          handleUserClick={handleUserClick}
        />
      ) : (
        <UserAppointments
          appointments={appointments}
          handleBackClick={handleBackClick}
        />
      )}

      <Pagination councilors={councilors} />
    </div>
  );
};

const CouncilorList = ({ councilors, handleCouncilorClick }) => (
  <>
    <table className="min-w-full">
      <thead className="bg-blue-50">
        <tr className="text-left border-b">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Mobile</th>
          <th className="py-2 px-4">Role</th>
          <th className="py-2 px-4"></th>
        </tr>
      </thead>
      <tbody>
        {councilors.length > 0 ? (
          councilors.map((user) => (
            <tr
              key={user._id}
              className="border-b hover:bg-gray-100"
              onClick={() => handleCouncilorClick(user._id)}
            >
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.mobile}</td>
              <td className="py-3 px-4">
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
                <button className="text-gray-600">
                  <BsThreeDots />
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
  </>
);

const AssignedUsers = ({ users, handleBackClick, handleUserClick }) => (
  <div className="mt-10">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold">Assigned Users</h3>
      <button
        onClick={handleBackClick}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        Back to Councilor List
      </button>
    </div>
    <table className="min-w-full mt-4">
      <thead className="bg-blue-50">
        <tr className="text-left border-b">
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Mobile</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
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

const UserAppointments = ({ appointments, handleBackClick }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");

  const handleApprove = (appointmentId, labId) => {
    console.log("Approve appointment:", appointmentId, "Lab:", labId);
    dispatch(
      approveAppointmentAsync({ appointmentId: appointmentId, labId: labId })
    );
  };

  const handleReject = (appointmentId, labId) => {
    console.log("Reject appointment:", appointmentId, "Lab:", labId);
    dispatch(
      rejectAppointmentAsync({ appointmentId: appointmentId, labId: labId })
    );
  };

  const filteredAppointments =
    filter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment?.labs?.status === filter
        );

  // Group appointments by lab
  const appointmentsByLab = filteredAppointments.reduce((acc, appointment) => {
    const labId = appointment?.labs?.lab?._id;
    if (!acc[labId]) {
      acc[labId] = {
        labInfo: appointment?.labs?.lab,
        appointments: [],
      };
    }
    acc[labId].appointments.push(appointment);
    return acc;
  }, {});

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">User Appointments</h3>
        <button
          onClick={handleBackClick}
          className="px-3 py-1 bg-gray-200 rounded-lg"
        >
          Back to Assigned Users
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md p-1"
        >
          <option value="All">All</option>
          <option value="Approve">Approved</option>
          <option value="Reject">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {Object.entries(appointmentsByLab).map(([labId, labData]) => (
        <div key={labId} className="mt-8 border-t pt-4">
          <h4 className="text-lg font-semibold mb-2">
            {labData.labInfo?.name}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {labData.labInfo?.address} | {labData.labInfo?.contactNumber}
          </p>
          <table className="min-w-full">
            <thead className="bg-blue-50">
              <tr className="text-left border-b">
                <th className="py-2 px-4">Appointment Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">User Name</th>
                <th className="py-2 px-4">Mobile</th>
                <th className="py-2 px-4">Problem</th>
                <th className="py-2 px-4">Tests</th>
                <th className="py-2 px-4">Created By</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labData.appointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4">
                    {new Date(
                      appointment?.appointmentDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{appointment?.status}</td>
                  <td className="py-3 px-4">{appointment?.createdBy.name}</td>
                  <td className="py-3 px-4">{appointment?.createdBy.mobile}</td>
                  <td className="py-3 px-4">{appointment?.problem}</td>
                  <td className="py-3 px-4">
                    {appointment?.labs.tests.map((test) => (
                      <div key={test._id}>
                        <span>
                          {test?.test?.name} ({test?.status})
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4">{appointment?.createdBy?.name}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleApprove(appointment._id, labId)}
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
                      onClick={() => handleReject(appointment._id, labId)}
                      className={`px-2 py-1 rounded-md ${
                        appointment?.status === "Approve" ||
                        appointment.status === "Reject"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-red-500 text-white"
                      }`}
                      disabled={
                        appointment?.status === "Approve" ||
                        appointment?.status === "Reject"
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const Pagination = ({ councilors }) => (
  <div className="mt-4 flex justify-between items-center">
    <p className="text-sm text-gray-600">
      {councilors.length} of {councilors.length} row(s) selected.
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
);

export default Councilor;
