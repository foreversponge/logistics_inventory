import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Item } from './Item';
import { Collection } from './Collection';

@Table({ timestamps: false })
export class ItemCollection extends Model {
  @PrimaryKey
  @ForeignKey(() => Item)
  @Column
  itemId!: number;

  @BelongsTo(() => Item)
  item!: Item

  @PrimaryKey
  @ForeignKey(() => Collection)
  @Column
  collectionId!: number;

  @BelongsTo(() => Collection)
  collection!: Collection
}
