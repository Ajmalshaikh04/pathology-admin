import axiosInstance from "../../../api/axiosInstance";

const getAllAppointments = async (headers) => {
  return await axiosInstance.get("/get-all-appointments", {
    headers: headers,
  });
};
const getAppointmentsByUserId = async (userId, headers) => {
  return await axiosInstance.get(`/appointments/user/${userId}`, {
    headers: headers,
  });
};
const approveAppointment = async (appointmentId, labId, headers) => {
  return await axiosInstance.put(
    `/appointments/${appointmentId}/labs/${labId}/approve`,
    {},
    { headers }
  );
};

const rejectAppointment = async (appointmentId, labId, headers) => {
  return await axiosInstance.put(
    `/appointments/${appointmentId}/labs/${labId}/reject`,
    {},
    { headers }
  );
};

const updateLabTestStatus = async (
  appointmentId,
  testId,
  status,
  updatedBy,
  headers
) => {
  return await axiosInstance.put(
    `/appointments/${appointmentId}/tests/${testId}`,
    { status, updatedBy },
    { headers }
  );
};
const updateAppointmentCommission = async (
  appointmentId,
  commission,
  headers
) => {
  return await axiosInstance.patch(
    `/appointments/${appointmentId}/commission`,
    { appointmentId, commission },
    { headers }
  );
};

export {
  getAllAppointments,
  getAppointmentsByUserId,
  approveAppointment,
  rejectAppointment,
  updateLabTestStatus,
  updateAppointmentCommission,
};
