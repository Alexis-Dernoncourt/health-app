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

export type Recipe = {
  id?: number;
  title: string;
  image: number;
  description: string;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  steps: {
    number: number;
    text: string;
    warning?: string;
  }[];
  calories: {
    for100gr: number;
    total: number;
    totalWeight: number;
    caloriesUnit: string;
  };
};
