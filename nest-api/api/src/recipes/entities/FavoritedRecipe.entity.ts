import { Entity, PrimaryKey, ManyToOne, Property } from '@mikro-orm/core';
import { Users } from 'src/users/entities/user.entity';
import { Recipes } from './recipe.entity';

@Entity()
export class UserFavorites {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Users)
  user!: Users;

  @ManyToOne(() => Recipes)
  recipe!: Recipes;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
