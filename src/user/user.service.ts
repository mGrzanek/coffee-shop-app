import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { User, Password } from '@prisma/client';

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
  public getByEmail(email: User['email']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }
  public createNewUser(
    userData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      return this.prismaService.user.create({
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
      else throw err;
    }
  }
  public updateUserById(
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
