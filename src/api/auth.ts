import request from "./client";
import { ILoginRequest, IRegisterRequest } from "./request";
import { ILoginResponse, IRegisterResponse } from "./response";

export async function register(data: IRegisterRequest) {
  const response = await request<IRegisterResponse>({
    data,
    method: "POST",
    url: "/register",
  });

  if (response.data && response.data.data) {
    localStorage.setItem("token", response.data.data.token.toString());
    localStorage.setItem("username", response.data.data.username);
  }
  return response.data;
}

export async function login(data: ILoginRequest) {
  const response = await request<ILoginResponse>({
    data,
    method: "POST",
    url: "/login/",
  });

  if (response.data && response.data.data) {
    localStorage.setItem("token", response.data.data.token.toString());
    localStorage.setItem("username", response.data.data.username);
  }
  return response.data;
}
