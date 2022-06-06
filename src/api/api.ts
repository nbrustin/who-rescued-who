import axios, { AxiosResponse, AxiosError } from "axios";
import { PostType } from "./api.interface";
import { useState } from "react";
import { request } from "http";
import { json } from "stream/consumers";
// Get Animals
// Get Animal
// Get Animal Types
// Get A Single Animal Type
// Get Animal Breeds

//1. make get request
//2. if 401 error, then we need access token
//3. get new access tokaen, then make get request again
let access = "";
var qs = require("qs");
var data = qs.stringify({
  grant_type: "client_credentials",
  // client_id: "YVrTNzZW9tAm5n9gOhRI7NPzzYpN162ZfFLlezyXBgNBdVZVxE",
  client_id: process.env.REACT_APP_CLIENT_ID,
  // client_secret: "ynaycxxpawvppLnIfP25m5sz4qAL7Uoz6nBUSejc"
  client_secret: process.env.REACT_APP_CLIENT_SECRET
});

const instance = axios.create({
  baseURL: "https://api.petfinder.com/v2/"
});

// const accessInstance = axios.create({
//   baseURL: "https://api.petfinder.com/",
//   url: "v2/oauth2/token",
//   method: "POST",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   data: data
// });

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
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
      })
      .then(responseBody),
  get: (url: string, header: any) =>
    instance.get(url, header).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody)
};

export const Post = {
  getAccess: () => requests.getAccess(),
  getPosts: (
    currentPage: number,
    animal: string,
    token: any
  ): Promise<PostType[]> =>
    requests.get(`animals?limit=20&page=${currentPage}&type=${animal}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  // getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
  createPost: (post: PostType): Promise<PostType> =>
    requests.post("posts", post),
  updatePost: (post: PostType, id: number): Promise<PostType> =>
    requests.put(`posts/${id}`, post),
  deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`)
};
// let accessToken = "";

// const getAccessToken = () => {
//   var axios = require("axios");
//   var qs = require("qs");
//   var data = qs.stringify({
//     grant_type: "client_credentials",
//     client_id: "YVrTNzZW9tAm5n9gOhRI7NPzzYpN162ZfFLlezyXBgNBdVZVxE",
//     client_secret: "ynaycxxpawvppLnIfP25m5sz4qAL7Uoz6nBUSejc"
//   });
//   var config = {
//     method: "post",
//     url: "https://api.petfinder.com/v2/oauth2/token",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     data: data
//   };

//   axios(config)
//     .then(function(response: any) {
//       console.log(JSON.stringify(response.data));
//       accessToken = JSON.stringify(response.data);
//     })
//     .catch(function(error: any) {
//       console.log(error);
//     });
// };

// const getAllAnimals = () => {
//   var axios = require("axios");

//   var config = {
//     method: "get",
//     url: "https://api.petfinder.com/v2/animals",
//     headers: {
//       client_id: "",
//       Authorization: `Bearer ${getAccessToken()}`
//     }
//   };

//   axios(config)
//     .then(function(response: any) {
//       console.log(JSON.stringify(response.data));
//       debugger;
//       return JSON.stringify(response.data);
//     })
//     .catch(function(error: any) {
//       console.log(error);
//     });
// };

// export const Post = {
//   getAllAnimals: ()=> getAllAnimals()
// };
// export const Post = {
// getAllAnimals: (): Promise<PostType[]> => getAllAnimals()
// getPosts: (): Promise<PostType[]> => requests.get("animals")
// getAuth:():Promise<PostType[]>=>
// getAPost: (id: number): Promise<PostType> => requests.get(`posts/${id}`),
// createPost: (post: PostType): Promise<PostType> =>
//   requests.post("posts", post),
// updatePost: (post: PostType, id: number): Promise<PostType> =>
//   requests.put(`posts/${id}`, post),
// deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`)
// };
