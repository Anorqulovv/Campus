import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in';
import { SingUpDto } from './dto/sing-up';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() dto: SingInDto) {
    return this.authService.signIn(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SingUpDto) {
    return this.authService.signup(dto);
  }

  // @Post('forgotpassword')
  // async forgotpass(@Body() dto: ForgotPass) {
  //   return this.authService.forgotPassword(dto);
  // }
}
