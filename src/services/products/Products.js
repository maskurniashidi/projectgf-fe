import React from "react";
import axios from "axios";

let config = {};

const BASE_URL = "http://127.0.0.1:8000/api";

export const getProduct = () => {
  axios
    .get(`${BASE_URL}/products`)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
