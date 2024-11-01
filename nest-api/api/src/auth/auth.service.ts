import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { Prisma, users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<users> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async signin(payload: SigninDto) {
    return this.usersService.create(payload);
  }

  async login(payload: LoginDto): Promise<{
    accessToken: string;
    user: Partial<users>;
  }> {
    const validateUser = await this.validateUser(
      payload.email,
      payload.password,
    );
    if (!validateUser) {
      throw new UnauthorizedException();
    }
    const jwtPayload = { email: validateUser.email, sub: validateUser.id };
    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
      audience: 'users',
      header: { alg: 'HS256' },
    });
    const decodedToken = this.jwtService.decode(accessToken);
    // persist token in database

    const tokenData: Prisma.auth_access_tokenCreateInput = {
      hash: accessToken,
      tokenable_id: {
        connect: {
          id: validateUser.id,
        },
      },
      expires_at: decodedToken.exp,
      last_used_at: new Date(Date.now()),
    };

    await this.prisma.auth_access_token.create({
      data: tokenData,
    });
    const { password, ...user } = validateUser;
    return { accessToken, user: user };
  }

  async logout(token: string): Promise<boolean> {
    const accessToken = await this.prisma.auth_access_token.findFirst({
      where: { hash: token },
    });
    if (!accessToken) {
      return false;
    }
    await this.prisma.auth_access_token.delete({
      where: { id: accessToken.id },
    });
    return true;
  }
}
