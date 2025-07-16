import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @Get('/')
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }
  @Post('/')
  async createMessage(@Body() messageData: CreateMessageDto, @Request() req) {
    const userId = req.user?.userId || null;
    return this.messageService.createMessage(messageData, userId);
  }
}
