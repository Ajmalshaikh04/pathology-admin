import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  approveAppointment,
  getAllAppointments,
  getAppointmentsByUserId,
  rejectAppointment,
  updateLabTestStatus,
  updateAppointmentCommission,
} from "./appoinmentsAPI";

export const getAllAppointmentsAsync = createAsyncThunk(
  "appointments/getAllAppointments",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await getAllAppointments(headers);
      console.log("Appointments", response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const getAppointmentsByUserIdAsync = createAsyncThunk(
  "appointments/getAppointmentsByUserId",
  async ({ id }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await getAppointmentsByUserId(id, headers);
      console.log("Appointments", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const approveAppointmentAsync = createAsyncThunk(
  "appointments/approve",
  async ({ appointmentId, labId }, thunkAPI) => {
    const { token } = thunkAPI.getState().user;
    const headers = { authorization: token };
    const response = await approveAppointment(appointmentId, labId, headers);
    return response.data;
  }
);
export const rejectAppointmentAsync = createAsyncThunk(
  "appointments/reject",
  async ({ appointmentId, labId }, thunkAPI) => {
    const { token } = thunkAPI.getState().user;
    const headers = { authorization: token };
    const response = await rejectAppointment(appointmentId, labId, headers);
    return response.data;
  }
);

export const updateLabTestStatusAsync = createAsyncThunk(
  "appointments/updateLabTestStatus",
  async ({ appointmentId, testId, status, updatedBy }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await updateLabTestStatus(
        appointmentId,
        testId,
        status,
        updatedBy,
        headers
      );
      return {
        _id: appointmentId,
        testId: testId,
        status: status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAppointmentCommissionAsync = createAsyncThunk(
  "appointments/updateCommission",
  async ({ appointmentId, commission }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await updateAppointmentCommission(
        appointmentId,
        commission,
        headers
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const labSlice = createSlice({
  name: "labs",
  initialState: {
    appointments: [],
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAppointmentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAllAppointmentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAppointmentsByUserIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointmentsByUserIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointmentsByUserIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveAppointmentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAppointment = action.payload?.appointment;
        const index = state.appointments.findIndex(
          (app) => app._id === updatedAppointment?._id
        );
        if (index !== -1) {
          state.appointments[index] = updatedAppointment;
        }
      })
      .addCase(approveAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rejectAppointmentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectAppointmentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAppointment = action.payload?.appointment;
        const index = state.appointments.findIndex(
          (app) => app._id === updatedAppointment?._id
        );
        if (index !== -1) {
          state.appointments[index] = updatedAppointment;
        }
      })
      .addCase(rejectAppointmentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLabTestStatusAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLabTestStatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAppointment = action.payload;
        const index = state.appointments.findIndex(
          (app) => app._id === updatedAppointment._id
        );
        if (index !== -1) {
          // Update the specific test within the appointment
          state.appointments[index] = {
            ...state.appointments[index],
            labs: {
              ...state.appointments[index].labs,
              tests: state.appointments[index].labs.tests.map((test) =>
                test._id === updatedAppointment.testId
                  ? { ...test, status: updatedAppointment.status }
                  : test
              ),
            },
          };
        }
      })
      .addCase(updateLabTestStatusAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAppointmentCommissionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentCommissionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (app) => app._id === action.payload._id
        );
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(updateAppointmentCommissionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.message
          : "Failed to update commission";
      });
  },
});

export default labSlice.reducer;
