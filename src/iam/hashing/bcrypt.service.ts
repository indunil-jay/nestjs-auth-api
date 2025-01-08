import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  public async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }
  public async compare(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    return compare(data, encrypted);
  }
}
