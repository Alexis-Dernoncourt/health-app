import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth-login.dto';
import { SigninDto } from './dto/auth-signin.dto';
import { Request, Response } from 'express';
import { extractTokenFromHeader, Public } from 'src/utils';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { users } from '@prisma/client';

@Controller('/api/v1/')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  @ApiBody({ type: SigninDto, required: true, description: 'Sign-in body' })
  async signin(@Body() payload: SigninDto): Promise<{ message: string }> {
    await this.AuthService.signin(payload);
    return { message: 'User created' };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto, required: true, description: 'Login body' })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; access_token: string; user: Partial<users> }> {
    const { accessToken, user } = await this.AuthService.login(loginDto);
    return {
      message: 'Logged in successfully',
      access_token: accessToken,
      user: user,
    };
  }

  @Post('logout')
  @ApiBearerAuth()
  async logout(
    @Req() req: Request,
    @Res() response: Response,
  ): Promise<typeof response> {
    const token = extractTokenFromHeader(req) ?? '';
    const result = await this.AuthService.logout(token);
    if (!result) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return response.status(200).json({ message: 'Successfully logged out' });
  }
}
