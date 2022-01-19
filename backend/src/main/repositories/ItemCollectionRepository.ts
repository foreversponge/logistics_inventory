import { injectable } from 'tsyringe';
import { ItemCollectionDTO } from '../dto/ItemCollectionDTOs';
import { ItemCollection } from '../models/ItemCollection';
import HttpError from '../errors/HttpError';
import { Collection } from '../models/Collection';

@injectable()
export default class ItemCollectionRepository {
  constructor() {
    console.log('Created new instance of ItemCollection');
  }

  public create = async (itemCollectionInfo: ItemCollectionDTO): Promise<ItemCollection> => {
    try {

      const existingItemCollection = await ItemCollection.findOne({
        where: {
          itemId: itemCollectionInfo.itemId,
          collectionId: itemCollectionInfo.collectionId
        }
      })
    
      //Check if the the item collection in the request already exists
      if (existingItemCollection) {
        throw new HttpError(400, `Item Collection already exists.`);
      } else {
        const createdItemCollection = ItemCollection.build(itemCollectionInfo);
        await createdItemCollection.save();
        console.log(`Added category #${createdItemCollection.id} to item #${createdItemCollection.itemId}`);
        return Promise.resolve(createdItemCollection);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };

  public delete = async (itemCollectionInfo: ItemCollectionDTO): Promise<number> => {
    try {

      const itemCollectionToDelete = await ItemCollection.findOne({
        where: {
          itemId: itemCollectionInfo.itemId,
          collectionId: itemCollectionInfo.collectionId
        }
      });

      // Check if the collection that needs to be deleted actually exists in the database
      if (itemCollectionToDelete) {
        await ItemCollection.destroy({ 
          where: { 
            itemId: itemCollectionInfo.itemId,
            collectionId: itemCollectionInfo.collectionId
          }
        });
        console.log(`Item Collection has been deleted.`);
        return Promise.resolve(1);
      } else {
        throw new HttpError(400, `Item Collection does not exist.`);
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  };
  
  public getAll = async (): Promise<ItemCollection[]> => {
    try {
      // Get the item collections along with the name of the collection
      const itemCollections = await ItemCollection.findAll(
        {
          include: [
            {
              model: Collection,
              attributes: ["name"]
            }
          ]
        }
      );
      console.log(`All Item Collections have been retrieved`);
      return Promise.resolve(itemCollections);
    } catch (err: any) {
      console.log(err)
      return Promise.reject(err);
    }
  };
}
