import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAgent,
  deleteAgent,
  getAllAgentsByPinCode,
  updateAgent,
} from "./agentsAPI";

export const getAllAgentsByPinCodeAsync = createAsyncThunk(
  "agents/getAllAgents",
  async (pinCode, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token;
      // Use pinCode from argument if provided, otherwise fallback to state
      const effectivePinCode = state.user.pinCode || pinCode;

      if (!effectivePinCode) {
        throw new Error("PinCode is required");
      }

      console.log("effectivePinCode", effectivePinCode);
      const headers = { authorization: token };
      const response = await getAllAgentsByPinCode(effectivePinCode, headers);
      console.log("getAllAgents", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createAgentAsync = createAsyncThunk(
  "agents/createAgent",
  async ({ newData }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await createAgent(newData, headers);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAgentAsync = createAsyncThunk(
  "agents/deleteAgent",
  async ({ agentId }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await deleteAgent(agentId, headers);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAgentAsync = createAsyncThunk(
  "agents/updateAgent",
  async ({ agentId, updatedData }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await updateAgent(agentId, updatedData, headers);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const franchiseSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAgentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agents.push(action.payload);
      })
      .addCase(createAgentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAgentsByPinCodeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgentsByPinCodeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(getAllAgentsByPinCodeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAgentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAgentAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = state.agents.filter(
          (agent) => agent._id !== action.meta.arg.agentId
        );
      })
      .addCase(deleteAgentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAgentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgentAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.agents.findIndex(
          (agent) => agent._id === action.meta.arg.agentId
        );
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
      })
      .addCase(updateAgentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default franchiseSlice.reducer;
