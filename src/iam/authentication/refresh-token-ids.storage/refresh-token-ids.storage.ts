import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}
  // private redisClient:Redis;
  onApplicationShutdown(signal?: string) {
    // return this.redisClient.quit();
    // No special initialization is required with TypeORM.
  }
  onApplicationBootstrap() {
    // this.redisClient = new Redis({
    //   host: 'localhost',
    //   port: 6379,
    // });
    // No shutdown actions are needed for TypeORM.
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.refreshTokenRepository.save({
      userId: this.getKey(userId),
      tokenId,
    });
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const token = await this.refreshTokenRepository.findOneBy({
      userId: this.getKey(userId),
    });
    console.log(token);
    console.log(tokenId);
    return token ? token.tokenId === tokenId : false;
  }

  async invalidate(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ userId: this.getKey(userId) });
  }

  //   async insert(userId: number, tokenId: string): Promise<void> {
  //     await this.redisClient.set(this.getKey(userId), tokenId);
  //   }
  //   async validate(userId: number, tokenId: string): Promise<boolean> {
  //     const storeId = await this.redisClient.get(this.getKey(userId));
  //     return storeId === tokenId;
  //   }
  //   async invalidate(userId: number): Promise<void> {
  //     await this.redisClient.del(this.getKey(userId));
  //   }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
