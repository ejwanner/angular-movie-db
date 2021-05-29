import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class UserService{
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
    private authService: AuthService
  ) {}

  async create(signUpUser: SignupUserDto) {
    signUpUser.password = await this.authService.hashPassword(signUpUser.password);
    const user = new this.userModel(signUpUser);
    user.save()
      .catch(() => {
        throw new HttpException('Email already in use!', HttpStatus.CONFLICT);
      });
  }

}
