import Axios from "axios";

const url = "http://localhost:5000/api";

export const axios = Axios.create({
  baseURL: url,
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
