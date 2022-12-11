import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import "./productSummary.scss";
import InfoBox from "../../info_box/InfoBox";

import { useEffect } from "react";
import {
  CALC_CAREGORIES,
  CALC_OUT_OF_STOCK,
  CALC_STORE_VALUE,
  selectCategories,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/product_slice";

const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

export default function ProductSummary({ products }) {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE({ products: products?.data }));
    dispatch(CALC_OUT_OF_STOCK({ products: products?.data }));
    dispatch(CALC_CAREGORIES({ products: products?.data }));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.data?.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$ ${new Intl.NumberFormat().format(
            totalStoreValue.toFixed(2)
          )} `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={categories}
          bgColor="card4"
        />
      </div>
    </div>
  );
}
