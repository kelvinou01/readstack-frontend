import request from "./client";
import { ICreateUserRequest, IUpdateUserRequest } from "./request";
import { IUserResponse } from "./response";

export async function createUser(data: ICreateUserRequest) {
  const response = await request<IUserResponse>({
    data,
    method: "POST",
    url: "/users",
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });
  return response.data;
}

export async function retrieveUser(id: number) {
  const response = await request<IUserResponse>({
    method: "GET",
    url: "/users/" + id,
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });
  return response.data;
}

export async function listUsers() {
  const response = await request({
    method: "GET",
    url: "/users",
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });

  return response.data.data;
}

export async function updateUser(id: number, data: IUpdateUserRequest) {
  const response = await request({
    data,
    method: "PUT",
    url: "/users/" + id,
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });

  return response.data;
}

export async function deleteUser(id: number) {
  const response = await request({
    method: "DELETE",
    url: "/users/" + id,
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });

  return response.data;
}
