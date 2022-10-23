import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.entity';
import { ValidatorsService } from '../../shared/services/validators.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private validatorsService: ValidatorsService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      console.log('public');
      return rest;
    }

    return null;
  }

  async signIn(user: any): Promise<any> {
    const payload = { sub: user.id, aud: 'PUBLIC_SECRET' };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateJwt(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}
