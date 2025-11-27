import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Express } from 'express';
import { SigninDto } from 'src/auth/dto/auth-signin.dto';
import { randomBytes } from 'crypto';
import { MailerService } from 'src/mailer-service/mailer-service.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
    private readonly mailerService: MailerService,
  ) {}
  async create(createUserDto: SigninDto) {
    try {
      const existingUser = await this.prisma.users.findUnique({
        where: { email: createUserDto.email },
        select: { password: false, id: true },
      });
      if (existingUser) {
        throw new HttpException('Email already exists', 400);
      }
      const verificationToken = randomBytes(64).toString('hex');
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      await this.sendVerificationEmail(createUserDto.email, verificationToken);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userRest } = createUserDto;
      const user = await this.prisma.users.create({
        data: {
          ...userRest,
          password: hashedPassword,
          verificationToken,
        },
        select: { password: false, id: true },
      });
      return {
        user,
        message:
          'User registered. Please check your email to verify your account.',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException("Can't create user", 409);
    }
  }

  async sendVerificationEmail(email: string, token: string) {
    try {
      const verificationLink = `${process.env.FRONTEND_URL}/users/verify-email?token=${token}`;
      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
      };
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      console.log('🚀 ~ UsersService ~ sendVerificationEmail ~ error:', error);
      throw new HttpException("Can't send verification email", 400);
    }
  }

  async verifyEmail(token: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { verificationToken: token },
        select: { password: false, id: true },
      });
      console.log('🚀 ~ UsersService ~ verifyEmail ~ user:', user);
      if (!user) {
        throw new HttpException('Invalid verification token', 400);
      }
      await this.prisma.users.update({
        where: { id: user.id },
        data: { verificationToken: null, isEmailVerified: true },
      });
      return { message: 'Email verified successfully.' };
    } catch (error) {
      console.log('🚀 ~ UsersService ~ verifyEmail ~ error:', error);
      throw new HttpException("Can't verify email", 400);
    }
  }

  async findAll() {
    return await this.prisma.users.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: false,
        image: true,
        created_at: true,
        updated_at: true,
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
  }

  async findByEmail(email: string) {
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
    } catch (error: any) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException(error.message ?? "Can't found this user", 400);
    }
    return `The #${id} user was updated`;
  }

  async changePassword(id: string, newPassword: string) {
    try {
      await this.prisma.users.findFirstOrThrow({ where: { id } });
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.users.update({
        where: { id },
        data: { password: hashedPassword },
      });
      return { message: `The #${id} user password was updated` };
    } catch (error) {
      console.log('🚀 ~ UsersService ~ changePassword ~ error:', error);
      throw new HttpException("Can't update user password", 400);
    }
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
      return { message: `The #${id} user was deleted` };
    } catch (error) {
      console.log('🚀 ~ UsersService ~ findOne ~ error:', error);
      throw new HttpException("Can't found this user", 400);
    }
  }
}
