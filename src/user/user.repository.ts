import { BadRequestException, Injectable } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/user.payload.dto';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(payload: UserCreateRequestDto): Promise<User> {
    return await this.userModel.create(payload);
  }

  async isEmailExist(email: string) {
    try {
      return await this.userModel.exists({ email });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
