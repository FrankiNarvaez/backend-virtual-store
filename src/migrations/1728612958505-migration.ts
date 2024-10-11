import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728612958505 implements MigrationInterface {
    name = 'Migration1728612958505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "UQ_2486032b4fc81da82629c53f955" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_2486032b4fc81da82629c53f955" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "UQ_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP COLUMN "user_id"`);
    }

}
