import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async getAvailableCategories(): Promise<CategoriesEntity[]> {
    return await this.categoriesRepository.find();
  }

  async setCategory(category: CategoriesEntity): Promise<CategoriesEntity> {
    const newCategory = new CategoriesEntity();

    Object.assign(newCategory, category);

    return await this.categoriesRepository.save(newCategory);
  }

  async findOneById(id: number): Promise<CategoriesEntity | null> {
    return await this.categoriesRepository.findOne({ where: { id } });
  }
}
