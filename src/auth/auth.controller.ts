import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  async register(@Body() userData: RegisterDTO) {
    return await this.authService.register(userData);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('auth', tokens, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    });
    res.send({
      message: 'success',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUser(@Request() req) {
    return this.userService.getUserById(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Request() req, @Response() res) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('auth', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      expires: new Date(0),
    });
    res.send({
      message: 'success',
    });
  }
}
