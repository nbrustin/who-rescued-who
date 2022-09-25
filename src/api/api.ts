import axios, { AxiosResponse } from "axios";
import { PostType } from "./api.interface";
import { useState } from "react";
import { request } from "http";
import { json } from "stream/consumers";

let access = "";
// const queryParams = {
//   limit: 20,
//   page: 1,
// };
var qs = require("qs");
var data = qs.stringify({
  grant_type: "client_credentials",
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
});

const instance = axios.create({
  baseURL: "https://api.petfinder.com/v2/",
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  getAccess: () =>
    axios
      .request({
        baseURL: "https://api.petfinder.com/",
        url: "v2/oauth2/token",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      })
      .then(responseBody),
  get: (url: string, header: any) =>
    instance.get(url, header).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Post = {
  getAccess: () => requests.getAccess(),
  getPosts: (token: any, queryParams: object): Promise<PostType[]> =>
    requests.get(
      // `animals?limit=20&page=${currentPage}&type=${animal}&location=${location}`,
      `animals?${queryParams}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),
  createPost: (post: PostType): Promise<PostType> =>
    requests.post("posts", post),
  updatePost: (post: PostType, id: number): Promise<PostType> =>
    requests.put(`posts/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};
