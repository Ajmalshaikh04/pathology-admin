import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  register,
  signInAdmin,
  getAllUsers,
  signOutAdmin,
  getAllCouncilors,
  assignCouncilors,
  getAllAssignedUsersByCounselorId,
  deleteUserById,
} from "./userAPI";

const TOKEN_KEY = "userToken";
const USER_KEY = "userData";
const USER_ID = "userId";

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
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;

      const headers = { authorization: token };
      const response = await getAllUsers(headers, page, limit);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);
export const getAllCouncilorsAsync = createAsyncThunk(
  "user/getAllCouncilors",
  async ({ page, limit }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;

      const headers = { authorization: token };
      const response = await getAllCouncilors(headers, page, limit);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const signOutAdminAsync = createAsyncThunk(
  "user/signOutAdmin",
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;

      const headers = { authorization: token };
      const response = await signOutAdmin(headers);
      console.log(response);
      return response;
    } catch (error) {
      return error.message;
    }
  }
);

export const assignCouncilorsAsync = createAsyncThunk(
  "user/assignCouncilors",
  async ({ userId, counselorId }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await assignCouncilors(userId, counselorId, headers);
      console.log(response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const getAllAssignedUsersByCounselorIdAsync = createAsyncThunk(
  "user/getAllAssignedUsersByCounselorId",
  async ({ counselorId, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await getAllAssignedUsersByCounselorId(
        counselorId,
        page,
        limit,
        headers
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const deleteUserByIdAsync = createAsyncThunk(
  "user/deleteUserById",
  async ({ id }, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().user;
      const headers = { authorization: token };
      const response = await deleteUserById(id, headers);
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
    user: localStorage.getItem(USER_ID) || null,
    users: [],
    councilors: [],
    councilorUsers: [],
    role: JSON.parse(localStorage.getItem(USER_KEY)) || null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      limit: 10,
      totalPages: 1,
    },
  },
  reducers: {},
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
        state.token = action.payload?.token;
        if (action.payload?.token) {
          const decodedToken = jwtDecode(action.payload.token);
          state.user = decodedToken._id;
          state.role = decodedToken.role;

          localStorage.setItem(TOKEN_KEY, action.payload.token);
          localStorage.setItem(USER_ID, decodedToken._id);
          localStorage.setItem(USER_KEY, JSON.stringify(decodedToken.role));
        }
      })
      .addCase(signInAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.token = null;
        state.pinCode = null;
      })
      .addCase(getAllUsersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCouncilorsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCouncilorsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.councilors = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          limit: action.payload.pagination.limit,
          totalPages: action.payload.pagination.totalPages,
          totalUsers: action.payload.totalUsers,
        };
      })
      .addCase(getAllCouncilorsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOutAdminAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.token = null;
          state.isAuthenticated = false;
          state.user = null;
          state.role = null;
          state.pinCode = null;
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          localStorage.removeItem(USER_ID);
        }
      })
      .addCase(signOutAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllAssignedUsersByCounselorIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAssignedUsersByCounselorIdAsync.fulfilled,
        (state, action) => {
          state.loading = false;
          state.councilorUsers = action.payload;
        }
      )
      .addCase(
        getAllAssignedUsersByCounselorIdAsync.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
    builder.addCase(deleteUserByIdAsync.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
  },
});

export default userSlice.reducer;
