export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface UserInterface {
  username: string;
  password: string;
}

export interface UserResponseInterface {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}
