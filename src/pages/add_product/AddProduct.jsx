import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "../../components/product/product_form/ProductForm";
import {
  createProduct,
  selectisLoading,
} from "../../redux/features/product/product_slice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

export default function AddProduct() {
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector(selectisLoading);

  const { name, category, quantity, price } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = `${letter}-${number}`;
    return sku;
  };

  const saveProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("sku", generateSKU(category));
    formData.append("description", description);
    formData.append("image", productImage);

    dispatch(createProduct(formData));
  };

  return (
    <div>
      <h3 className="--mt">Add new Product</h3>
      <div>
        <ProductForm
          isLoading={isLoading}
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          setDescription={setDescription}
          handleImageChange={handleImageChange}
          handleInputChange={handleInputChange}
          saveProduct={saveProduct}
        />
      </div>
    </div>
  );
}
