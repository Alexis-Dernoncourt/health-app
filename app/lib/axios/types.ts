export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  favorites: number[];
};

type Token = {
  type: string;
  name: string;
  token: string;
  abilities: string[];
  lastUsedAt: string | null;
  expiresAt: string;
};

export type AuthResponse = {
  token: Token;
  user: User;
};
