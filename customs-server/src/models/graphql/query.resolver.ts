import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../users/entities/User';
import { UsersService } from '../users/users.service';
import { sensitive_rules } from '../sensitive_rules/entities/sensitive_rules';
import { SensitiveService } from '../sensitive_rules/sensitive.service';

@Resolver()
export class QueryResolver {
  private readonly prisma: PrismaService
  private readonly usersService: UsersService;
  private readonly sensitiveService: SensitiveService;
  constructor(prisma: PrismaService, usersService: UsersService, sensitiveService: SensitiveService) {
    this.prisma = prisma;
    this.usersService = usersService;
    this.sensitiveService = sensitiveService;
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async getUserByUsernameAndPassword(@Args('username') username: string, @Args('password') password: string): Promise<User> {
    return this.usersService.getUserByUsernameAndPassword(username, password)
  }
  
  @Mutation(() => User)
  async createUserByUsernameAndPassword(@Args('username') username: string, @Args('password') password: string): Promise<User> {
    return this.usersService.createUserByUsernameAndPassword(username, password)
  }

  @Query(() => [sensitive_rules])
  async getAllSensitiveRules(): Promise<sensitive_rules[]> {
    return this.sensitiveService.findAllSensitiveRules();
  }

  @Query(() => [sensitive_rules])
  async getAllSensitiveRulesBySensitive_rules_detail(@Args('sensitive_rules_detail') sensitive_rules_detail: string): Promise<sensitive_rules[]> {
    return this.sensitiveService.getAllSensitiveRulesBySensitive_rules_detail(sensitive_rules_detail);
  }

  @Mutation(() => sensitive_rules)
  async deleteSensitiveRuleById(@Args('id') id: number): Promise<sensitive_rules> {
    return this.sensitiveService.deleteSensitiveRuleById(id);
  }

  @Mutation(() => sensitive_rules)
  async createSensitiveRule(@Args('sensitive_rules_name') sensitive_rules_name: string, @Args('sensitive_rules_detail') sensitive_rules_detail: string, @Args('sensitive_rules_content') sensitive_rules_content: string ){
    return this.sensitiveService.createSensitiveRule(sensitive_rules_name, sensitive_rules_detail, sensitive_rules_content)
  }

  @Mutation(() => sensitive_rules)
  async changeSensitiveRule(@Args('id') id: number, @Args('sensitive_rules_name') sensitive_rules_name: string, @Args('sensitive_rules_detail') sensitive_rules_detail: string, @Args('sensitive_rules_content') sensitive_rules_content: string ){
    return this.sensitiveService.changeSensitiveRule(id, sensitive_rules_name, sensitive_rules_detail, sensitive_rules_content)
  }

}