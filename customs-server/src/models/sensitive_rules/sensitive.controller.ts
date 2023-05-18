import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { sensitive_rules } from './entities/sensitive_rules';
import { SensitiveService } from './sensitive.service';

@Controller("SensitiveRules")
export class SensitiveController {
  constructor(private readonly sensitiveService: SensitiveService) {}

  @Get("allSensitiveRules")
  getAllUsers(): Promise<sensitive_rules[]> {
    return this.sensitiveService.findAllSensitiveRules();
  }

  @Get("deleteSensitiveRuleById")
  deleteSensitiveRuleById(): Promise<sensitive_rules> {
    return null
  }

//   @Post("createSensitiveRules")
//   async createUser(@Body() data: any) {
//     console.log("createUser:",data.username, data.password);
//     if(data.username===undefined||data.password===undefined)
//       return null;
//     const user = await this.sensitiveService.createUserByUsernameAndPassword(data.username, data.password);
//     return user;
//   }
}
