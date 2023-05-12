import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/User';


@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("allUsers")
  getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post("checkAccount")
  async checkAccount(@Body() data: any) {
    console.log("checkAccount:",data.username, data.password);
    if(data.username===undefined||data.password===undefined)
      return null;
    const user = await this.usersService.getUserByUsernameAndPassword(data.username, data.password);
    return user;
  }

  @Post("createAccount")
  async createUser(@Body() data: any) {
    console.log("createUser:",data.username, data.password);
    if(data.username===undefined||data.password===undefined)
      return null;
    const user = await this.usersService.createUserByUsernameAndPassword(data.username, data.password);
    return user;
  }
}
