import { Table, Column, Model, DataType, AllowNull, Sequelize } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,  // createdAt / updatedAt автоматически
  underscored: true,  // Sequelize сам будет искать created_at, updated_at, first_name и т.д. 
})
export class User extends Model<
  User,
  Partial<User>
> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true, // username должен быть уникальным
  })
  username!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: "first_name",
  })
  firstName!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: "last_name",
  })
  lastName!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM("male", "female"),
  })
  gender!: "male" | "female";

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
  })
  birthdate!: Date;

  @Column({ type: DataType.DATE, defaultValue: Sequelize.fn('NOW') })
  createdAt!: Date;

  @Column({ type: DataType.DATE, defaultValue: Sequelize.fn('NOW') })
  updatedAt!: Date;
}
