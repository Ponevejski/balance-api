import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  @UseGuards(AuthGuard)
  setCategory(@Body() category: CategoriesEntity): Promise<CategoriesEntity> {
    return this.categoriesService.setCategory(category);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteCategory(@Param('id') id: number): Promise<CategoriesEntity> {
    return this.categoriesService.deleteCategory(id);
  }
}
