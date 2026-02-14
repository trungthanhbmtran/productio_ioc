import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';
import { RpcExceptionFilter } from './common/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth', // Tên package trong file .proto
      // Trỏ ra ngoài root để lấy file proto chung
      protoPath: join(__dirname, '../../../packages/grpc-protos/proto/auth.proto'),
      url: '0.0.0.0:50051', // Port chạy trong Docker Container
    },
  });

  // Kích hoạt bộ lọc lỗi toàn cục cho gRPC
  app.useGlobalFilters(new RpcExceptionFilter());

  await app.listen();
  console.log('Auth Service is running on gRPC port 50051');
}
bootstrap();