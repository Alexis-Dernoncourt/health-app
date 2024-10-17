import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // const request = context.switchToHttp().getRequest();
    // console.log('🚀 ~ JwtAuthGuard ~ canActivate ~ request:', request);
    // const token = this.extractTokenFromHeader(request);
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('🚀 ~ JwtAuthGuard ~ handleRequest ~ err:', err);
    console.log('🚀 ~ JwtAuthGuard ~ handleRequest ~ user:', user);
    console.log('🚀 ~ JwtAuthGuard ~ handleRequest ~ info:', info);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
