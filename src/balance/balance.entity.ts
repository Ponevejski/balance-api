import { CategoriesEntity } from '@app/categories/categories.entity';
import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const defaultDate = new Date(Date.now()).toLocaleString().split(',')[0];

@Entity({ name: 'balance' })
export class BalanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column({ default: defaultDate })
  data: Date;

  @Column()
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;

  @ManyToOne(() => CategoriesEntity, (category) => category.name, {
    eager: true,
  })
  category: CategoriesEntity;
}
