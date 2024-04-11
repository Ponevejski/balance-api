import { BalanceEntity } from '@app/balance/balance.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert() // run before insert data, in that case we hash password before insert data
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => BalanceEntity, (balance) => balance.author)
  articles: BalanceEntity[];
}
