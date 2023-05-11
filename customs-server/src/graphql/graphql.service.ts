import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class GraphqlService {
  @Query(() => String)
  async hello() {
    return 'world';
  }
}
