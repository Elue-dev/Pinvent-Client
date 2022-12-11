// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
// import ProductSummary from "../../components/product/productSummary/ProductSummary";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
// import { getProducts } from "../../redux/features/product/productSlice";

import { getUser } from "../../redux/features/auth/auth_slice";
import { getAllProducts } from "../../redux/features/product/product_service";
import ProductList from "../product/product_list/ProductList";
import ProductSummary from "../product/product_summary/ProductSummary";

export default function Dashboard() {
  const user = useSelector(getUser);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(user);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
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
