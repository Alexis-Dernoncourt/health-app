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

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  favoriteRecipes?: Recipe[];
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  calories: Calories;
  createdAt: Date;
  updatedAt: Date;
  image: Image;
}

export interface Calories {
  for100gr: number;
  total: number;
  totalWeight: number;
  caloriesUnit: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Step {
  number: number;
  text: string;
  warning?: string;
}

type Token = {
  type: string;
  name: string;
  token: string;
  abilities: string[];
  lastUsedAt?: string;
  expiresAt: string;
};

export interface AuthResponse {
  token: Token;
  user: User;
}

export interface Image {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
  recipeId?: number;
}
