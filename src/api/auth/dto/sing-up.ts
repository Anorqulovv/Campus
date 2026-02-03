import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SingUpDto {
  @IsString()
  @IsOptional()
  fullName?: string;
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phoneNumber: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}
