import axios from "axios";
import { showAlert } from "../../../utils/alert/Alert";

const server_url = import.meta.env.VITE_REACT_APP_SERVER_URL;

const createProduct = async (formData) => {
  const response = await axios.post(`${server_url}/api/v1/products`, formData);
  return response.data;
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${server_url}/api/v1/products`);
    return response.data;
  } catch (error) {
    showAlert("error", error.response?.data.message || error.message);
  }

  return response.data;
};

const productService = {
  createProduct,
  // getAllProducts,
};

export default productService;
