import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateRequestDto } from './dto/user.payload.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('/signup')
  async signUp(@Body() useData: UserCreateRequestDto) {
    return await this.usersService.signUp(useData);
  }
}
