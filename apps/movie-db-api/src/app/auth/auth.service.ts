import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: User) {
    return this.jwtService.sign( {user});
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async validatePassword(password: string, storedPasswordHash: string) {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
