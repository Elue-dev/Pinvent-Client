import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ProductForm from "../../components/product/product_form/ProductForm";
import { getUserToken } from "../../redux/features/auth/auth_slice";
import {
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../../redux/features/product/product_service";

export default function EditProduct() {
  const [loading, setLoading] = useState(false);
  const { prodId } = useParams();
  const token = useSelector(getUserToken);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const prod = await getSingleProduct(token, prodId);
        setProduct(prod.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  useEffect(() => {
    setImagePreview(
      product && product.image ? `${product.image.filePath}` : null
    );
    setDescription(product && product.description ? product.description : "");
  }, [product]);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", product?.name);
      formData.append("category", product?.category);
      formData.append("quantity", product?.quantity);
      formData.append("price", product?.price);
      formData.append("description", description);
      if (productImage) {
        formData.append("image", productImage);
      }

      const res = await updateProduct(formData, token, prodId, product?.name);
      await getAllProducts(token);

      res ? navigate("/dashboard") : null;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // setLoading(false);
  };

  if (!product) {
    return (
      <div className="loader">
        <ClipLoader
          color={"rgba(14, 16, 30, 0.937)"}
          loading={true}
          size={50}
        />
      </div>
    );
  }

  return (
    <div>
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        loading={loading}
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
  );
}
