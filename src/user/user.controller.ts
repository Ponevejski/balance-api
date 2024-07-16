import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto); // get UserEntity created in DB
    return this.userService.buildUserResponse(user); // normalize response for client adding JWT
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }

  @Put('user/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @User('id') currentUserId: number,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<UserEntity> {
    return await this.userService.uploadUserImage(currentUserId, image);
  }
}
