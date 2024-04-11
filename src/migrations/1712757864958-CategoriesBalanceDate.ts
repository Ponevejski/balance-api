import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesBalanceDate1712757864958 implements MigrationInterface {
    name = 'CategoriesBalanceDate1712757864958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" ADD "data" TIMESTAMP NOT NULL DEFAULT '4/10/2024'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" DROP COLUMN "data"`);
    }

}
