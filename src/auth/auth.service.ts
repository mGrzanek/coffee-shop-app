import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  public async register(registrationData: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const userData = {
      email: registrationData.email,
    };
    return this.userService.createNewUser(userData, hashedPassword);
  }
  public async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (
      user &&
      (await bcrypt.compare(password, user.password.hashedPassword))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
