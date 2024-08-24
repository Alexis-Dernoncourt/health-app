import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcryptjs';

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

  async findOne(id: number) {
    try {
      return await this.em.findOneOrFail(Users, { id });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('🚀 ~ UsersService ~ update ~ updateUserDto:', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
