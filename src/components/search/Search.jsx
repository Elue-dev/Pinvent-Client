import React from "react";
import "./search.scss";
import { BiSearch } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ value, onChange, setSearch }) => {
  return (
    <div className="search --flex-center">
      <BiSearch size={18} className="icon" />
      <input
        type="text"
        placeholder="name or category"
        value={value}
        onChange={onChange}
      />
      {value && (
        <AiOutlineClose
          size={18}
          className="close"
          onClick={() => {
            setSearch("");
          }}
        />
      )}
    </div>
  );
};

export default Search;
