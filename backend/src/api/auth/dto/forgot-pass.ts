import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ForgotPass {
  @IsEmail()
  @IsNotEmpty()
  phoneNumber: string;
}
