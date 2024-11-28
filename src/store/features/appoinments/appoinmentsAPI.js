import axiosInstance from "../../../api/axiosInstance";

const getAllAppointments = async (headers, page = 1, limit = 10) => {
  return await axiosInstance.get(
    `/get-all-appointments?page=${page}&limit=${limit}`,
    {
      headers: headers,
    }
  );
};
const getAppointmentsByUserId = async (userId, headers) => {
  return await axiosInstance.get(`/appointments/user/${userId}`, {
    headers: headers,
  });
};
const getAppointmentsByAgentsId = async (agentId, headers, page, limit) => {
  return await axiosInstance.get(
    `/appointments/${agentId}?page=${page}&limit=${limit}`,
    {
      headers: headers,
    }
  );
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

const deleteAppointment = (id, headers) => {
  return axiosInstance.delete(`appointment/${id}`, {
    headers: headers,
  });
};

export {
  getAllAppointments,
  getAppointmentsByUserId,
  approveAppointment,
  rejectAppointment,
  updateLabTestStatus,
  updateAppointmentCommission,
  getAppointmentsByAgentsId,
  deleteAppointment,
};
