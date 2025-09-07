import { Table, Column, Model, DataType, AllowNull, Sequelize } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true, // Automatically adds createdAt and updatedAt columns
  underscored: true, // Convert camelCase fields to snake_case in DB (first_name, created_at, etc.)
})
export class User extends Model<User, Partial<User>> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true, // username must be unique
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
    field: 'first_name',
  })
  firstName!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'last_name',
  })
  lastName!: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('male', 'female'),
  })
  gender!: 'male' | 'female';

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
