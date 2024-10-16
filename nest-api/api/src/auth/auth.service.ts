import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EntityManager } from '@mikro-orm/postgresql';
import { AuthAccessTokens } from './entities/access-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Users | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user;
    }
    return null;
  }

  async signin(payload: SigninDto): Promise<SigninDto> {
    return this.usersService.create(payload);
  }

  async login(payload: LoginDto): Promise<{
    accessToken: string;
  }> {
    const validateUser = await this.validateUser(
      payload.email,
      payload.password,
    );
    if (!validateUser) {
      throw new UnauthorizedException();
    }
    const jwtPayload = { email: validateUser.email, userId: validateUser.id };
    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
      audience: 'users',
      header: { alg: 'HS256' },
    });
    const decodedToken = this.jwtService.decode(accessToken);
    // persist token in database
    const saveAccessToken = this.em.create(AuthAccessTokens, {
      hash: accessToken,
      tokenable: validateUser,
      expiresAt: decodedToken.exp,
      lastUsedAt: new Date(Date.now()),
    });
    await this.em.persistAndFlush(saveAccessToken);
    return { accessToken };
  }

  async logout(token: string): Promise<boolean> {
    const accessToken = await this.em.findOne(AuthAccessTokens, {
      hash: token,
    });
    if (!accessToken) {
      return false;
    }
    await this.em.removeAndFlush(accessToken);
    return true;
  }
}
