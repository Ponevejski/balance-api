import { CategoriesService } from '@app/categories/categories.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BalanceEntity } from './balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
    private categoriesService: CategoriesService,
  ) {}

  async getBalance(currentUserId): Promise<BalanceEntity[]> {
    const data = await this.balanceRepository.find({
      where: { author: { id: currentUserId } },
    });

    return data.sort((a, b) => b.id - a.id);
  }

  async getTotalBalance(currentUserId): Promise<{ total: number }> {
    const balance = await this.balanceRepository.find({
      where: { author: { id: currentUserId } },
    });

    const total = balance.reduce((a, b) => a + b.amount, 0);

    return { total };
  }

  async setBalance(
    balance: BalanceEntity,
    currentUser,
  ): Promise<BalanceEntity> {
    const newBalance = new BalanceEntity();

    const category = await this.categoriesService.findOneById(
      balance.categoryId,
    );

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    Object.assign(newBalance, balance);

    newBalance.author = currentUser;
    newBalance.category = category;

    return await this.balanceRepository.save(newBalance);
  }

  async deleteBalance(id: number): Promise<string> {
    await this.balanceRepository.delete(id);

    return 'Successfully deleted balance with id: ' + id;
  }

  async updateBalance(
    id: number,
    balance: BalanceEntity,
  ): Promise<BalanceEntity> {
    const currentBalance = await this.balanceRepository.findOne({
      where: { id },
    });

    const category = await this.categoriesService.findOneById(
      balance.categoryId,
    );

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    Object.assign(currentBalance, balance);

    currentBalance.category = category;

    return await this.balanceRepository.save(currentBalance);
  }
}
