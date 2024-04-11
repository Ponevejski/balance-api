import { CategoriesService } from '@app/categories/categories.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BalanceEntity } from './balance.entity';
import { BalanceQueriesInterface } from './types/balanceQueries.interface';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
    private categoriesService: CategoriesService,
    private dataSource: DataSource,
  ) {}

  async getBalance(
    currentUserId,
    query: BalanceQueriesInterface,
  ): Promise<BalanceEntity[]> {
    const queryBuilder = this.dataSource
      .getRepository(BalanceEntity)
      .createQueryBuilder('balance')
      .leftJoinAndSelect('balance.author', 'author')
      .leftJoinAndSelect('balance.category', 'category') // Добавляем связь с категорией
      .where('balance.author.id = :currentUserId', { currentUserId }) // Фильтруем по автору
      .orderBy('balance.createdAt', 'DESC');

    if (query.category) {
      // Используем точное сравнение вместо LIKE, так как у нас есть точное имя категории
      queryBuilder.andWhere('category.name = :categoryName', {
        categoryName: query.category,
      });
    }

    if (query.startDate && query.endDate) {
      queryBuilder.andWhere(
        'balance.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate: query.startDate,
          endDate: query.endDate,
        },
      );
    }

    // Возвращаем результат выполнения запроса
    return queryBuilder.getMany();
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
