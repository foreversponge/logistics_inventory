import { injectable } from 'tsyringe';
import { ItemCreationDTO, ItemUpdateDTO } from '../dto/ItemDTOs';
import { CRUD } from './CRUDInterface';
import { Item } from '../models/Item';
import HttpError from '../errors/HttpError';

@injectable()
export default class ItemRepository implements CRUD {
  constructor() {
    console.log('Created new instance of ItemRepository');
  }

  public create = async (itemInfo: ItemCreationDTO): Promise<Item> => {
    try {
      const existingItem = await Item.findByPk(itemInfo.id)

      //Check if the a item with the ID in the request already exists
      if (existingItem) {
        throw new HttpError(400, `Item with ID ${itemInfo.id} already exists.`);
      } else {
        const createdItem = Item.build(itemInfo);
        await createdItem.save();
        console.log(`Added new item with ID #${createdItem.id}`);
        return Promise.resolve(createdItem);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public get = async (id: number): Promise<Item | null> => {
    try {
      const item = await Item.findByPk(id);
      console.log(`Item with ID ${id} has been retrieved`);
      return Promise.resolve(item);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public update = async (id: number, updatedItem: ItemUpdateDTO): Promise<number> => {
    try {
      const itemToUpdate = await Item.findByPk(id);
      // Check if the item that needs to be updated actually exists in the database
      if (itemToUpdate) {
        await Item.update(updatedItem, { where: { id: id } });
        console.log(`Item with ID ${id} has been updated`);
        return Promise.resolve(1);
      } else {
        throw new HttpError(400, `Item with ID ${id} does not exist.`);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public delete = async (id: number): Promise<number> => {
    try {
      const itemToDelete = await Item.findByPk(id);

      // Check if the item that needs to be deleted actually exists in the database
      if (itemToDelete) {
        await Item.destroy({ where: { id: id }});
        console.log(`Item with ID ${id} has been deleted.`);
        return Promise.resolve(1);
      } else {
        throw new HttpError(400, `Item with ID ${id} does not exist.`);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public getAll = async (): Promise<Item[]> => {
    try {
      const items = await Item.findAll();
      console.log(`All items have been retrieved`);
      return Promise.resolve(items);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };
}
