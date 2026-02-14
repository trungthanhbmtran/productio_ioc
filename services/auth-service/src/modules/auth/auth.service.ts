import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { IUserRepository } from '@productio/database'; // Interface từ package database
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { RegisterRequest, LoginRequest } from '@productio/grpc-protos/auth';

@Injectable()
export class AuthService {
  constructor(
    // Sử dụng Token để Inject, giúp AuthService hoàn toàn độc lập với ORM
    @Inject('USER_REPOSITORY') 
    private readonly userRepository: IUserRepository 
  ) {}

  async register(data: RegisterRequest) {
    // 1. Kiểm tra email tồn tại qua Adapter
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new RpcException({
        code: HttpStatus.CONFLICT,
        message: 'Email đã tồn tại',
      });
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. Tạo User mới qua Adapter
    const newUser = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'Đăng ký thành công',
      userId: newUser.id,
    };
  }

  async login(data: LoginRequest) {
    // Tìm user qua Adapter
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new RpcException({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new RpcException({
        code: HttpStatus.UNAUTHORIZED,
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    // TODO: Tạo JWT Token ở đây (dùng @nestjs/jwt)
    const fakeToken = `header.${user.id}.signature`;

    return {
      status: HttpStatus.OK,
      accessToken: fakeToken,
      refreshToken: 'refresh-token-placeholder',
    };
  }
}