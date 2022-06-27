import React, { useEffect, useState, useRef } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Row, Dropdown, DropdownButton } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Animals from "./Animals";
import Animal from "./Animal";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import ReactPaginate from "react-paginate";
import { PostType } from "../api/api.interface";
import { Post } from "../api/api";
import { async, promised } from "q";
// import { access } from "fs";
import { waitFor } from "@testing-library/dom";
import { isAsyncFunction } from "util/types";

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
          debugger;
          pageCount = data.pagination.total_pages;
          setPosts(data.animals);
          setLoading(false);
        });
      })
      .catch(err => {
        console.log("errorr");
      });
    return () => {};
  }, []);

  const getAccessToken = async () => {
    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      grant_type: "client_credentials",
      client_id: "YVrTNzZW9tAm5n9gOhRI7NPzzYpN162ZfFLlezyXBgNBdVZVxE",
      client_secret: "ynaycxxpawvppLnIfP25m5sz4qAL7Uoz6nBUSejc"
    });
    var config = {
      method: "post",
      url: "https://api.petfinder.com/v2/oauth2/token",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data
    };

    axios(config)
      .then(function(response: any) {
        {
          access = response.data.access_token;
        }
        getAllAnimals(1);
      })
      .catch(function(error: any) {
        console.log(error);
      });
  };

  const getAllAnimals = (currentPage: number) => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://api.petfinder.com/v2/animals?limit=20&page=${currentPage}&type=${animal}`,
      headers: {
        Authorization: `Bearer ${access}`
      }
    };

    axios(config)
      .then(function(response: any) {
        pageCount = response.data.pagination.total_pages;
        setPosts(response.data.animals);
        setLoading(false);
      })
      .catch(function(error: any) {
        console.log(error);
      });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const FadeLoaderProps = {
    css: override,
    size: 500
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
      <Container>
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
      </Container>
    );
  }
};
export default Search;
