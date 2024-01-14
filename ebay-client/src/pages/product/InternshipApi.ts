import axios, { AxiosResponse } from "axios";
import { Bid } from "src/dto/BidDto";
import { Product } from "../../dto/ProductDTO";

export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return await axios({ method: "get", url: "http://localhost:8080/api/public/products" });
};

export const addNewProduct = async (product: Product) => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "post",
    url: "http://localhost:8080/api/private/products/new",
    data: product,
    headers: {
      Authorization: header,
    },
  });
};

export const getProductConditions = (): Promise<AxiosResponse<string[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/products/new/condition",
    headers: {
      Authorization: header,
    },
  });
};

export const getProductById = (id: number): Promise<AxiosResponse<Product>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/product",
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};

export const submitBidForProduct = (bidObj: Bid) => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "post",
    url: "http://localhost:8080/api/private/product/bid",
    data: bidObj,
    headers: {
      Authorization: header,
      "Content-Type": "application/json",
    },
  });
};

export const getBidForProduct = (id: number) => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/product/highestbid",
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};

export const getSearchResult = (query: string): Promise<AxiosResponse<Product[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/products/search",
    params: { query: query },
    headers: {
      Authorization: header,
    },
  });
};

export const deleteProduct = (id: number) => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "delete",
    url: "http://localhost:8080/api/private/product",
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};
