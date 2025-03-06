import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from './request-with-user';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { email, password }: { email: string; password: string },
  ) {
    return this.authService
      .validateUser(email, password)
      .then((user) => this.authService.login(user));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async aboutMe(@Req() req: RequestWithUser) {
    const user = req.user.userId;
    return await this.authService.about(user);
  }
}
