import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { QueryResolver } from './models/graphql/query.resolver';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './models/users/users.module';
import { UsersService } from './models/users/users.service';
import { SensitiveService } from './models/sensitive_rules/sensitive.service';
import { SensitiveModule } from './models/sensitive_rules/sensitive.module';
@Module({
  imports: [
    UsersModule,
    SensitiveModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, QueryResolver, UsersService, SensitiveService],
})
export class AppModule {}

