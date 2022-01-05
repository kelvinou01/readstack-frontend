import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { IResponse } from "./response";

const client = axios.create({
  baseURL: "https://readstack-backend.herokuapp.com/",
  timeout: 10 * 1000,
  withCredentials: false,
});

export default function request<T = any, E = any>(
  config: AxiosRequestConfig
): AxiosPromise<IResponse<T, E>> {
  return client(config);
}
