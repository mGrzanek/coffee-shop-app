import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Messages, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessagesService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}
  public async getAllMessages(): Promise<Messages[]> {
    return this.prismaService.messages.findMany();
  }
  public async createMessage(
    messageData: Omit<Messages, 'id' | 'createdAt' | 'userId'>,
    userId: User['id'] | null,
  ) {
    try {
      if (userId) {
        const user = await this.userService.getUserById(userId);
        if (user) {
          return this.prismaService.messages.create({
            data: {
              ...messageData,
              email: user.email,
              user: {
                connect: { id: userId },
              },
            },
          });
        }
      } else
        return this.prismaService.messages.create({
          data: messageData,
        });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
