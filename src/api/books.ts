import request from "./client";
import { ICreateBookRequest, IListBooksRequest } from "./request";
import { IBookResponse } from "./response";

export async function createBook(data: ICreateBookRequest) {
  const response = await request<IBookResponse>({
    data,
    method: "POST",
    url: "/books",
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });
  return response.data;
}

export async function retrieveBook(id: number) {
  const response = await request<IBookResponse>({
    method: "GET",
    url: "/books/" + id,
  });

  return response.data;
}

export async function listBooks(
  params: IListBooksRequest
): Promise<IBookResponse[] | undefined> {
  const response = await request({
    url: "/books",
    method: "GET",
    params,
  });

  return response.data.data;
}

export async function deleteBook(id: number) {
  const response = await request({
    method: "DELETE",
    url: "/books/" + id,
    headers: {
      Authorization: localStorage.getItem("token") as string,
    },
  });

  return response.data;
}
