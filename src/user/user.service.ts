import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';

import storage from '@app/gcloudconfig';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // create local variable
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or Username already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UserEntity();

    Object.assign(newUser, createUserDto); // re-write values from createUserDto to newUser or add missing values

    return await this.userRepository.save(newUser); // save user to DB
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    // return response for client adding JWT
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credentials are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    userId: number,
    updatedInfo: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);

    Object.assign(user, updatedInfo);

    return await this.userRepository.save(user);
  }

  async uploadUserImage(
    userId: number,
    image: Express.Multer.File,
  ): Promise<UserEntity> {
    const user = await this.findById(userId);
    const fileName = `images/${image.originalname}`;
    const bucket = storage.bucket('balance-api');
    const file = bucket.file(fileName);

    await file.save(image.buffer, {
      metadata: {
        contentType: image.mimetype,
      },
    });

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600 * 1000, // 1 hour
    });

    user.image = url;

    return await this.userRepository.save(user);
  }
}
