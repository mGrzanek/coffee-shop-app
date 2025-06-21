import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  public getUserById(userId: User['id']) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }
  public createUser(userData: Omit<User, 'id' | 'role'>) {
    return this.prismaService.user.create({
      data: userData,
    });
  }
  public updateUser(userId: User['id'], userData: Omit<User, 'id' | 'role'>) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });
  }
  public removeUser(userId: User['id']) {
    return this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
