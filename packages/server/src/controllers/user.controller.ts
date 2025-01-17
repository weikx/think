import { CreateUserDto } from '@dtos/create-user.dto';
import { LoginUserDto } from '@dtos/login-user.dto';
import { UpdateUserDto } from '@dtos/update-user.dto';
import { JwtGuard } from '@guard/jwt.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '@services/user.service';
import { UserApiDefinition } from '@think/domains';
import { Response as ExpressResponse } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 获取用户
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(UserApiDefinition.getAllUsers.server)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  /**
   * 注册
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(UserApiDefinition.register.server)
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  /**
   * 登录
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(UserApiDefinition.login.server)
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUserDto, @Res({ passthrough: true }) response: ExpressResponse) {
    const { user: data, token, domain, expiresIn } = await this.userService.login(user);
    response.cookie('token', token, {
      domain,
      expires: new Date(new Date().getTime() + expiresIn),
      httpOnly: true,
      sameSite: 'lax',
    });
    return { ...data, token };
  }

  /**
   * 登出
   */
  @Post(UserApiDefinition.logout.server)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: ExpressResponse) {
    const { token, domain } = await this.userService.logout();
    response.cookie('token', token, {
      expires: new Date(),
      domain,
      httpOnly: true,
      sameSite: 'lax',
    });
    return;
  }

  /**
   * 更新
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(UserApiDefinition.update.server)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(req.user, dto);
  }
}
