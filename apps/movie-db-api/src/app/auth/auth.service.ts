import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // generate JWT
  async generateJwt(user: User) {
    return this.jwtService.sign( {'email': user.email, '_id': user._id});
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async validatePasswords(password: string, storedPasswordHash: string) {
    return await bcrypt.compare(password, storedPasswordHash);
  }

}
