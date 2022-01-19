import { injectable } from 'tsyringe';
import { ItemCreationDTO, ItemUpdateDTO, ItemDeleteDTO } from '../dto/ItemDTOs';
import ItemRepository from '../repositories/ItemRepository';
import { Item } from '../models/Item';

import debug from 'debug';
const log: debug.IDebugger = debug('app:itemService-example');

@injectable()
export class ItemService {
  constructor(private itemRepository: ItemRepository) {
    log('Created instance of ItemService');
  }

  public createItem = async (itemCreationDTO: ItemCreationDTO): Promise<Item> => {
    if (ItemService.noNullValuesItemCreationDTO(itemCreationDTO)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.itemRepository.create(itemCreationDTO);
  };

  public getItem = async (id: number): Promise<Item | null> => {
    return this.itemRepository.get(id);
  };

  public deleteItem = async (itemToDelete: ItemDeleteDTO): Promise<number> => {
    if (ItemService.noNullValuesItemDeleteDTO(itemToDelete)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.itemRepository.delete(itemToDelete.id);
  }

  public updateItem = async (id: number, updatedItem: ItemUpdateDTO): Promise <number> => {
    console.log(updatedItem)
    if (ItemService.noNullValuesItemUpdateDTO(updatedItem)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.itemRepository.update(id, updatedItem);
  }

  public getAllItems = async (): Promise<Item [] | null> => {
    return this.itemRepository.getAll();
  };

  public static noNullValuesItemCreationDTO = (itemCreationDTO: ItemCreationDTO): boolean => {
    if (
      itemCreationDTO === undefined ||
      !itemCreationDTO.id ||
      !itemCreationDTO.name ||
      !itemCreationDTO.description ||
      !itemCreationDTO.weight ||
      !itemCreationDTO.length ||
      !itemCreationDTO.height ||
      !itemCreationDTO.quantity
    ) {
      return true;
    }

    return false;
  };

  public static noNullValuesItemUpdateDTO = (itemCreationDTO: ItemUpdateDTO): boolean => {
    if (
      itemCreationDTO === undefined ||
      !itemCreationDTO.name ||
      !itemCreationDTO.description ||
      !itemCreationDTO.weight ||
      !itemCreationDTO.length ||
      !itemCreationDTO.height ||
      !itemCreationDTO.quantity
    ) {
      return true;
    }

    return false;
  };

  public static noNullValuesItemDeleteDTO = (itemCreationDTO: ItemDeleteDTO): boolean => {
    if (
      itemCreationDTO === undefined ||
      !itemCreationDTO.id
    ) {
      return true;
    }

    return false;
  };
}
