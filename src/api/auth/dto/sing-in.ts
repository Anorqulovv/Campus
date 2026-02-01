import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SingInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
