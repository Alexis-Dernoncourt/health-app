import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { Users } from '../../users/entities/user.entity';

@Entity()
export class AuthAccessTokens {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne(() => Users, { unique: true })
  tokenable!: Users;

  @Property({
    type: 'text',
    default: 'auth_token',
    onCreate: () => 'auth_token',
  })
  type?: string;

  @Property({
    type: 'text',
    default: 'access-token',
    onCreate: () => 'access-token',
  })
  name?: string;

  @Property({ type: 'text' })
  hash!: string;

  @Property({
    type: 'text',
    onCreate: () => '["user:normal"]',
  })
  abilities?: string;

  @Property({ onCreate: () => new Date() })
  @Index()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @Index()
  updatedAt?: Date = new Date();

  @Property({ nullable: true })
  @Index()
  lastUsedAt!: Date;

  @Property({ nullable: true })
  @Index()
  expiresAt!: Date;

  //   @Property({ type: 'varchar', length: 45, nullable: true })
  //   ipAddress?: string;

  //   @Property({ type: 'text', nullable: true })
  //   userAgent?: string;
}
