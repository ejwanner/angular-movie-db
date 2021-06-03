import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../auth/auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
        throw new HttpException('Email is already in use!', HttpStatus.CONFLICT);
      });
  }

  async login(loginUser: LoginUserDto) {
    this.userModel.findOne({ email: loginUser.email })
      .then(user => {
        if(!user) {
          throw new HttpException('Not such an user found!', HttpStatus.FORBIDDEN);
        }
        return this.authService.validatePassword(loginUser.password, user.password);
      })
      .then(result => {
        if(!result) {
          throw new HttpException('The password is incorrect!', HttpStatus.FORBIDDEN);
        }
        //TODO hier weiter mit JWT Implementierung
      })
      .catch(() => {
        throw new HttpException('Authorization failed!', HttpStatus.FORBIDDEN);
      })

  }

}
