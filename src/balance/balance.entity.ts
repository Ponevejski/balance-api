import { CategoriesEntity } from '@app/categories/categories.entity';
import { UserEntity } from '@app/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'balance' })
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.name, {
    eager: true,
  })
  category: CategoriesEntity;
}
