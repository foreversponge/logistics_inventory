import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Item extends Model {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  weight!: number;

  @Column
  length!: number;

  @Column
  height!: number;

  @Column
  quantity!: number;
}
