import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  public getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  public getUserById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }
}
