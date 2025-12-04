import { ReactNode } from 'react';

export type LayoutProps = { children: ReactNode };

export type IaRecipeType = {
  title: string;
  description: string;
  ingredients: string;
  steps: string[];
  calories?: string;
  prep_time: string | undefined;
  cook_time: string | undefined;
  servings: string | undefined;
  image?: string | null;
};
