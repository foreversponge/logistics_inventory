import { injectable } from 'tsyringe';
import { CollectionCreationDTO, CollectionUpdateDTO, CollectionDeletionDTO } from '../dto/CollectionDTOs';
import { CRUD } from './CRUDInterface';
import { Collection } from '../models/Collection';
import HttpError from '../errors/HttpError';

@injectable()
export default class CollectionRepository implements CRUD {
  constructor() {
    console.log('Created new instance of CollectionRepository');
  }

  public create = async (collectionInfo: CollectionCreationDTO): Promise<Collection> => {
    try {

      const existingCollection = await Collection.findByPk(collectionInfo.id)

      //Check if the a collection with the ID in the request already exists
      if (existingCollection) {
        throw new HttpError(400, `Collection with ID ${collectionInfo.id} already exists.`);
      } else {
        const createdCollection = Collection.build(collectionInfo);
        await createdCollection.save();
        console.log(`Added new collection with ID #${createdCollection.id}`);
        return Promise.resolve(createdCollection);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public get = async (id: number): Promise<Collection | null> => {
    try {
      const collection = await Collection.findByPk(id);
      console.log(`Collection with ID ${id} has been retrieved`);
      return Promise.resolve(collection);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public update = async (id: number, updatedCollection: CollectionUpdateDTO): Promise<number> => {
    try {
      const collectionToUpdate = await Collection.findByPk(id);
      // Check if the collection that needs to be updated actually exists in the database
      if (collectionToUpdate) {
        // Check if another collection already has the desired updated ID
        await Collection.update(updatedCollection, { where: { id: id } });
        console.log(`Collection with ID ${id} has been updated`);
        return Promise.resolve(1);
      } else {
        throw new HttpError(400, `Collection with ID ${id} does not exist.`);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public delete = async (deletedCollection: CollectionDeletionDTO): Promise<number> => {
    try {
      const collectionToDelete = await Collection.findByPk(deletedCollection.id);
      // Check if the collection that needs to be deleted actually exists in the database
      if (collectionToDelete) {
        await Collection.destroy({ where: { id: deletedCollection.id }});
        console.log(`Collection with ID ${deletedCollection.id} has been deleted.`);
        return Promise.resolve(1);
      } else {
        throw new HttpError(400, `Collection with ID ${deletedCollection.id} does not exist.`);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public getAll = async (): Promise<Collection[]> => {
    try {
      const Collections = await Collection.findAll();
      console.log(`All Collections have been retrieved`);
      return Promise.resolve(Collections);
    } catch (err: any) {
      return Promise.reject(err);
    }
  };
}
