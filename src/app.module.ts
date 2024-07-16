import ormconfig from '@app/ormconfig';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './balance/balance.module';
import { CategoriesModule } from './categories/categories.module';

import { GCloudModule } from './gcloud/gcloud.module';
import { AuthMiddleware } from './user/middlewares/auth.middlewares';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // global .env file
    }),
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1000000, // 1MB
      },
    }),
    GCloudModule,
    TypeOrmModule.forRoot(ormconfig),
    BalanceModule,
    UserModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
