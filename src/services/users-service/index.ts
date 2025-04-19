import { IGetTokenResponse, IUser, ICreateUser } from "@/interfaces";
import api from "@/libs/api";

export async function getToken(username: string): Promise<IGetTokenResponse> {
  const { data } = await api.post<IGetTokenResponse>("/auth/get-token", {
    username,
  });

  return data;
}

export async function getUsers(): Promise<IUser[]> {
  const { data } = await api.get<IUser[]>("/users");

  return data;
}

export async function createUser(user: ICreateUser): Promise<void> {
  await api.post("/users", user);
}

export async function updateUser(user: IUser): Promise<void> {
  const { id, ...params } = user;

  await api.put(`/users/${id}`, params);
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`);
}
