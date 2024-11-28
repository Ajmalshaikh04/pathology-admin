import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllFranchises,
  createFranchise,
  updateFranchise,
  deleteFranchise,
  setCommissionForSelectedFranchises,
} from "./franchiseAPI";

export const getAllFranchisesAsync = createAsyncThunk(
  "franchise/getAllFranchise",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await getAllFranchises(headers, page, limit);
      console.log("getAllFranchise", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createFranchiseAsync = createAsyncThunk(
  "franchise/createFranchise",
  async (newFranchiseData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await createFranchise(newFranchiseData, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFranchiseAsync = createAsyncThunk(
  "franchise/updateFranchise",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await updateFranchise(updateData, id, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFranchiseAsync = createAsyncThunk(
  "franchise/deleteFranchise",
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await deleteFranchise(id, headers);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setCommissionForSelectedFranchisesAsync = createAsyncThunk(
  "franchises/setCommissionForSelected",
  async ({ franchiseIds, commissionPercentage }, { rejectWithValue }) => {
    try {
      const response = await setCommissionForSelectedFranchises(
        franchiseIds,
        commissionPercentage
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const franchiseSlice = createSlice({
  name: "franchise",
  initialState: {
    franchise: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      limit: 10,
    },
  },
  reducers: {
    setPaginationLimit: (state, action) => {
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFranchisesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFranchisesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.franchise = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllFranchisesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createFranchiseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFranchiseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.franchise.push(action.payload);
      })
      .addCase(createFranchiseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFranchiseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFranchiseAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.franchise.findIndex(
          (f) => f._id === action.payload._id
        );
        if (index !== -1) {
          state.franchise[index] = action.payload;
        }
      })
      .addCase(updateFranchiseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFranchiseAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFranchiseAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.franchise = state.franchise.filter(
          (f) => f._id !== action.meta.arg
        );
      })
      .addCase(deleteFranchiseAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setCommissionForSelectedFranchisesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        setCommissionForSelectedFranchisesAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          // Handle the successful commission update here
        }
      )
      .addCase(
        setCommissionForSelectedFranchisesAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { setPaginationLimit } = franchiseSlice.actions;
export default franchiseSlice.reducer;
