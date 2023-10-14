import axios from "axios";
import { BASEURL } from "./constants";

const axiosConfig = {
    baseURL: BASEURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
};

export const instance = axios.create(axiosConfig);
