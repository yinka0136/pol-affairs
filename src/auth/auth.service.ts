import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dtos/auth-dto';
import { TokenPayload } from './token.model';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private _JWT: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async validateUser(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username } = await this.userRepository.validateUser(
      authCredentialsDTO,
    );
    if (username == null) {
      throw new UnauthorizedException('Username or password incorrect');
    }
    const payload: TokenPayload = { username };
    const accessToken = await this._JWT.sign(payload);
    return { accessToken };
  }
}
