import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createLab,
  updateLab,
  getAllLabs,
  deleteLab,
  createTest,
  updateTest,
  deleteTest,
} from "./labsAPI";

export const getAllLabsAsync = createAsyncThunk("labs/getAllLabs", async () => {
  try {
    const response = await getAllLabs();
    console.log("getAllLabs", response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const createLabAsync = createAsyncThunk(
  "labs/createLab",
  async (newLabData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log("labs", token);
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

const labSlice = createSlice({
  name: "labs",
  initialState: {
    labs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLabsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLabsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.labs = action.payload;
      })
      .addCase(getAllLabsAsync.rejected, (state, action) => {
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
      });
  },
});

export default labSlice.reducer;
