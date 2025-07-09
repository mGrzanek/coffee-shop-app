import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Password } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  public async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
  public async getUserById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: { orders: true, favorites: true },
    });
  }
  public async getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }
  public async createNewUser(
    userData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('This email is already exist');
      else console.error(err);
    }
  }
  public async updateUserById(
    id: User['id'],
    updatedUserData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      if (password) {
        return this.prismaService.user.update({
          where: { id },
          data: {
            ...updatedUserData,
            password: {
              create: {
                hashedPassword: password,
              },
            },
          },
        });
      } else
        return this.prismaService.user.update({
          where: { id },
          data: updatedUserData,
        });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('This email is already exist');
      else throw err;
    }
  }
  public removeUserById(id: User['id']): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
