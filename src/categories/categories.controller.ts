import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesEntity } from './categories.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAvailableCategories(): Promise<CategoriesEntity[]> {
    return this.categoriesService.getAvailableCategories();
  }

  @Post()
  setCategory(@Body() category: CategoriesEntity): Promise<CategoriesEntity> {
    return this.categoriesService.setCategory(category);
  }
}
