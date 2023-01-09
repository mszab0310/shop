import axios, { AxiosResponse } from "axios";
import { Bid } from "src/dto/BidDto";
import { Product } from "../../dto/ProductDTO";

const token = localStorage.getItem("jwt");
const header = "Bearer " + token;

export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  return await axios({ method: "get", url: "http://localhost:8080/api/public/products" });
};

export const addNewProduct = async (product: Product) => {
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
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/products/new/condition",
    headers: {
      Authorization: header,
    },
  });
};

export const getProductById = (id: number): Promise<AxiosResponse<Product>> => {
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
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/products/search",
    params: { query: query },
    headers: {
      Authorization: header,
    },
  });
};
