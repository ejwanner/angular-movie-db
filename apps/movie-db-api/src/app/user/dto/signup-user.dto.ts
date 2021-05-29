import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
