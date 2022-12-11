import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Search from "../../search/Search";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import "./productList.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filter_slice";

export default function ProductList({ products, isLoading }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  if (isLoading) {
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

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  // pagination start
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredProducts?.length;
    setItemOffset(newOffset);
  };
  //  pagination end

  useEffect(() => {
    dispatch(
      FILTER_PRODUCTS({
        products: products.data,
        search,
      })
    );
  }, [dispatch, products, search]);

  return (
    <div className="product-list">
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          {search && (
            <p>
              <b>
                {filteredProducts?.length}{" "}
                {filteredProducts?.length === 1 ? "result" : "results"} for '
                <em className="--color-primary">{search} </em>'
              </b>
            </p>
          )}
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              setSearch={setSearch}
            />
          </span>
        </div>
        <div className="table">
          {!isLoading && products.results === 0 ? (
            <p>No Product Found. Please add a product.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name)}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${price * quantity}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-product/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
}
