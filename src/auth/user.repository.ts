import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './token.model';
import { AuthCredentialsDTO } from './dtos/auth-dto';
const logger = new Logger();
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<User> {
    const { username, password } = authCredentialsDTO;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      logger.error(error.stack);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else throw new InternalServerErrorException();
    }
  }

  async validateUser(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<TokenPayload> {
    const { username, password } = authCredentialsDTO;

    const user = await this.findOne({ username });
    if (!user) {
      return { username: null };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user && isPasswordCorrect) {
      return { username };
    }
    return { username: null };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
