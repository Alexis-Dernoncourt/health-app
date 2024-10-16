import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type UserPayload = {
  email: string;
  userId: number;
  iat: number;
  exp: number;
  aud: string;
  token: string;
};
export type RequestWithUser = Request & { user: UserPayload };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ userId, email, iat, exp, aud }: UserPayload) {
    console.log('🚀 ~ JwtStrategy ~ validate ~ PAYLOAD:', {
      userId,
      email,
      iat,
      exp,
      aud,
    });
    return { userId, email: email, tokenInfos: { aud, exp, iat } };
  }
}
