import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser, getUserToken } from "../../redux/features/auth/auth_slice";
import { getAllProducts } from "../../redux/features/product/product_service";
import ProductList from "../product/product_list/ProductList";
import ProductSummary from "../product/product_summary/ProductSummary";

export default function Dashboard() {
  const token = useSelector(getUserToken);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(token);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={loading} />
    </div>
  );
}
