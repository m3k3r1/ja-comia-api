import HashProvider from '../hash.provider';
import { compare, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class BCryptHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async comparesHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
