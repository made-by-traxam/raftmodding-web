import { MigrationInterface, QueryRunner } from "typeorm";

export class setup1672363782713 implements MigrationInterface {
    name = 'setup1672363782713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account-creation" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_8927b49ccbf8ebde845d17130a6" UNIQUE ("username"), CONSTRAINT "UQ_c856738110a3ded219d56ea3007" UNIQUE ("email"), CONSTRAINT "UQ_fb4f98f4d9600f8197541d9858c" UNIQUE ("token"), CONSTRAINT "PK_e92762da3eb2bb2a755fed9954b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discord-account-creations" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "discordUserId" character varying NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "token" character varying NOT NULL, "discordUserObject" json NOT NULL, CONSTRAINT "UQ_071193d10725557f2c656606550" UNIQUE ("discordUserId"), CONSTRAINT "PK_a8090c9b9d57e10ebedd46695a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discord-sign-ons" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "discordUserId" character varying NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "UQ_212cb3da829e0c822eeb5948b53" UNIQUE ("userId"), CONSTRAINT "UQ_8b1bbd0a815fa634ed8ce0d33ab" UNIQUE ("discordUserId"), CONSTRAINT "PK_e4363c13fe7bd4731b904851dac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "download-trackers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "ipHash" character varying(32) NOT NULL, "path" text NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_933e38f8ce862ce24ba95b5c5a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_0001d7dc7ade0ae01ff95220d0" ON "download-trackers" ("ipHash", "path") `);
        await queryRunner.query(`CREATE TABLE "file-scans" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileUrl" text NOT NULL, "scanId" character varying(96), "scanResult" json, CONSTRAINT "PK_c443d558fe974a2334f096bc8c2" PRIMARY KEY ("fileUrl"))`);
        await queryRunner.query(`CREATE TABLE "launcher-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "changelog" text NOT NULL, CONSTRAINT "PK_1178cd892d9fb2c9480ceeca1fc" PRIMARY KEY ("version"))`);
        await queryRunner.query(`CREATE TABLE "raft-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "version" character varying NOT NULL, "buildId" integer NOT NULL, "title" character varying, "releasedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_00c8f75d8f253380d0c13cbe538" UNIQUE ("version"), CONSTRAINT "PK_9b1b8bd67ef4c6e61d12c161fb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loader-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "rmlVersion" character varying NOT NULL, "raftVersionId" integer NOT NULL, "timestamp" TIMESTAMP NOT NULL, "readme" text, CONSTRAINT "REL_db84be34a7ac841123ba628729" UNIQUE ("raftVersionId"), CONSTRAINT "PK_ea1300e6a75f988f975901f75f7" PRIMARY KEY ("rmlVersion"))`);
        await queryRunner.query(`CREATE TABLE "plugin-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "pluginId" integer NOT NULL, "version" character varying(64) NOT NULL, "changelog" text NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "minServerVersionId" character varying(64) NOT NULL, "maxServerVersionId" character varying(64) NOT NULL, "definiteMaxServerVersion" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_256e878ed04ad061004215c5a85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_edea5a407dc3910a00ad40b498" ON "plugin-versions" ("pluginId", "version") `);
        await queryRunner.query(`CREATE TABLE "scheduled-plugin-deletions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "pluginId" integer NOT NULL, "deletionTime" TIMESTAMP, CONSTRAINT "UQ_b69ceb0e699e921843b147db81f" UNIQUE ("pluginId"), CONSTRAINT "REL_b69ceb0e699e921843b147db81" UNIQUE ("pluginId"), CONSTRAINT "PK_bfed2a621a5829fc26ac37083a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plugins" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "slug" character varying(64) NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "maintainerId" integer NOT NULL, "bannerImageUrl" text NOT NULL, "repositoryUrl" text, "deletionId" integer, CONSTRAINT "UQ_be05b99ec42163d07a0e74da7ec" UNIQUE ("slug"), CONSTRAINT "REL_ee6d4c34ac5b14a4ab01c7a509" UNIQUE ("maintainerId"), CONSTRAINT "REL_02132912339bf64c0c32c262ae" UNIQUE ("deletionId"), CONSTRAINT "PK_bb3d17826b76295957a253ba73e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user-privileges" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_00fa50968ef07c37f80df8e960d" UNIQUE ("username"), CONSTRAINT "PK_46cc82591ba610baff105957878" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod-bundles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "maintainerId" integer NOT NULL, "bannerImageUrl" text, CONSTRAINT "REL_d008daa6ea854857b2342053ed" UNIQUE ("maintainerId"), CONSTRAINT "PK_d5d005b186ab80b6b1e80856417" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "modId" character varying(64) NOT NULL, "version" character varying(64) NOT NULL, "changelog" text NOT NULL, "downloadUrl" text NOT NULL, "downloadCount" integer NOT NULL DEFAULT '0', "minRaftVersionId" integer, "maxRaftVersionId" integer, "definiteMaxRaftVersion" boolean NOT NULL, "fileHashes" json NOT NULL, CONSTRAINT "PK_c663ffff3d6480f79aa0e5dee6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_eaabf9277bab5a6ed4b6d50410" ON "mod-versions" ("modId", "version") `);
        await queryRunner.query(`CREATE TABLE "scheduled-mod-deletion" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "modId" character varying NOT NULL, "deletionTime" TIMESTAMP, CONSTRAINT "UQ_6e5cc4d5972c66a548dc69421b1" UNIQUE ("modId"), CONSTRAINT "REL_6e5cc4d5972c66a548dc69421b" UNIQUE ("modId"), CONSTRAINT "PK_a8712131bf534fa76fa38a36230" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mods" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" character varying(64) NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "readme" text NOT NULL, "category" character varying NOT NULL, "author" character varying NOT NULL, "bannerImageUrl" text, "iconImageUrl" text, "repositoryUrl" text, CONSTRAINT "PK_5e0ced6abe92940577832c70cd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modlikes" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "modId" character varying(64) NOT NULL, CONSTRAINT "REL_c367e96ab55f393dbe3d21dd11" UNIQUE ("userId"), CONSTRAINT "REL_aa7109fd23f7d19b9abb897753" UNIQUE ("modId"), CONSTRAINT "PK_c367e96ab55f393dbe3d21dd11e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "password-resets" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_6c763a1083194f4bafefd34656f" UNIQUE ("userId"), CONSTRAINT "UQ_c6302ad976ab8acead449a1be62" UNIQUE ("token"), CONSTRAINT "REL_6c763a1083194f4bafefd34656" UNIQUE ("userId"), CONSTRAINT "PK_c8513b8adc379b3679e1482c2fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "server-versions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" character varying NOT NULL, "raftVersion" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, "downloadUrl" text NOT NULL, "changelog" text, CONSTRAINT "PK_f23c80aabeb378893ed3ad00e3e" PRIMARY KEY ("version"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "token" character varying NOT NULL, "expires" TIMESTAMP NOT NULL, "userId" integer NOT NULL, "deviceInfo" json, CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token"), CONSTRAINT "REL_57de40bc620f456c7311aa3a1e" UNIQUE ("userId"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_57de40bc620f456c7311aa3a1e" ON "sessions" ("userId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e9f62f5dcb8a54b84234c9e7a0" ON "sessions" ("token") `);
        await queryRunner.query(`CREATE TABLE "ModBundleContents" ("modBundleId" integer NOT NULL, "modVersionId" integer NOT NULL, CONSTRAINT "PK_5aca43438c16a9e0493ecf46009" PRIMARY KEY ("modBundleId", "modVersionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1fda2df77d6e3f2625a3f335d7" ON "ModBundleContents" ("modBundleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8ded2644aa25bd4aec1913c48" ON "ModBundleContents" ("modVersionId") `);
        await queryRunner.query(`CREATE TABLE "ModLikes" ("modId" character varying(64) NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_da903536bf5328891f29eaec37e" PRIMARY KEY ("modId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4162bbea8098f0e3ac195778c9" ON "ModLikes" ("modId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c45bcc2a3faa1fd88434123a6b" ON "ModLikes" ("userId") `);
        await queryRunner.query(`ALTER TABLE "loader-versions" ADD CONSTRAINT "FK_db84be34a7ac841123ba6287294" FOREIGN KEY ("raftVersionId") REFERENCES "raft-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugin-versions" ADD CONSTRAINT "FK_bd6c3538634d8dc1fa8c83937ea" FOREIGN KEY ("pluginId") REFERENCES "plugins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled-plugin-deletions" ADD CONSTRAINT "FK_b69ceb0e699e921843b147db81f" FOREIGN KEY ("pluginId") REFERENCES "plugins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugins" ADD CONSTRAINT "FK_ee6d4c34ac5b14a4ab01c7a509c" FOREIGN KEY ("maintainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plugins" ADD CONSTRAINT "FK_02132912339bf64c0c32c262ae9" FOREIGN KEY ("deletionId") REFERENCES "scheduled-plugin-deletions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-bundles" ADD CONSTRAINT "FK_d008daa6ea854857b2342053ed6" FOREIGN KEY ("maintainerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mod-versions" ADD CONSTRAINT "FK_e9776cd7284068e7e80f43a835b" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "scheduled-mod-deletion" ADD CONSTRAINT "FK_6e5cc4d5972c66a548dc69421b1" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modlikes" ADD CONSTRAINT "FK_c367e96ab55f393dbe3d21dd11e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modlikes" ADD CONSTRAINT "FK_aa7109fd23f7d19b9abb8977530" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password-resets" ADD CONSTRAINT "FK_6c763a1083194f4bafefd34656f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" ADD CONSTRAINT "FK_1fda2df77d6e3f2625a3f335d7d" FOREIGN KEY ("modBundleId") REFERENCES "mod-bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" ADD CONSTRAINT "FK_e8ded2644aa25bd4aec1913c48e" FOREIGN KEY ("modVersionId") REFERENCES "mod-versions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ModLikes" ADD CONSTRAINT "FK_4162bbea8098f0e3ac195778c97" FOREIGN KEY ("modId") REFERENCES "mods"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ModLikes" ADD CONSTRAINT "FK_c45bcc2a3faa1fd88434123a6be" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ModLikes" DROP CONSTRAINT "FK_c45bcc2a3faa1fd88434123a6be"`);
        await queryRunner.query(`ALTER TABLE "ModLikes" DROP CONSTRAINT "FK_4162bbea8098f0e3ac195778c97"`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" DROP CONSTRAINT "FK_e8ded2644aa25bd4aec1913c48e"`);
        await queryRunner.query(`ALTER TABLE "ModBundleContents" DROP CONSTRAINT "FK_1fda2df77d6e3f2625a3f335d7d"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "password-resets" DROP CONSTRAINT "FK_6c763a1083194f4bafefd34656f"`);
        await queryRunner.query(`ALTER TABLE "modlikes" DROP CONSTRAINT "FK_aa7109fd23f7d19b9abb8977530"`);
        await queryRunner.query(`ALTER TABLE "modlikes" DROP CONSTRAINT "FK_c367e96ab55f393dbe3d21dd11e"`);
        await queryRunner.query(`ALTER TABLE "scheduled-mod-deletion" DROP CONSTRAINT "FK_6e5cc4d5972c66a548dc69421b1"`);
        await queryRunner.query(`ALTER TABLE "mod-versions" DROP CONSTRAINT "FK_e9776cd7284068e7e80f43a835b"`);
        await queryRunner.query(`ALTER TABLE "mod-bundles" DROP CONSTRAINT "FK_d008daa6ea854857b2342053ed6"`);
        await queryRunner.query(`ALTER TABLE "plugins" DROP CONSTRAINT "FK_02132912339bf64c0c32c262ae9"`);
        await queryRunner.query(`ALTER TABLE "plugins" DROP CONSTRAINT "FK_ee6d4c34ac5b14a4ab01c7a509c"`);
        await queryRunner.query(`ALTER TABLE "scheduled-plugin-deletions" DROP CONSTRAINT "FK_b69ceb0e699e921843b147db81f"`);
        await queryRunner.query(`ALTER TABLE "plugin-versions" DROP CONSTRAINT "FK_bd6c3538634d8dc1fa8c83937ea"`);
        await queryRunner.query(`ALTER TABLE "loader-versions" DROP CONSTRAINT "FK_db84be34a7ac841123ba6287294"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c45bcc2a3faa1fd88434123a6b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4162bbea8098f0e3ac195778c9"`);
        await queryRunner.query(`DROP TABLE "ModLikes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8ded2644aa25bd4aec1913c48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1fda2df77d6e3f2625a3f335d7"`);
        await queryRunner.query(`DROP TABLE "ModBundleContents"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e9f62f5dcb8a54b84234c9e7a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57de40bc620f456c7311aa3a1e"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "server-versions"`);
        await queryRunner.query(`DROP TABLE "password-resets"`);
        await queryRunner.query(`DROP TABLE "modlikes"`);
        await queryRunner.query(`DROP TABLE "mods"`);
        await queryRunner.query(`DROP TABLE "scheduled-mod-deletion"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaabf9277bab5a6ed4b6d50410"`);
        await queryRunner.query(`DROP TABLE "mod-versions"`);
        await queryRunner.query(`DROP TABLE "mod-bundles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user-privileges"`);
        await queryRunner.query(`DROP TABLE "plugins"`);
        await queryRunner.query(`DROP TABLE "scheduled-plugin-deletions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_edea5a407dc3910a00ad40b498"`);
        await queryRunner.query(`DROP TABLE "plugin-versions"`);
        await queryRunner.query(`DROP TABLE "loader-versions"`);
        await queryRunner.query(`DROP TABLE "raft-versions"`);
        await queryRunner.query(`DROP TABLE "launcher-versions"`);
        await queryRunner.query(`DROP TABLE "file-scans"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0001d7dc7ade0ae01ff95220d0"`);
        await queryRunner.query(`DROP TABLE "download-trackers"`);
        await queryRunner.query(`DROP TABLE "discord-sign-ons"`);
        await queryRunner.query(`DROP TABLE "discord-account-creations"`);
        await queryRunner.query(`DROP TABLE "account-creation"`);
    }

}
