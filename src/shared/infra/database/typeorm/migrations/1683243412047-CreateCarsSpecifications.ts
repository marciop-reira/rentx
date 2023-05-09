import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateCarsSpecifications1683243412047
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars_specifications",
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_cars_specifications_car_id",
            columnNames: ["car_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cars",
            onDelete: "CASCADE",
          }),
          new TableForeignKey({
            name: "fk_cars_specifications_specification_id",
            columnNames: ["specification_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "specifications",
            onDelete: "CASCADE",
          }),
        ],
        indices: [
          new TableIndex({
            name: "idx_cars_specifications_car_id",
            columnNames: ["car_id"],
          }),
          new TableIndex({
            name: "idx_cars_specifications_specification_id",
            columnNames: ["specification_id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars_specifications");
  }
}
