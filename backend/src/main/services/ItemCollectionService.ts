import { injectable } from 'tsyringe';
import { ItemCollectionDTO } from '../dto/ItemCollectionDTOs';
import ItemCollectionRepository from '../repositories/ItemCollectionRepository';
import { ItemCollection } from '../models/ItemCollection';

@injectable()
export class ItemCollectionService {
  constructor(private itemCollectionRepository: ItemCollectionRepository) {
    console.log('Created instance of ItemCollectionService');
  }

  public createItemCollection = async (itemCollectionCreationDTO: ItemCollectionDTO): Promise<ItemCollection> => {
    if (ItemCollectionService.noNullValuesItemCollectionCreationDTO(itemCollectionCreationDTO)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.itemCollectionRepository.create(itemCollectionCreationDTO);
  };

  public deleteItemCollection = async (itemId: number, collectionId: number): Promise<number> => {
    return this.itemCollectionRepository.delete({itemId: itemId, collectionId: collectionId});
  }

  public getAllItemCollections = async (): Promise<ItemCollection [] | null> => {
    return this.itemCollectionRepository.getAll();
  };

  public static noNullValuesItemCollectionCreationDTO = (itemCollectionCreationDTO: ItemCollectionDTO): boolean => {
    if (
      itemCollectionCreationDTO === undefined ||
      !itemCollectionCreationDTO.itemId ||
      !itemCollectionCreationDTO.collectionId
    ) {
      return true;
    }

    return false;
  };
}
