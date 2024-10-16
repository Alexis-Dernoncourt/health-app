import {
  // CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthAccessTokens } from './entities/access-token.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { AuthGuard as JwtAuthGuard } from '@nestjs/passport';
@Injectable()
export class AuthGuard extends JwtAuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private readonly em: EntityManager,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const accessToken = await this.em.findOne(AuthAccessTokens, {
      hash: token,
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
