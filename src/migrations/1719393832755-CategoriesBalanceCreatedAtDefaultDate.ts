import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriesBalanceCreatedAtDefaultDate1719393832755
  implements MigrationInterface
{
  name = 'CategoriesBalanceCreatedAtDefaultDate1719393832755';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "balance" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "balance" ALTER COLUMN "createdAt" SET DEFAULT '2024-04-11 00:00:00'`,
    );
  }
}
