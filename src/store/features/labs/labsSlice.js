import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createLab, getAllLabs } from "./labsAPI";

export const getAllLabsAsync = createAsyncThunk("labs/getAllLabs", async () => {
  try {
    const response = await getAllLabs();
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
      });
  },
});

export default labSlice.reducer;
