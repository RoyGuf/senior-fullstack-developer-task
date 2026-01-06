import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedUser1680000002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (username, roles, status)
      VALUES (
        'deleted_user',
        '["User"]',
        'deleted'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users WHERE username = 'deleted_user'
    `);
  }
}
