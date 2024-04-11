import { CategoriesModule } from '@app/categories/categories.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BalanceController } from './balance.controller';
import { BalanceEntity } from './balance.entity';
import { BalanceService } from './balance.service';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [TypeOrmModule.forFeature([BalanceEntity]), CategoriesModule],
})
export class BalanceModule {}
