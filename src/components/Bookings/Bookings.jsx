import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import UserView from "./UserView";
import { getAllAppointmentsAsync } from "../../store/features/appoinments/appoinmentsSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = () => dispatch(getAllAppointmentsAsync());
    fetchAppointments();
    const intervalId = setInterval(fetchAppointments, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  const filterAppointments = useCallback(() => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment?.user?.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment?.user?.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment?.problem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  useEffect(() => {
    filterAppointments();
  }, [filterAppointments]);

  const handleAppointmentClick = (appointment) => {
    navigate("/bookings/view", { state: { appointment } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white p-10 rounded-lg shadow-md mt-10 w-full min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Booking Management</h2>
      </div>
      <UserView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredAppointments={filteredAppointments}
        handleAppointmentClick={handleAppointmentClick}
      />
    </div>
  );
};

export default Bookings;
