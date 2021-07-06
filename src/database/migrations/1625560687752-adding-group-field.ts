import {MigrationInterface, QueryRunner} from "typeorm";

export class addingGroupField1625560687752 implements MigrationInterface {
    name = 'addingGroupField1625560687752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" ADD "group" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "group"`);
    }

}
