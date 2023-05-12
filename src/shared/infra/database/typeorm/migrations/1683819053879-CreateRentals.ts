import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1683819053879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rentals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "start_date",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "end_date",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "expected_return_date",
            type: "timestamp",
          },
          {
            name: "total",
            type: "float",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "fk_rentals_car_id",
            columnNames: ["car_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cars",
            onDelete: "CASCADE",
          },
          {
            name: "fk_rentals_user_id",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
          },
        ],
        indices: [
          {
            name: "idx_rentals_car_id",
            columnNames: ["car_id"],
          },
          {
            name: "idx_rentals_user_id",
            columnNames: ["user_id"],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rentals");
  }
}
