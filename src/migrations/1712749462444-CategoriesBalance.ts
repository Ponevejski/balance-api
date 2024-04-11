import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoriesBalance1712749462444 implements MigrationInterface {
    name = 'CategoriesBalance1712749462444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balance" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "categoryId" integer NOT NULL, "authorId" integer, CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_51a16c721d1ee369f6abffc5e17" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance" ADD CONSTRAINT "FK_a5e5826094bbc137569898c7535" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_a5e5826094bbc137569898c7535"`);
        await queryRunner.query(`ALTER TABLE "balance" DROP CONSTRAINT "FK_51a16c721d1ee369f6abffc5e17"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "balance"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
