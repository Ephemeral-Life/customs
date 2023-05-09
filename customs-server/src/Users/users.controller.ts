import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User';

@Controller("/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get("hello")
  getHello(): string {
    return 'Hello users!';
  }
  @Get("allUsers")
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  
}
