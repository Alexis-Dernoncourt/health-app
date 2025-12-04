import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { extractTokenFromHeader, IS_PUBLIC_KEY } from 'src/utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    const accessToken = await this.prisma.auth_access_token.findFirst({
      where: {
        hash: { equals: token ?? '' },
      },
    });
    if (!token) throw new ForbiddenException();
    if (!accessToken) throw new UnauthorizedException();

    super.canActivate(context);
    return true;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
