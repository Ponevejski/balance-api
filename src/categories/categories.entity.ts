import { BalanceEntity } from '@app/balance/balance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class CategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BalanceEntity, (balance) => balance.category)
  balance: BalanceEntity[];
}
