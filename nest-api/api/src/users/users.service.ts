import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcryptjs';
import { AuthAccessTokens } from 'src/auth/entities/access-token.entity';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}
  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userRest } = createUserDto;
      const user = this.em.create(
        Users,
        { ...userRest, password: hashedPassword },
        { partial: true },
      );
      await this.em.persistAndFlush(user);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create user", 409);
    }
  }

  findAll(): Promise<Users[]> {
    return this.em.findAll(Users);
  }

  async findByEmail(email: string): Promise<Users | null> {
    try {
      return await this.em.findOneOrFail(Users, { email });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findByEmail ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async findOne(id: string) {
    try {
      return await this.em.findOneOrFail(Users, { id });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.em.findOneOrFail(Users, { id });
      const updatedUser = updateUserDto;
      try {
        await this.em.nativeUpdate(Users, id, { ...updatedUser });
      } catch (error) {
        console.log('🚀 ~ UsersService ~ update ~ error:', error);
        throw new Error("Can't update user");
      }
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException(error.message ?? "Can't found this user", 400);
    }
    return `The #${id} user was updated`;
  }

  async remove(id: string) {
    try {
      const user = await this.em.findOneOrFail(Users, { id });
      const userToken = await this.em.findOneOrFail(AuthAccessTokens, {
        tokenable: user.id,
      });
      this.em.removeAndFlush(user);
      this.em.removeAndFlush(userToken);
      return `The #${id} user was deleted`;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }
}
