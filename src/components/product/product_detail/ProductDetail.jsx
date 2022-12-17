import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "../../card/Card";
import "./ProductDetail.scss";
import DOMPurify from "dompurify";
import { getSingleProduct } from "../../../redux/features/product/product_service";
import { getUserToken } from "../../../redux/features/auth/auth_slice";
import { ClipLoader } from "react-spinners";
import "./productDetail.scss";

const ProductDetail = () => {
  const [product, setProduct] = useState([]);
  const { prodId } = useParams();

  const token = useSelector(getUserToken);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className=" --color-primary">Out Of Stock</span>;
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const prod = await getSingleProduct(token, prodId);
        setProduct(prod);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, []);

  if (!product.data) {
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

  const {
    category,
    createdAt,
    updatedAt,
    description,
    image,
    name,
    price,
    sku,
    quantity,
  } = product?.data;

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass="card">
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {image ? (
                <img src={image.filePath} alt={image.fileName} />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {price * quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {new Date(createdAt).toDateString()}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {new Date(updatedAt).toDateString()}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;
