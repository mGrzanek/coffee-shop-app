import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { JwtOptionalAuthGuard } from 'src/auth/jwt-optional-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async getAllMessages() {
    return this.messageService.getAllMessages();
  }
  @Post('/')
  @UseGuards(JwtOptionalAuthGuard)
  async createMessage(@Body() messageData: CreateMessageDto, @Request() req) {
    const userId = req.user?.userId || null;
    return this.messageService.createMessage(messageData, userId);
  }
}
