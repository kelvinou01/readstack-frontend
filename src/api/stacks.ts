import request from "./client";
import {
  ICreateStackRequest,
  IListStacksRequest,
  IUpdateStackRequest,
} from "./request";
import { IStackResponse } from "./response";

export async function createStack(data: ICreateStackRequest) {
  const response = await request<IStackResponse>({
    data,
    method: "POST",
    url: "/stacks",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token") as string,
    },
  });
  return response.data;
}

export async function retrieveStack(id: number) {
  const response = await request<IStackResponse>({
    method: "GET",
    url: "/stacks/" + id,
  });

  return response.data;
}

export async function listStacks(
  params: IListStacksRequest
): Promise<IStackResponse[] | undefined> {
  const response = await request({
    params,
    method: "GET",
    url: "/stacks",
  });

  return response.data.data;
}

export async function updateStack(id: number, data: IUpdateStackRequest) {
  const response = await request({
    data,
    method: "PUT",
    url: "/stacks/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token") as string,
    },
  });

  return response.data;
}

export async function deleteStack(id: number) {
  const response = await request({
    method: "DELETE",
    url: "/stacks/" + id,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token") as string,
    },
  });
  return response.data;
}
