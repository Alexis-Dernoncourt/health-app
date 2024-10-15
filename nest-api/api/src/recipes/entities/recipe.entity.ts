import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Users } from 'src/users/entities/user.entity';

@Entity()
export class Recipes {
  @PrimaryKey({ autoincrement: true })
  id!: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: false })
  title!: string;

  @Property({ nullable: false })
  description!: string;

  /*
    {
      name: string;
      quantity: string;
      unit: string;
    }[]
  */
  @Property({ nullable: true })
  ingredients?: string;

  /*
    {
      number: number;
      text: string;
      warning?: string;
    }[]
  */
  @Property({ nullable: true })
  steps?: string;

  @Property()
  calories?: {
    for100gr: number;
    total: number;
    totalWeight: number;
    caloriesUnit?: string;
  };

  @ManyToMany(() => Users, (user) => user.favorites, {
    mappedBy: 'favorites',
    nullable: true,
  })
  usersWhoFavorited = new Collection<Users>(this);

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
