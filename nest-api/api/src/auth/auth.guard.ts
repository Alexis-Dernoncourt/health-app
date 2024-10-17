import {
  // CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard as JwtAuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AuthGuard extends JwtAuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const accessToken = await this.prisma.auth_access_token.findFirst({
      where: {
        hash: token,
      },
    });
    console.log('🚀 ~ AuthGuard ~ canActivate ~ accessToken:', accessToken);
    if (!token || !accessToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = { ...payload, token };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  handleRequest(err, user, info) {
    console.log('🚀 ~ ICIAuthGuard ~ handleRequest ~ err:', err);
    console.log('🚀 ~ ICIAuthGuard ~ handleRequest ~ user:', user);
    console.log('🚀 ~ ICIAuthGuard ~ handleRequest ~ info:', info);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
