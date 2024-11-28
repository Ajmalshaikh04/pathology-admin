import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";

const LabBoyAppointments = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch appointments when component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(
          `/get-all-appointments-by-lab-boy-id/${user}`
        );
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      }
    };

    fetchAppointments();
  }, [user]);

  useEffect(() => {
    // Filter appointments based on search term
    const filterAppointments = () => {
      if (searchTerm.trim() === "") {
        setFilteredAppointments(appointments);
      } else {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = appointments.filter(
          (appointment) =>
            appointment?.createdBy?.name
              ?.toLowerCase()
              .includes(lowercasedSearchTerm) ||
            appointment?.createdBy?.email
              ?.toLowerCase()
              .includes(lowercasedSearchTerm) ||
            appointment?.problem?.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredAppointments(filtered);
      }
    };

    filterAppointments();
  }, [searchTerm, appointments]);

  const handleAppointmentClick = (appointment) => {
    // Implement your logic for handling appointment clicks
    console.log("Appointment clicked:", appointment);
    navigate("/bookings/view", { state: { appointment } });
  };

  const handleAppointmentDetails = (appointment) => {
    navigate("/bookings-details", { state: { appointment } });
  };

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
              <th className="px-4 py-2 border-b">Details</th>
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
                  <button
                    onClick={() => handleAppointmentClick(appointment)}
                    className="text-blue-500 hover:underline"
                  >
                    View Status
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
      ) : (
        <div className="text-center text-gray-500">No appointments found</div>
      )}
    </div>
  );
};

export default LabBoyAppointments;
