import Axios from "axios";

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

export const api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export const sandBox = Axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com"
});

//single instance of axios for the bearer token to be attached
