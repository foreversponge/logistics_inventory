import 'reflect-metadata';
import { mock } from 'jest-mock-extended';
import { sequelizeMock } from '../helpers/SequelizeMock';
import ItemCollectionRepository from '../../main/repositories/ItemCollectionRepository';
import { container } from 'tsyringe';
import { ItemCollectionDTO } from '../../main/dto/ItemCollectionDTOs';
import { ItemCollection } from '../../main/models/ItemCollection';
import { ItemCollectionService } from '../../main/services/ItemCollectionService';

describe('Tests for ItemService', () => {
  let collectionRepositoryMock: any = null;

  beforeAll(() => {
    sequelizeMock();
  });

  beforeEach(() => {
    collectionRepositoryMock = mock<ItemCollectionRepository>();
    container.registerInstance(ItemCollectionRepository, collectionRepositoryMock);
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('should create a collection', async () => {
    const ITEM_COLLECTION_INFO = {
      itemId: 1,
      collectionId: 1
    };

    collectionRepositoryMock.create.mockResolvedValue(
      ItemCollection.build({
        itemId: ITEM_COLLECTION_INFO.itemId,
        collectionId: ITEM_COLLECTION_INFO.collectionId,
      })
    );

    const collectionService: ItemCollectionService = container.resolve(ItemCollectionService);
    const result = await collectionService.createItemCollection(ITEM_COLLECTION_INFO as ItemCollectionDTO);
    expect(result.itemId).toBe(ITEM_COLLECTION_INFO.itemId);
    expect(result.collectionId).toBe(ITEM_COLLECTION_INFO.collectionId);
  });

  it('missing data in request (itemId)', async () => {

    const ITEM_COLLECTION_INFO_WITH_MISSING_ITEM_ID = {
      collectionId: 1
    };

    const collectionService: ItemCollectionService = container.resolve(ItemCollectionService);

    await expect(
      collectionService.createItemCollection(ITEM_COLLECTION_INFO_WITH_MISSING_ITEM_ID as ItemCollectionDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in request (collectionId)', async () => {

    const ITEM_COLLECTION_INFO_WITH_MISSING_COLLECTION_ID = {
      itemId: 1
    };

    const collectionService: ItemCollectionService = container.resolve(ItemCollectionService);

    await expect(
      collectionService.createItemCollection(ITEM_COLLECTION_INFO_WITH_MISSING_COLLECTION_ID as ItemCollectionDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });
});
