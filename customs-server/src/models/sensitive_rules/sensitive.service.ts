import { Injectable } from '@nestjs/common';
import { sensitive_rules } from './entities/sensitive_rules';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SensitiveService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<sensitive_rules[]> {
    return this.prisma.sensitive_rules.findMany();
  }


//   async createUserByUsernameAndPassword(username: string, password: string): Promise<sensitive_rules> {
//     return this.prisma.sensitive_rules.create({
//       data: { username: username, password: password},
//     });
//   }
}
