import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<users> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userRest } = createUserDto;
      const user = await this.prisma.users.create({
        data: {
          ...userRest,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create user", 409);
    }
  }

  async findAll(): Promise<users[]> {
    return await this.prisma.users.findMany();
  }

  async findByEmail(email: string): Promise<users | null> {
    try {
      return await this.prisma.users.findUnique({ where: { email } });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findByEmail ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.users.findFirstOrThrow({
        where: { id },
        include: {
          user_favorites: {
            select: {
              recipe: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }

  async uploadImage(id: string, image: Express.Multer.File) {
    try {
      const uploadResult = await this.cloudinary.uploadFile(image, `users`, id);
      const updatedUser = await this.prisma.users.update({
        where: { id },
        data: {
          image: uploadResult?.secure_url ?? null,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ addImage ~ error:', error);
      throw new BadRequestException("Can't update user image");
    }
  }

  async deleteImage(id: string, prefix: string) {
    try {
      await this.cloudinary.deleteImage(prefix + id);
      const updatedUser = await this.prisma.users.update({
        where: { id },
        data: {
          image: null,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ addImage ~ error:', error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('🚀 ~ UsersService ~ update ~ updateUserDto:', updateUserDto);
    try {
      await this.prisma.users.findFirstOrThrow({ where: { id } });
      const updatedUser = updateUserDto;
      // const image = updateUserDto.image;
      // console.log('🚀 ~ UsersService ~ update ~ image:', file);
      // const uploadResult = await this.cloudinary.uploadFile(file, `users`);
      // updatedUser.image = uploadResult ?? null;
      // if (image) {
      // }
      console.log('🚀 ~ UsersService ~ update ~ updatedUser:', updatedUser);
      try {
        await this.prisma.users.update({
          where: { id },
          data: { ...updatedUser },
        });
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
      const user = await this.prisma.users.findFirstOrThrow({ where: { id } });
      const userToken = await this.prisma.auth_access_token.findUnique({
        where: {
          id,
        },
      });
      await this.prisma.users.delete({ where: { id: user.id } });
      await this.prisma.auth_access_token.delete({
        where: { id: userToken?.id },
      });
      return `The #${id} user was deleted`;
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }
}
