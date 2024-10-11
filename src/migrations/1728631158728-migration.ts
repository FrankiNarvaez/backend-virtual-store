import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728631158728 implements MigrationInterface {
    name = 'Migration1728631158728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_f258ce2f670b34b38630914cf9e"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "FK_28a5d29a619b7b69b1abfff3f12"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "FK_65e5d99c0fd33a42cf75ebd23c7"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_2486032b4fc81da82629c53f955" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_f258ce2f670b34b38630914cf9e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "FK_28a5d29a619b7b69b1abfff3f12" FOREIGN KEY ("shopping_cart_id") REFERENCES "shopping_cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "FK_65e5d99c0fd33a42cf75ebd23c7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "FK_65e5d99c0fd33a42cf75ebd23c7"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" DROP CONSTRAINT "FK_28a5d29a619b7b69b1abfff3f12"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_f258ce2f670b34b38630914cf9e"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" DROP CONSTRAINT "FK_2486032b4fc81da82629c53f955"`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "FK_65e5d99c0fd33a42cf75ebd23c7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart_products" ADD CONSTRAINT "FK_28a5d29a619b7b69b1abfff3f12" FOREIGN KEY ("shopping_cart_id") REFERENCES "shopping_cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_f258ce2f670b34b38630914cf9e" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_2d58e8bd11dc840b39f99824d84" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shopping_cart" ADD CONSTRAINT "FK_2486032b4fc81da82629c53f955" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
