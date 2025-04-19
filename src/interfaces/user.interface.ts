export interface IUser {
  id: number;
  name: string;
  email?: string;
}

export interface ICreateUser {
  name: string;
  email?: string;
}
