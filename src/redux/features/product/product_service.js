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

const productService = {
  // createProduct,
  // getAllProducts,
};

export default productService;
