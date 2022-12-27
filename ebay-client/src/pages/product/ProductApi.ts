import axios, { AxiosResponse } from "axios";
import { Product } from "../../dto/ProductDTO";

const token = localStorage.getItem("jwt");
const header = "Bearer " + token;

export const getAllProducts = async (): Promise<AxiosResponse<Product[]>> => {
  return await axios.get("http://localhost:8080/api/public/products");
};

export const addNewProduct = async (product: Product) => {
  return axios.post("http://localhost:8080/api/private/products/new", product, {
    headers: {
      Authorization: header,
    },
  });
};

export const getProductConditions = (): Promise<AxiosResponse<string[]>> => {
  return axios.get("http://localhost:8080/api/private/products/new/condition", {
    headers: {
      Authorization: header,
    },
  });
};

export const getProductById = (id: number): Promise<AxiosResponse<Product>> => {
  return axios.get("http://localhost:8080/api/private/product", {
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};
