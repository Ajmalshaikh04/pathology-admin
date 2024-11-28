import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createLab,
  updateLab,
  getAllLabs,
  deleteLab,
  createTest,
  updateTest,
  deleteTest,
  getLabAppointmentsInProgress,
} from "./labsAPI";
import axiosInstance from "../../../api/axiosInstance";

export const getAllLabsAsync = createAsyncThunk(
  "labs/getAllLabs",
  async ({ page = 1, limit = 10 }) => {
    try {
      const response = await getAllLabs(page, limit);
      console.log("getAllLabs", response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
export const getLabAppointmentsInProgressAsync = createAsyncThunk(
  "labs/getLabAppointmentsInProgress",
  async ({ labId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await getLabAppointmentsInProgress(labId, page, limit);
      console.log(response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createLabAsync = createAsyncThunk(
  "labs/createLab",
  async (newLabData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      console.log(newLabData);
      const headers = { authorization: token };
      const response = await createLab(newLabData, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateLabAsync = createAsyncThunk(
  "labs/updateLab",
  async ({ id, labData }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      const headers = { authorization: token };
      const response = await updateLab(id, labData, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteLabAsync = createAsyncThunk(
  "labs/deleteLab",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      const headers = { authorization: token };
      const response = await deleteLab(id, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const createTestAsync = createAsyncThunk(
  "labs/createTest",
  async (newTestData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      const headers = { authorization: token };
      const response = await createTest(newTestData, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateTestAsync = createAsyncThunk(
  "labs/updateTest",
  async (newTestData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      const headers = { authorization: token };
      const response = await updateTest(newTestData, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteTestAsync = createAsyncThunk(
  "labs/deleteTest",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
      const headers = { authorization: token };
      const response = await deleteTest(id, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define the async thunk
export const fetchLabTestCategories = createAsyncThunk(
  "labs/fetchLabTestCategories",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/lab-test?page=${page}&limit=${limit}`
      );
      if (response.data && response.data.data) {
        return response.data;
      } else {
        throw new Error("Server returned unexpected response format");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for uploading report
export const uploadReportAsync = createAsyncThunk(
  "labs/uploadReport",
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/reports", reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Define the async thunk
export const fetchReportByAppointmentIdAsync = createAsyncThunk(
  "labs/fetchReportByAppointmentId",
  async (appointmentId) => {
    const response = await axiosInstance.get(`/reports/${appointmentId}`);
    return response;
  }
);
// Define the async thunk
export const updateReportByAppointmentIdAsync = createAsyncThunk(
  "labs/UpdateUploadReport",
  async ({ reportId, reportData }) => {
    const response = await axiosInstance.put(
      `/reports/${reportId}`,
      reportData
    );
    return response;
  }
);

export const deleteReportByIdAsync = createAsyncThunk(
  "labs/deleteReportById",
  async (reportId) => {
    await axiosInstance.delete(`/reports/${reportId}`);
    return reportId;
  }
);

// API call to toggle handleView
export const toggleHandleViewAsync = createAsyncThunk(
  "labs/toggleHandleView",
  async (labId, thunkAPI) => {
    const { token } = thunkAPI.getState().user;
    const headers = { authorization: token };
    const response = await axiosInstance.put(
      `/toggle-handle-view/${labId}`,
      null,
      { headers }
    );
    return response.data;
  }
);

const labSlice = createSlice({
  name: "labs",
  initialState: {
    labs: [],
    labTestCategories: [],
    loading: false,
    error: null,
    report: null,
    pagination: {
      currentPage: 1,
      limit: 10,
      totalLabs: 0,
      totalPages: 1,
    },
  },
  reducers: {
    setLabTestCategories(state, action) {
      state.labTestCategories = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLabsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLabsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          limit: action.payload.pagination.limit,
          totalLabs: action.payload.totalLabs,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(getAllLabsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLabAppointmentsInProgressAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLabAppointmentsInProgressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = action.payload.data;
        state.pagination = {
          currentPage: action.payload.currentPage,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(getLabAppointmentsInProgressAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLabAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLabAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.labs.push(action.payload);
      })
      .addCase(createLabAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLabAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLabAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.labs.findIndex(
          (lab) => lab._id === action.payload.data?._id
        );
        if (index !== -1) {
          state.labs[index] = action.payload?.data;
        }
      })
      .addCase(updateLabAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteLabAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLabAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = state.labs.filter((lab) => lab?._id !== action.payload);
      })
      .addCase(deleteLabAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchLabTestCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabTestCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.labTestCategories = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchLabTestCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadReportAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadReportAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the state update after successful upload
        // e.g., updating the lab state with the new report
      })
      .addCase(uploadReportAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReportByAppointmentIdAsync.pending, (state) => {
        state.loading = false;
      })
      .addCase(fetchReportByAppointmentIdAsync.fulfilled, (state, action) => {
        state.report = action.payload;
      })
      .addCase(fetchReportByAppointmentIdAsync.rejected, (state, action) => {
        // Handle errors
        console.error("Failed to fetch report:", action.error);
      })
      .addCase(updateReportByAppointmentIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReportByAppointmentIdAsync.fulfilled, (state, action) => {
        state.report = action.payload;
        state.loading = false;
      })
      .addCase(updateReportByAppointmentIdAsync.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to update report:", action.error);
      })
      .addCase(deleteReportByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReportByIdAsync.fulfilled, (state, action) => {
        state.report = null;
        state.loading = false;
      })
      .addCase(deleteReportByIdAsync.rejected, (state, action) => {
        state.loading = false;
        console.error("Failed to delete report:", action.error);
      })
      .addCase(toggleHandleViewAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleHandleViewAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLab = action.payload;
        state.labs = state?.labs.map((lab) =>
          lab?._id === updatedLab?._id ? updatedLab : lab
        );
      })
      .addCase(toggleHandleViewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setLabTestCategories, setLoading, setError } = labSlice.actions;

export default labSlice.reducer;
