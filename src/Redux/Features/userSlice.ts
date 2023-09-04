import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "@/utils/localstorage";

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
};

const initialState: userStateTypes = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      removeUserFromLocalStorage();
      state.user = null;
    },
  },
});

export default userSlice.reducer;
