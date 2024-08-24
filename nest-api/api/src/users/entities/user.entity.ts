import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Users {
  @PrimaryKey()
  id!: number;

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

  @Property()
  favorites?: string;
}
