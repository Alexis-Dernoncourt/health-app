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

export type createUserPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  image?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_favorites?: Recipe[] | { recipe: { id: string } }[];
  isEmailVerified: boolean | undefined;
  verificationToken: string | null | undefined;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  prep_time: string;
  cook_time: string;
  servings: string;
  calories: string;
  created_at: Date;
  updated_at: Date;
  image?: any;
  userId: string;
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
  message: string;
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
