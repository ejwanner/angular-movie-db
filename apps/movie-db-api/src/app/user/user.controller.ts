import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller('')
export class UserController{
  constructor(private userService: UserService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signUpDTO: SignupUserDto) {
    return await this.userService.create(signUpDTO);

  }
}
