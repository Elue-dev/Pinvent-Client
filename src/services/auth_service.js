import axios from "axios";
import { showAlert } from "../utils/alert/Alert";

export const server_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${server_url}/api/v1/users/signup`,
      userData
    );
    if (response?.data.status === "success") {
      showAlert("success", "Registration successful");
    }
    return response.data;
  } catch (error) {
    showAlert("error", error.response?.data.message);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${server_url}/api/v1/users/login`,
      userData
    );
    if (response?.data.status === "success") {
      showAlert("success", "Login successful");
    }
    return response.data;
  } catch (error) {
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const logoutUser = async () => {
  try {
    await axios.get(`${server_url}/api/v1/users/logout`);
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(
      `${server_url}/api/v1/users/forgot-password`,
      userData
    );
    showAlert("success", response.data.message);
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const resetPassword = async (userData, token) => {
  try {
    const response = await axios.put(
      `${server_url}/api/v1/users/reset-password/${token}`,
      userData
    );
    if (response?.data.status === "success") {
      showAlert("success", "Successful. Please login");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${server_url}/api/v1/users/login-status`);
    return response.data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${server_url}/api/v1/users/get-me`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const updateProfile = async (token, formData) => {
  try {
    const response = await axios.patch(
      `${server_url}/api/v1/users/update-me`,
      formData,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response?.data.status === "success") {
      showAlert("success", "Profile updated successfully");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const updatePassword = async (token, credentials) => {
  try {
    const response = await axios.patch(
      `${server_url}/api/v1/users/update-password`,
      credentials,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response?.data.status === "success") {
      showAlert("success", "Password updated successfully");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    showAlert("error", error.response?.data.message || error.message);
  }
};
