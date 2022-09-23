import React, { useEffect, useState, useRef } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Animals from "./Animals";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import ReactPaginate from "react-paginate";
import { PostType } from "../api/api.interface";
import { Post } from "../api/api";

let access = "";
let animal = "dog";
let pageCount = 0;
let currentPage = 1;

const Search = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Post.getAccess()
      .then((response: any) => {
        access = response.access_token;
        Post.getPosts(1, animal, access).then((data: any) => {
          pageCount = data.pagination.total_pages;
          setPosts(data.animals);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log("errorr");
      });
    return () => {};
  }, []);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const FadeLoaderProps = {
    css: override,
    size: 500,
  };

  const handlePageClick = async (event: any) => {
    const currentPage = event.selected + 1;

    Post.getPosts(currentPage, animal, access).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
    });
  };

  const handleSelect = (event: any) => {
    console.log(event);
    animal = event;
    Post.getPosts(currentPage, animal, access).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
      setLoading(false);
    });
  };

  if (loading === true) {
    return <FadeLoader {...FadeLoaderProps} />;
  } else {
    return (
      <>
        <DropdownButton
          id="dropdown-basic-button"
          title="Animal"
          onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="dog">Dog</Dropdown.Item>
          <Dropdown.Item eventKey="cat">Cat</Dropdown.Item>
        </DropdownButton>

        <Animals posts={posts} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          containerClassName={"pagination"}
          activeClassName={"active"}
          activeLinkClassName={"active"}
        />
      </>
    );
  }
};
export default Search;
