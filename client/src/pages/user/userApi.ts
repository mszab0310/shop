import axios, { AxiosResponse } from "axios";
import { UserData } from "../../dto/UserData";

const token = localStorage.getItem("jwt");
const header = "Bearer " + token;

export const getCurrentUser = async (): Promise<AxiosResponse<UserData>> => {
  return await axios.get("http://localhost:8080/api/auth/current", { headers: { Authentication: header } });
};
