import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedDb1712578692250 implements MigrationInterface {
  name = 'CreateSeedDb1712578692250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('Anton', 'foo@gmail.com', '$2b$10$Cz04CzSP84DtgY1tzRyj8uHu0Nkb6ulbKirOYNF/RRcxu/0I3Kgbm')`,
    );

    await queryRunner.query(`INSERT INTO categories (name) VALUES ('Default')`);

    await queryRunner.query(
      `INSERT INTO balance (amount, description, "authorId", "categoryId") VALUES ('20', 'Initial description', 1, 1)`,
    );
  }

  public async down(): Promise<void> {}
}
