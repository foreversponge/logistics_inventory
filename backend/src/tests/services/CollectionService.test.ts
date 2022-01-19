import 'reflect-metadata';
import { mock } from 'jest-mock-extended';
import { sequelizeMock } from '../helpers/SequelizeMock';
import CollectionRepository from '../../main/repositories/CollectionRepository';
import { container } from 'tsyringe';
import { CollectionCreationDTO } from '../../main/dto/CollectionDTOs';
import { Collection } from '../../main/models/Collection';
import { CollectionService } from '../../main/services/CollectionService';

describe('Tests for ItemService', () => {
  let collectionRepositoryMock: any = null;

  beforeAll(() => {
    sequelizeMock();
  });

  beforeEach(() => {
    collectionRepositoryMock = mock<CollectionRepository>();
    container.registerInstance(CollectionRepository, collectionRepositoryMock);
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('should create a collection', async () => {
    const COLLECTION_INFO: CollectionCreationDTO = {
      id: 1,
      name: "Collection Name",
      description: "Description of the collection"
    };

    collectionRepositoryMock.create.mockResolvedValue(
      Collection.build({
        id: COLLECTION_INFO.id,
        name: COLLECTION_INFO.name,
        description: COLLECTION_INFO.description
      })
    );

    const collectionService: CollectionService = container.resolve(CollectionService);
    const result = await collectionService.createCollection(COLLECTION_INFO);
    expect(result.id).toBe(COLLECTION_INFO.id);
    expect(result.name).toBe(COLLECTION_INFO.name);
    expect(result.description).toBe(COLLECTION_INFO.description);
  });

  it('missing data in request (id)', async () => {

    const COLLECTION_INFO_WITH_MISSING_ID  = {
      name: "Collection Name",
      description: "Description of the collection"
    };

    const collectionService: CollectionService = container.resolve(CollectionService);

    await expect(
      collectionService.createCollection(COLLECTION_INFO_WITH_MISSING_ID as CollectionCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in request (name)', async () => {

    const COLLECTION_INFO_WITH_MISSING_NAME = {
      id: 1,
      description: "Description of the collection"
    };

    const collectionService: CollectionService = container.resolve(CollectionService);

    await expect(
      collectionService.createCollection(COLLECTION_INFO_WITH_MISSING_NAME as CollectionCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in request (description)', async () => {

    const COLLECTION_INFO_WITH_MISSING_DESCRIPTION  = {
      id: 1,
      name: "Collection Name",
    };

    const collectionService: CollectionService = container.resolve(CollectionService);

    await expect(
      collectionService.createCollection(COLLECTION_INFO_WITH_MISSING_DESCRIPTION as CollectionCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });
});
