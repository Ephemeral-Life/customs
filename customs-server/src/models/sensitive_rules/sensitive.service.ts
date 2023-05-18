import { Injectable } from '@nestjs/common';
import { sensitive_rules } from './entities/sensitive_rules';
import { PrismaService } from 'src/prisma/prisma.service';
const moment = require('moment');
@Injectable()
export class SensitiveService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllSensitiveRules(): Promise<sensitive_rules[]> {
    const rules = await this.prisma.sensitive_rules.findMany();
    const formattedRules = rules.map(rule => ({
      ...rule,
      sensitive_rules_create_time: moment(rule.sensitive_rules_create_time).format('YYYY-MM-DD')
    }));
    return formattedRules;
  }

  async getAllSensitiveRulesBySensitive_rules_detail(sensitive_rules_detail: string): Promise<sensitive_rules[]> {
    const rules = await this.prisma.sensitive_rules.findMany({where: {sensitive_rules_detail}});
    const formattedRules = rules.map(rule => ({
      ...rule,
      sensitive_rules_create_time: moment(rule.sensitive_rules_create_time).format('YYYY-MM-DD')
    }));
    return formattedRules;
  }

  async deleteSensitiveRuleById(id: number): Promise<sensitive_rules> {
    const ruleToDelete = await this.prisma.sensitive_rules.delete({where: { id }});
    return ruleToDelete;
  }
}