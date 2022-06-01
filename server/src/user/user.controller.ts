import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/core/apiKey.guard';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Post('verifyEmail')
  @UseGuards(ApiKeyGuard)
  verifyEmail(@Body() userDto: UserDto): Promise<boolean> {
    return this.userService.verifyEmail(userDto);
  }
}
