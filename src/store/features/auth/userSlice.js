import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register, signInAdmin, getAllUsers } from "./userAPI";

const TOKEN_KEY = "userToken";

export const registerUserAsync = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    try {
      const response = await register(userData);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
export const signInAdminAsync = createAsyncThunk(
  "user/signInUser",
  async (userData) => {
    try {
      const response = await signInAdmin(userData);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      console.log(token);
      const headers = { authorization: token };
      const response = await getAllUsers(headers);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
    token: localStorage.getItem(TOKEN_KEY),
    user: null,
    dashboardId: null,
    users: [],
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem(TOKEN_KEY);
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
        localStorage.setItem(TOKEN_KEY, action.payload?.token);
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signInAdminAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.role = action.payload?.role;
        state.token = action.payload?.token;
        localStorage.setItem(TOKEN_KEY, action.payload?.token);
      })
      .addCase(signInAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
