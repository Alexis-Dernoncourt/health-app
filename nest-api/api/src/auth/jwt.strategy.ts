import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type UserPayload = {
  email: string;
  sub: string;
  iat: number;
  exp: number;
  aud: string;
};

export type UserRequest = {
  userId: string;
  email: string;
  tokenInfos: Pick<UserPayload, 'aud' | 'exp' | 'iat'>;
};
export type RequestWithUser = Request & { user: UserRequest };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ sub, email, iat, exp, aud }: UserPayload) {
    const userId = sub;
    return { userId, email: email, tokenInfos: { aud, exp, iat } };
  }
}
