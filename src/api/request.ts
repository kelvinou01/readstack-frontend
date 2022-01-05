export interface ICreateStackRequest {
  name: string;
}

export type IUpdateStackRequest = {
  name: string;
};

export interface IListStacksRequest {
  username?: string;
}

export interface ICreateBookRequest {
  title: string;
  author: string;
  cover_photo_url: string;
  stack_id: number;
}

export type IUpdateBookRequest = ICreateBookRequest;

export interface IListBooksRequest {
  stack_id?: number;
}

export interface ICreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export type IRegisterRequest = ICreateUserRequest;

export interface ILoginRequest {
  username: string;
  password: string;
}

export type IUpdateUserRequest = {
  old_password: string;
  new_password: string;
};

export interface IListUsersRequest {}
