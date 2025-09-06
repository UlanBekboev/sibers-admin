// src/models/Admin.ts
import { Table, Column, Model, DataType, Unique } from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({ tableName: "admins", timestamps: true })
export class Admin extends Model {
  @Unique
  @Column(DataType.STRING)
  username!: string;

  @Column(DataType.STRING)
  password!: string;

  // Метод проверки пароля
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
