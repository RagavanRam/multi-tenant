import { Inject, Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class AuthService {
  private readonly userRepository: Repository<User>;
  constructor(
    @Inject(CONNECTION) connection: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepository = connection.getRepository(User);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email: username }],
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      console.log('some');
      return rest;
    }

    return null;
  }

  async signIn(user: any): Promise<any> {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
