import { Entity, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { Users } from 'src/users/entities/user.entity';
import { Recipes } from './recipe.entity';

@Entity()
export class FavoritedRecipe {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Users)
  user!: Users;

  @ManyToOne(() => Recipes)
  recipe!: Recipes;
}
