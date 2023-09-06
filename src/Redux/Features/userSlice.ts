"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signupThunk,
  loginThunk,
  getUserThunk,
  logoutThunk,
} from "../Thunks/userThunks";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  addUserToLocalStorage,
} from "../../app/utils/localstorage";

export type UserTypes = {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  password: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export type userStateTypes = {
  isLoading: boolean;
  user: UserTypes | null;
  error: boolean | null;
};

export const userSignup = createAsyncThunk("user/signup", signupThunk);
export const userLogin = createAsyncThunk("user/login", loginThunk);
export const userDetails = createAsyncThunk("user/details", getUserThunk);
export const userLogout = createAsyncThunk("user/logout", logoutThunk);

const initialState: userStateTypes = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      addUserToLocalStorage(action.payload.data);
    });
    builder.addCase(userSignup.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      addUserToLocalStorage(action.payload.data);
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(userDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
    });
    builder.addCase(userDetails.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      state.isLoading = false;
    });
    builder.addCase(userLogout.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { clearError } = userSlice.actions;

export default userSlice.reducer;
