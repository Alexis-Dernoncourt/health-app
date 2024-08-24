import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/auth-login.dto';
import { ZodValidationPipe } from 'src/zod-pipe/zod-pipe';
import { SigninDto, SigninSchema } from './dto/auth-signin.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/api/v1/')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signin')
  @UsePipes(new ZodValidationPipe(SigninSchema))
  async signin(@Body() payload: SigninDto): Promise<{ message: string }> {
    await this.AuthService.signin(payload);
    return { message: 'User created' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string; access_token: any }> {
    const { accessToken } = await this.AuthService.login(loginDto);
    return {
      message: 'Logged in successfully',
      access_token: accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() response: Response,
  ): Promise<typeof response> {
    const authHeader = req?.headers?.authorization;

    if (!authHeader) {
      throw new HttpException(
        'Authorization header is missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new HttpException(
        'Invalid authorization header',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const result = await this.AuthService.logout(token);
    if (!result) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return response.status(200).json({ message: 'Successfully logged out' });
  }
}
