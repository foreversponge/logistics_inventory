import { injectable } from 'tsyringe';
import { CollectionCreationDTO, CollectionUpdateDTO, CollectionDeletionDTO } from '../dto/CollectionDTOs';
import CollectionRepository from '../repositories/CollectionRepository';
import { Collection } from '../models/Collection';

@injectable()
export class CollectionService {
  constructor(private collectionRepository: CollectionRepository) {
    console.log('Created instance of CollectionService');
  }

  public createCollection = async (collectionCreationDTO: CollectionCreationDTO): Promise<Collection> => {
    if (CollectionService.noNullValuesCollectionCreationDTO(collectionCreationDTO)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.collectionRepository.create(collectionCreationDTO);
  };

  public getCollection = async (id: number): Promise<Collection | null> => {
    return this.collectionRepository.get(id);
  };

  public deleteCollection = async (deletedCollection: CollectionDeletionDTO): Promise<number> => {
    if (CollectionService.noNullValuesCollectionDeletionDTO(deletedCollection)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.collectionRepository.delete(deletedCollection);
  }

  public updateCollection = async (id: number, updatedCollection: CollectionUpdateDTO): Promise <number> => {
    if (CollectionService.noNullValuesCollectionUpdateDTO(updatedCollection)) {
      throw new Error("Data is missing some value(s).")
    }
    return this.collectionRepository.update(id, updatedCollection);
  }

  public getAllCollections = async (): Promise<Collection [] | null> => {
    return this.collectionRepository.getAll();
  };

  public static noNullValuesCollectionCreationDTO = (collectionCreationDTO: CollectionCreationDTO): boolean => {
    if (
      collectionCreationDTO === undefined ||
      !collectionCreationDTO.id ||
      !collectionCreationDTO.name ||
      !collectionCreationDTO.description
    ) {
      return true;
    }

    return false;
  };

  public static noNullValuesCollectionUpdateDTO = (collectionUpateDTO: CollectionUpdateDTO): boolean => {
    if (
      collectionUpateDTO === undefined ||
      !collectionUpateDTO.name ||
      !collectionUpateDTO.description
    ) {
      return true;
    }

    return false;
  };

  public static noNullValuesCollectionDeletionDTO = (collectionDeletionDTO: CollectionDeletionDTO): boolean => {
    if (
      collectionDeletionDTO === undefined ||
      !collectionDeletionDTO.id
    ) {
      return true;
    }

    return false;
  };
}
