import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BalanceEntity } from './balance.entity';
import { BalanceService } from './balance.service';
import { BalanceQueriesInterface } from './types/balanceQueries.interface';
import { PostOwnerGuard } from '@app/user/guards/owner.guard';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getBalance(
    @User('id') currentUserId: number,
    @Query() query: BalanceQueriesInterface,
  ) {
    return await this.balanceService.getBalance(currentUserId, query);
  }

  @Get('total')
  @UseGuards(AuthGuard)
  async getTotalBalance(
    @User('id') currentUserId: number,
    @Query() query: BalanceQueriesInterface,
  ) {
    return await this.balanceService.getTotalBalance(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  async setBalance(
    @Body() balance: BalanceEntity,
    @User() currentUser: UserEntity,
  ): Promise<BalanceEntity> {
    return await this.balanceService.setBalance(balance, currentUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteBalance(@Param('id') id: number): Promise<string> {
    return await this.balanceService.deleteBalance(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, PostOwnerGuard)
  async updateBalance(
    @Param('id') id: number,
    @Body() balance: BalanceEntity,
  ): Promise<BalanceEntity> {
    return await this.balanceService.updateBalance(id, balance);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getBalanceById(@Param('id') id: number) {
    return await this.balanceService.findOneById(id);
  }
}
