import customFetch from "@/app/utils/axios";

export type signupUserTypes = {
  name: string;
  email: string;
  password: string;
};
export type loginUserTypes = {
  email: string;
  password: string;
};

export const signupThunk = async (user: signupUserTypes, thunkAPI: any) => {
  try {
    const resp = await customFetch.post("/user/signup", user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginThunk = async (user: loginUserTypes, thunkAPI: any) => {
  try {
    const resp = await customFetch.post("/user/login", user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getUserThunk = async (id: string, thunkAPI: any) => {
  try {
    const resp = await customFetch.get(`/user/${id}`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const logoutThunk = async (_: any, thunkAPI: any) => {
  try {
    const resp = await customFetch.get("/user/logout");
    return resp.data.message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
