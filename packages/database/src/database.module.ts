import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrismaService } from './prisma/prisma.service';

// Import các Adapters
import { PrismaUserAdapter } from './adapters/prisma.adapter';
// import { TypeOrmUserAdapter } from './adapters/typeorm.adapter';
// import { SequelizeUserAdapter } from './adapters/sequelize.adapter';

@Global()
@Module({
  imports: [
    // 1. Cấu hình TypeORM
    TypeOrmModule.forRoot({ /* config ở đây */ }),
    // 2. Cấu hình Sequelize
    SequelizeModule.forRoot({ /* config ở đây */ }),
  ],
  providers: [
    PrismaService,
    {
      // TOKEN CHUNG CHO TOÀN DỰ ÁN
      provide: 'DATABASE_ADAPTER',

      /** * MẶC ĐỊNH DÙNG PRISMA
       * Muốn đổi sang TypeORM? Thay bằng TypeOrmUserAdapter
       * Muốn đổi sang Sequelize? Thay bằng SequelizeUserAdapter
       */
      useClass: PrismaUserAdapter, 
    },
  ],
  exports: ['DATABASE_ADAPTER', PrismaService],
})
export class DatabaseModule {}