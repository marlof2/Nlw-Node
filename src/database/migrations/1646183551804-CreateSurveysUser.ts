import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUser1646183551804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "user_id",
            type: "varchar",
            generationStrategy: "uuid",
          },
          {
            name: "surveys_id",
            type: "varchar",
            generationStrategy: "uuid",
          },
          {
            name: "value",
            type: "numeric",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_user",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_surveys",
            referencedTableName: "surveys",
            referencedColumnNames: ["id"],
            columnNames: ["surveys_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_users");
  }
}
