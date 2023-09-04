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

export const addUserToLocalStorage = (user: UserTypes) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("token");
  const token = result ? JSON.parse(result) : null;
  return token;
};
