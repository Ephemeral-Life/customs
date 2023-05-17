import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SensitiveService } from './sensitive.service';
import { SensitiveController } from './sensitive.controller';

@Module({
  imports: [],
  controllers: [SensitiveController],
  providers: [SensitiveService, PrismaService],
})
export class SensitiveModule {}