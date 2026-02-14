import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
// Import Database Module từ package chung (nếu bạn export Module)
// Hoặc import PrismaService trực tiếp trong AuthModule
import { DatabaseModule } from '@my-repo/database'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env
    DatabaseModule, // Kết nối DB chung
    AuthModule,     // Module nghiệp vụ chính
  ],
})
export class AppModule {}