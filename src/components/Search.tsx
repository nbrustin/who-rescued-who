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
import styles from "./search.module.css";

//default parameters
let token = "";
let limit = 20;
let animal = "dog";
let sort = "distance";
let pageCount = 0;
let page = 1;

type queryParamsType = {
  limit: number;
  page: number;
  type: string;
  location?: string;
  sort?: string;
};

//params object
let queryParams: queryParamsType = {
  limit: limit,
  page: page,
  type: animal,
};

const sortByKeys: { [key: string]: string } = {
  distance: "Closest",
  "-distance": "Furthest",
  recent: "Newest",
  "-recent": "Oldest",
  random: "random",
};

const Search = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");

  useEffect(() => {
    Post.getAccess()
      .then((response: any) => {
        token = response.access_token;
        debugger;
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

  const getPosts = () => {
    debugger;
    setLoading(true);
    Post.getPosts(token, queryParams).then((data: any) => {
      pageCount = data.pagination.total_pages;
      setPosts(data.animals);
      setLoading(false);
    });
  };

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
    getPosts();
  };

  const handleAnimalTypeSelect = (event: any) => {
    animal = event;
    queryParams.type = event;
    getPosts();
  };

  const handleSortBySelect = (event: any) => {
    //only allow sort if there is a valid location
    if (queryParams.location !== undefined) {
      sort = event;
      queryParams.sort = event;
      getPosts();
    }
  };

  const handleSearchChange = (event: any) => {
    const searchValue = event.target.value;
    console.log(searchValue);
    setLocation(event.target.value);
  };

  const search = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (location !== "") {
      queryParams.location = location;
      //add sort to query params
      queryParams.sort = sort;
    } else {
      delete queryParams.location;
      delete queryParams.sort;
    }
    getPosts();
  };

  return (
    <>
      <div className={`row ${styles.backgroundBanner}`}>
        <div className="col-lg-1">
          <DropdownButton
            id="dropdown-basic-button"
            title={animal}
            onSelect={handleAnimalTypeSelect}
            variant="outline-light"
          >
            <Dropdown.Item eventKey="dog">Dog</Dropdown.Item>
            <Dropdown.Item eventKey="cat">Cat</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-lg-3">
          <form onSubmit={search}>
            <InputGroup className="">
              <Form.Control
                placeholder="Enter Zip Code"
                onChange={handleSearchChange}
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </InputGroup>
          </form>
        </div>
        <div className="col-lg-2">
          <DropdownButton
            id="dropdown-basic-button"
            title={`sort by: ${sortByKeys[sort]}`}
            onSelect={handleSortBySelect}
            variant="outline-light"
          >
            <Dropdown.Item eventKey="distance">Sort by: Closest</Dropdown.Item>
            <Dropdown.Item eventKey="-distance">
              Sort by: Furthest
            </Dropdown.Item>
            <Dropdown.Item eventKey="recent">Sort by: Newest</Dropdown.Item>
            <Dropdown.Item eventKey="-recent">Sort by: Oldest</Dropdown.Item>
            <Dropdown.Item eventKey="random">Sort by: Random</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      {loading === true ? (
        <FadeLoader {...FadeLoaderProps} />
      ) : (
        <Animals posts={posts} />
      )}
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
};
// };
export default Search;
