import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createAgent,
  deleteAgent,
  getAllAgents,
  getAllAgentsByFranchiseId,
  setCommissionForSelectedAgents,
  updateAgent,
} from "./agentsAPI";

export const getAllAgentsByFranchiseIdAsync = createAsyncThunk(
  "agents/getAllAgentsByFranchiseId",
  async ({ franchiseId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await getAllAgentsByFranchiseId(
        franchiseId,
        page,
        limit,
        headers
      );
      console.log("getAllAgentsByPinCode", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllAgentsAsync = createAsyncThunk(
  "agents/getAllAgents",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.user.token;
      const headers = { authorization: token };
      const response = await getAllAgents(headers, page, limit);
      console.log("getAllAgents", response);
      return response;
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

// Add a new async thunk for setting commissions
export const setCommissionForAgentsAsync = createAsyncThunk(
  "agents/setCommissionForAgents",
  async ({ agentIds, commissionPercentage }, { rejectWithValue }) => {
    try {
      const response = await setCommissionForSelectedAgents(
        agentIds,
        commissionPercentage
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const franchiseSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      limit: 10,
      totalPages: 1,
    },
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
      .addCase(getAllAgentsByFranchiseIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgentsByFranchiseIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllAgentsByFranchiseIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllAgentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAgentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllAgentsAsync.rejected, (state, action) => {
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
      })
      .addCase(setCommissionForAgentsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(setCommissionForAgentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        // state.agents = state.agents.map(
        //   (agent) =>
        //     action.payload.updatedAgents.find((a) => a._id === agent._id) ||
        //     agent
        // );
      })
      .addCase(setCommissionForAgentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default franchiseSlice.reducer;
