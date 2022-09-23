export interface IResponse<T, E> {
  data: T;
  message: string;
  error: E;
}

export interface IUserResponse {
  username: string;
  email: string;
  password: string;
}

export interface IStackResponse {
  id: number;
  name: string;
  user_id: number;
}

export interface IBookResponse {
  id: number;
  title: string;
  author: string;
  stack_id: number;
  cover_photo_url: string;
}

export interface IRegisterResponse {
  token: number;
  username: string;
}

export interface ILoginResponse {
  token: number;
  username: string;
}

export interface IError {
  response: IErrorResponse;
}

export interface IErrorResponse {
  status: number
}