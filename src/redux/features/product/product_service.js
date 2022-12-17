import axios from "axios";
import { showAlert } from "../../../utils/alert/Alert";

const server_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export const createProduct = async (formData, token) => {
  try {
    const response = await axios.post(
      `${server_url}/api/v1/products`,
      formData,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response?.data.status === "success") {
      showAlert("success", "Product added successfully!");
    }
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
    showAlert("error", error.response?.data.message || error.message);
  }
};

export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`${server_url}/api/v1/products`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
    showAlert("error", error.response?.data.message || error.message);
  }

  return response.data;
};

export const deleteProduct = async (token, prodId, prodName) => {
  try {
    const response = await axios.delete(
      `${server_url}/api/v1/products/${prodId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response?.data.status === "success") {
      showAlert("success", `${prodName} has been deleted`);
    }
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
    showAlert("error", error.response?.data.message || error.message);
  }

  return response.data;
};

export const getSingleProduct = async (token, prodId) => {
  try {
    const response = await axios.get(
      `${server_url}/api/v1/products/${prodId}`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
    showAlert("error", error.response?.data.message || error.message);
  }

  return response.data;
};

export const updateProduct = async (formData, token, prodId, prodName) => {
  try {
    const response = await axios.patch(
      `${server_url}/api/v1/products/${prodId}`,
      formData,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    if (response?.data.status === "success") {
      showAlert("success", `${prodName} successfully updated`);
    }
    return response.data;
  } catch (error) {
    console.log(error.response?.data.message || error.message);
    showAlert("error", error.response?.data.message || error.message);
  }

  return response.data;
};

const productService = {
  // createProduct,
  // getAllProducts,
};

export default productService;
