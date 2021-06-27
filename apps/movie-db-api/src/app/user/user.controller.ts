import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('')
export class UserController{
  constructor(private userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signUpDto: SignupUserDto) {
    return await this.userService.create(signUpDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginUserDto) {
    return  await this.userService.login(loginDto);
  }
}
