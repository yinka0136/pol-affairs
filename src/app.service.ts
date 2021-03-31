import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Police api, please prepend /api to view the swagger documentation to allow ease of consumption 😋';
  }
}
