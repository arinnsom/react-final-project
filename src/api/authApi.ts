import { axiosInstance } from "./axiosInstance";

interface RegisterData {
  email: string;
  name: string;
  surname: string;
  password?: string;
}

export const loginUser = async (credentials: {
  email: string;
  password?: string;
}) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (data: RegisterData) => {
  const response = await axiosInstance.post("/user", data);
  return response.data;
};
