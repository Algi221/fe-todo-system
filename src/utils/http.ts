import axios from "axios";
import * as Cookies from "react-cookies";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const apiKey = Cookies.load("api_key");

if (apiKey) {
  http.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
}

export default http;
