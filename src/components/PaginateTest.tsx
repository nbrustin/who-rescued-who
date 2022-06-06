import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import PaginateTestCars from "./PaginateTestCars";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";

const cars = ["audi", "ford", "honda"];

const PaginateTest = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  const FadeLoaderProps = {
    // make sure all required component's inputs/Props keys&types match
    css: override,
    size: 500
  };

  const handlePageClick = (event: any) => {
    setLoading(true);
    setItemIndex(event.selected);
    setLoading(false);
  };
  if (loading === true) {
    return <FadeLoader {...FadeLoaderProps} />;
  } else {
    return (
      <>
        <PaginateTestCars cars={cars} itemIndex={itemIndex} />
        {/* {items.map((item, index) => {
        debugger;
        if (index === itemIndex) {
          return item;
        }
      })} */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={20}
          previousLabel="< previous"
          containerClassName={"pagination"}
          activeClassName={"active"}
          activeLinkClassName={"active"}
          // renderOnZeroPageCount={null}
        />
        ;
      </>
    );
  }
};

export default PaginateTest;
