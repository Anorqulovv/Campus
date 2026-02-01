import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from 'src/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}
  async generate(payload: object): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: envConfig.TOKEN_KEY,
      expiresIn: envConfig.TOKEN_TIME,
    });
  }

  async check(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: envConfig.TOKEN_KEY,
    });
  }
}
