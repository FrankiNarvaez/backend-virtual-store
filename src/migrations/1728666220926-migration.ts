import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728666220926 implements MigrationInterface {
    name = 'Migration1728666220926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "quantity"`);
    }

}
