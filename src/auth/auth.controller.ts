import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() userData: RegisterDTO) {
    return await this.authService.register(userData);
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    res.cookie('auth', tokens, { httpsOnly: true });
    res.send({
      message: 'success',
    });
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Response() res) {
    res.cookie('auth', { httpsOnly: true });
    res.send({
      message: 'success',
    });
  }
}
