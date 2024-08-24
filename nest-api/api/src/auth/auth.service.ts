import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/auth-login.dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/auth-signin.dto';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class AuthService {
  constructor(
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

  @UseGuards(LocalAuthGuard)
  async login(payload: LoginDto): Promise<{
    message: string;
    access_token: string;
  }> {
    const user = await this.usersService.findByEmail(payload.email);
    const validateUser = await this.validateUser(user!.email, payload.password);
    if (!validateUser) {
      throw new UnauthorizedException();
    }
    const jwtPayload = { email: validateUser.email, sub: validateUser.id };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '7d',
      audience: 'users',
      header: { alg: 'HS256' },
    });
    // TODO: register the token in database
    return {
      message: 'Logged in successfully',
      access_token: accessToken,
    };
  }

  logout(): string {
    return 'logout';
  }
}
