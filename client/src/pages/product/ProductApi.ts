import axios, { AxiosResponse } from "axios";
import { Product } from "../../dto/ProductDTO";

const token = localStorage.getItem("jwt");
const header = "Bearer " + token;

export const getAllProducts = async ():Promise<AxiosResponse<Product[]>> => {
   return await axios.get("http://localhost:8080/api/public/products", {headers:{ "Authentication": header}});
}