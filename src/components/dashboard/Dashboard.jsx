// import { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
// import ProductSummary from "../../components/product/productSummary/ProductSummary";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/auth_slice";
// import { getProducts } from "../../redux/features/product/productSlice";

import { getUser } from "../../redux/features/auth/auth_slice";
import { getProducts } from "../../redux/features/product/product_slice";
import ProductList from "../product/product_list/ProductList";
import ProductSummary from "../product/product_summary/ProductSummary";

export default function Dashboard() {
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  // console.log(user);

  useEffect(() => {
    !isLoggedIn && dispatch(getProducts());

    // console.log(products);

    if (isError) {
      // console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  );
}
