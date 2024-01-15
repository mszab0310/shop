import axios, { AxiosResponse } from "axios";
import {Internship} from "../../dto/InternshipDTO";

export const getAllProducts = async (): Promise<AxiosResponse<Internship[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({method: "get", url: "http://localhost:8080/api/public/internships"});
};

export const addNewProduct = async (product: Internship) => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "post",
    url: "http://localhost:8080/api/private/internships/new",
    data: product,
    headers: {
      Authorization: header,
    },
  });
};

export const getProductById = (id: number): Promise<AxiosResponse<Internship>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/internship",
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};

export const getSearchResult = (query: string): Promise<AxiosResponse<Internship[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return axios({
    method: "get",
    url: "http://localhost:8080/api/private/internship/search",
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
    url: "http://localhost:8080/api/private/internship",
    params: { id: id },
    headers: {
      Authorization: header,
    },
  });
};
