import request from "./client";
import { IStackResponse } from "./response";

export async function findProfile( 
  username: string 
): Promise<IStackResponse[] | undefined> { 
  const response = await request({ 
    url: "/" + username, 
    method: "GET", 
  });

  return response.data.data;
}
