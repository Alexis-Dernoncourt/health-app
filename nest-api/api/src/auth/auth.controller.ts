import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/auth-login.dto';
import { ZodValidationPipe } from 'src/zod-pipe/zod-pipe';
import { SigninDto, SigninSchema } from './dto/auth-signin.dto';

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
    return this.AuthService.login(loginDto);
  }

  @Post('logout')
  async logout(): Promise<string> {
    return this.AuthService.logout();
  }
}
