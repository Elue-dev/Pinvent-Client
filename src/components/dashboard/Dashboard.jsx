// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ProductList from "../../components/product/productList/ProductList";
// import ProductSummary from "../../components/product/productSummary/ProductSummary";
// import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
// import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
// import { getProducts } from "../../redux/features/product/productSlice";

import { useSelector } from "react-redux";
import {
  getUser,
  selectIsLoggedIn,
} from "../../redux/features/auth/auth_slice";

export default function Dashboard() {
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <h4>Dashboard</h4>
    </div>
  );
}
