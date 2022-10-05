import axios from "axios";

axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 1000,
  headers: { Authorization: process.env.REACT_APP_TOKEN },
});
