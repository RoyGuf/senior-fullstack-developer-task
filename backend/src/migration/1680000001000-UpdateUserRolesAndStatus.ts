import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserRolesAndStatus1680000001000
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN roles TEXT
    `);

    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN new_status TEXT
    `);

    await queryRunner.query(`
      UPDATE users
      SET roles = json_array(role)
    `);

    await queryRunner.query(`
      UPDATE users
      SET new_status =
        CASE
          WHEN status = 1 THEN 'Enabled'
          ELSE 'Disabled'
        END
    `);

    await queryRunner.query(`
      CREATE TABLE users_temp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        roles TEXT NOT NULL,
        status TEXT NOT NULL
      )
    `);

    await queryRunner.query(`
      INSERT INTO users_temp (id, username, roles, status)
      SELECT id, username, roles, new_status FROM users
    `);

    await queryRunner.query(`DROP TABLE users`);
    await queryRunner.query(`ALTER TABLE users_temp RENAME TO users`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN role TEXT
    `);

    await queryRunner.query(`
      ALTER TABLE users ADD COLUMN old_status INTEGER
    `);

    await queryRunner.query(`
      UPDATE users
      SET role = json_extract(roles, '$[0]'),
          old_status = CASE
            WHEN status = 'Enabled' THEN 1
            ELSE 0
          END
    `);
  }
}
