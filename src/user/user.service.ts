import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/user.payload.dto';

import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(payload: UserCreateRequestDto) {
    const { email, password, name } = payload;

    const isEmailExist = await this.userRepository.isEmailExist(email);
    if (isEmailExist) {
      throw new UnauthorizedException('가입된 사용자입니다.');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const user = await this.userRepository.create({
      email,
      password: hash,
      name,
    });

    return user.readOnlyData;
  }
}
