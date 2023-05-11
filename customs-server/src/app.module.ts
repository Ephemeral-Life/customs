import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { QueryResolver } from './models/graphql/query.resolver';
import { PrismaService } from './prisma/prisma.service';


@Module({
  imports: [
    // PostsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, QueryResolver],
})
export class AppModule {}