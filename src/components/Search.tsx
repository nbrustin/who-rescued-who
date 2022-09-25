import React, { useEffect, useState } from "react";
import {
  Form,
  InputGroup,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Animals from "./Animals";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import ReactPaginate from "react-paginate";
import { PostType } from "../api/api.interface";
import { Post } from "../api/api";

//default parameters
let token = "";
let limit = 20;
let animal = "dog";
let pageCount = 0;
let page = 1;

//params object
let queryParams: any = {
  limit: limit,
  page: page,
  type: animal,
};

const Search = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");

  useEffect(() => {
    Post.getAccess()
      .then((response: any) => {
        token = response.access_token;
        Post.getPosts(token, queryParams).then((data: any) => {
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
    page = event.selected + 1;
    queryParams.page = page;

    Post.getPosts(token, queryParams).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
    });
  };

  const handleSelect = (event: any) => {
    setLoading(true);

    console.log(event);
    animal = event;
    queryParams.type = event;
    Post.getPosts(token, queryParams).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
      setLoading(false);
    });
  };

  const handleSearchChange = (event: any) => {
    debugger;
    const searchValue = event.target.value;
    console.log(searchValue);

    setLocation(event.target.value);
  };

  const search = () => {
    //make api with location parameter
    console.log("location:", location);
    if (location !== "") {
      queryParams.location = location;
    } else {
      delete queryParams.location;
    }
    debugger;
    Post.getPosts(token, queryParams).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
    });
  };

  if (loading === true) {
    return <FadeLoader {...FadeLoaderProps} />;
  } else {
    return (
      <>
        <div className="row">
          <div className="col-md-2">
            <DropdownButton
              id="dropdown-basic-button"
              title={animal}
              onSelect={handleSelect}
              variant="success"
            >
              <Dropdown.Item eventKey="dog">Dog</Dropdown.Item>
              <Dropdown.Item eventKey="cat">Cat</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className="col-md-3">
            <InputGroup className="">
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={handleSearchChange}
              />
              <Button variant="success" onClick={search}>
                Search
              </Button>
            </InputGroup>
          </div>
        </div>

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
