import axios, { AxiosResponse } from "axios";
import { UserData } from "../../dto/UserData";
import { Product } from "src/dto/ProductDTO";

export const getCurrentUser = async (): Promise<AxiosResponse<UserData>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return await axios({ method: "get", url: "http://localhost:8080/api/private/auth/current", headers: { Authorization: header } });
};

export const getProductsForUser = async (): Promise<AxiosResponse<Product[]>> => {
  const token = localStorage.getItem("jwt");
  const header = "Bearer " + token;
  return await axios({
    method: "get",
    url: "http://localhost:8080/api/private/user/products",
    headers: {
      Authorization: header,
    },
  });
};
