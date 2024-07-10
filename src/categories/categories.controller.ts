import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
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

  @Delete()
  deleteCategory(@Body('id') id: number): Promise<CategoriesEntity> {
    return this.categoriesService.deleteCategory(id);
  }
}
