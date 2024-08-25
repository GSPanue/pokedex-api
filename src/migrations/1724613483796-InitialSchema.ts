import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1724613483796 implements MigrationInterface {
    name = 'InitialSchema1724613483796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weight" ("id" SERIAL NOT NULL, "kg" numeric(8,2) NOT NULL, CONSTRAINT "UQ_10ea9141fdfbb061b21a877cc98" UNIQUE ("kg"), CONSTRAINT "PK_d62a2bdd27e5c173f24c4c73a41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "japanese_name" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_401435fb0a5bdae0e4fb9e22e41" UNIQUE ("name"), CONSTRAINT "PK_27e615eadb0574b1cc12d2d77de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "german_name" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_a6a773b5eff049fd2f1d71126e7" UNIQUE ("name"), CONSTRAINT "PK_8afa5a0083c74b71db85c85116a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "name" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "japanese_name_id" integer NOT NULL, "german_name_id" integer NOT NULL, CONSTRAINT "UQ_7a3ed7dc473c4edd10b37236db1" UNIQUE ("name"), CONSTRAINT "PK_86c85ab0235bbe92757ce7a8f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type" ("id" SERIAL NOT NULL, "element" character varying NOT NULL, CONSTRAINT "UQ_c2072b723d5a628670d15027aa6" UNIQUE ("element"), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "height" ("id" SERIAL NOT NULL, "metres" numeric(8,2) NOT NULL, CONSTRAINT "UQ_2531b31ef24dba88499f0427062" UNIQUE ("metres"), CONSTRAINT "PK_90f1773799ae13708b533416960" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_1adf701cac3b2c0f8bacb54774b" UNIQUE ("name"), CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "generation" ("id" SERIAL NOT NULL, "number" integer NOT NULL, CONSTRAINT "UQ_15276dd6aa1941a8525acc2c92c" UNIQUE ("number"), CONSTRAINT "PK_58db1b8155c99c2604394ffef2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rarity" ("id" SERIAL NOT NULL, "level" character varying NOT NULL, CONSTRAINT "UQ_f9e2de0aeb60ba3872a75c7ca27" UNIQUE ("level"), CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ability" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_0fa99a1f1c7d4f40fe2220cf1f0" UNIQUE ("name"), CONSTRAINT "PK_5643559d435d01ec126981417a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "pokedex_id" integer NOT NULL, "name_id" integer NOT NULL, "generation_id" integer NOT NULL, "rarity_id" integer NOT NULL, "species_id" integer NOT NULL, "type_1_id" integer NOT NULL, "type_2_id" integer, "height_id" integer NOT NULL, "weight_id" integer NOT NULL, "ability_1_id" integer, "ability_2_id" integer, "ability_hidden_id" integer, CONSTRAINT "REL_9c078d057b2c0c820ef0a6fd85" UNIQUE ("name_id"), CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "name" ADD CONSTRAINT "FK_47051de1f7d29abafec4a362283" FOREIGN KEY ("japanese_name_id") REFERENCES "japanese_name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "name" ADD CONSTRAINT "FK_676c46f49ca5ed09d779d8a6c05" FOREIGN KEY ("german_name_id") REFERENCES "german_name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_9c078d057b2c0c820ef0a6fd85f" FOREIGN KEY ("name_id") REFERENCES "name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_500c56f49162b480e4c762aa5cb" FOREIGN KEY ("generation_id") REFERENCES "generation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_37a70786be38821fdebdf5584d5" FOREIGN KEY ("rarity_id") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_288f2760f77ad0cb1ba9b12d054" FOREIGN KEY ("species_id") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_40fa5089259688184b87aed6467" FOREIGN KEY ("type_1_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_c466a9f3c0116196496e12ef57f" FOREIGN KEY ("type_2_id") REFERENCES "type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_413a92b506da755c37561dce866" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_20218c554c694158ddd94307252" FOREIGN KEY ("weight_id") REFERENCES "weight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_33c932d1fe29db5c8f0ce1b6661" FOREIGN KEY ("ability_1_id") REFERENCES "ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_bb5e4f9292c5de508e120964fd1" FOREIGN KEY ("ability_2_id") REFERENCES "ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD CONSTRAINT "FK_25f5068ebdb9976bcc88d4d780d" FOREIGN KEY ("ability_hidden_id") REFERENCES "ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_25f5068ebdb9976bcc88d4d780d"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_bb5e4f9292c5de508e120964fd1"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_33c932d1fe29db5c8f0ce1b6661"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_20218c554c694158ddd94307252"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_413a92b506da755c37561dce866"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_c466a9f3c0116196496e12ef57f"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_40fa5089259688184b87aed6467"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_288f2760f77ad0cb1ba9b12d054"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_37a70786be38821fdebdf5584d5"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_500c56f49162b480e4c762aa5cb"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP CONSTRAINT "FK_9c078d057b2c0c820ef0a6fd85f"`);
        await queryRunner.query(`ALTER TABLE "name" DROP CONSTRAINT "FK_676c46f49ca5ed09d779d8a6c05"`);
        await queryRunner.query(`ALTER TABLE "name" DROP CONSTRAINT "FK_47051de1f7d29abafec4a362283"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
        await queryRunner.query(`DROP TABLE "ability"`);
        await queryRunner.query(`DROP TABLE "rarity"`);
        await queryRunner.query(`DROP TABLE "generation"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "height"`);
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "name"`);
        await queryRunner.query(`DROP TABLE "german_name"`);
        await queryRunner.query(`DROP TABLE "japanese_name"`);
        await queryRunner.query(`DROP TABLE "weight"`);
    }

}
