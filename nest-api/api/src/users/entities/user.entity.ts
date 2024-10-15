import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FavoritedRecipe } from 'src/recipes/entities/FavoritedRecipe.entity';
import { Recipes } from 'src/recipes/entities/recipe.entity';

@Entity()
export class Users {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: true })
  firstname!: string;

  @Property({ nullable: true })
  lastname!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Recipes, (recipe) => recipe.usersWhoFavorited, {
    owner: true,
    nullable: true,
    pivotEntity: () => FavoritedRecipe,
  })
  favorites = new Collection<Recipes>(this);
}
