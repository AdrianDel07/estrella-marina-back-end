import { MigrationInterface, QueryRunner } from 'typeorm';

export class addingGroupField1625559969526 implements MigrationInterface {
  name = 'addingGroupField1625559969526';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dishes" ADD "group" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "group"`);
  }
}
