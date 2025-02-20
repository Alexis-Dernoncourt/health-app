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
  image?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_favorites?: Recipe[] | {recipe: {id: string}}[];
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  calories: Calories;
  created_at: Date;
  updated_at: Date;
  image?: string;
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

// type Token = {
//   type: string;
//   name: string;
//   token: string;
//   abilities: string[];
//   last_used_at?: string;
//   expires_at: string;
// };

export interface AuthResponse {
  access_token: string;
  user: User;
}

// export interface Image {
//   id: number;
//   url: string;
//   created_at: Date;
//   updated_at: Date;
//   user_id?: number;
//   recipe_id?: number;
// }
