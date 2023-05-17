import { Resolver, Query, Args } from '@nestjs/graphql';
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
    return this.prisma.user.findMany();
  }

  @Query(() => User)
  async getUserByUsernameAndPassword(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        username,
        password
      },
    });
  }

  @Query(() => [sensitive_rules])
  async getAllSensitiveRules(): Promise<sensitive_rules[]> {
    return this.prisma.sensitive_rules.findMany();
  }

}