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
    return new Promise(async (resolve, reject) => {
      signUpUser.password = await this.authService.hashPassword(signUpUser.password);
      const user = new this.userModel(signUpUser);
      console.log(user);
      if(user) {
        user.save();
        resolve({ userInfo: user });
      } else {
        let err = new HttpException('Email is already in use!', HttpStatus.CONFLICT);
        reject(err);
      }
    })
  }

  async login(loginUser: LoginUserDto) {
    return new Promise(async (resolve, reject) => {
      const user = await this.findUserByEmail(loginUser.email);
      if(!user) {
        let err = new HttpException('Not such an user found!', HttpStatus.FORBIDDEN);
        reject(err);
      }
      const result = await this.authService.validatePasswords(loginUser.password, user.password);
      if(!result) {
        let err = new HttpException('The password is incorrect!', HttpStatus.FORBIDDEN);
        reject(err);
      }
      const jwt = await this.authService.generateJwt(user);
      if(jwt) {
        resolve({ accessToken: jwt});
      } else {
        let err = new HttpException('Authorization failed!', HttpStatus.FORBIDDEN);
        reject(err);
      }
    })
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
}
