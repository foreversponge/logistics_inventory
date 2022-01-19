import 'reflect-metadata';
import { mock } from 'jest-mock-extended';
import { sequelizeMock } from '../helpers/SequelizeMock';
import ItemRepository from '../../main/repositories/ItemRepository';
import { container } from 'tsyringe';
import { ItemCreationDTO } from '../../main/dto/ItemDTOs';
import { Item } from '../../main/models/Item';
import { ItemService } from '../../main/services/ItemService';

describe('ItemService tests', () => {
  let itemRepositoryMock:any = null;

  beforeAll(() => {
    sequelizeMock();
  });

  beforeEach(() => {
    itemRepositoryMock = mock<ItemRepository>();
    container.registerInstance(ItemRepository, itemRepositoryMock);
  });

  afterEach(() => {
    container.clearInstances();
  });

  it('create an item', async () => {
    const ITEM_INFO: ItemCreationDTO = {
        id: 1,
        name: "Full Name",
        description: "Description",
        weight: 1,
        length: 1,
        height: 1,
        quantity: 10
    };

    itemRepositoryMock.create.mockResolvedValue(
      Item.build({
        id: ITEM_INFO.id,
        name: ITEM_INFO.name,
        description: ITEM_INFO.description,
        weight: ITEM_INFO.weight,
        length: ITEM_INFO.length,
        height: ITEM_INFO.height,
        quantity: ITEM_INFO.quantity
      })
    );

    const itemService: ItemService = container.resolve(ItemService);
    const result = await itemService.createItem(ITEM_INFO);
    expect(result.id).toBe(ITEM_INFO.id);
    expect(result.name).toBe(ITEM_INFO.name);
    expect(result.description).toBe(ITEM_INFO.description);
    expect(result.weight).toBe(ITEM_INFO.weight);
    expect(result.length).toBe(ITEM_INFO.length);
    expect(result.height).toBe(ITEM_INFO.height);
    expect(result.quantity).toBe(ITEM_INFO.quantity);
  });

  it('missing data in create request (id)', async () => {

    const ITEM_INFO_WITH_MISSING_ID = {
        name: "Full Name",
        description: "Description",
        weight: 1,
        length: 1,
        height: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_ID as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in create request (name)', async () => {

    const ITEM_INFO_WITH_MISSING_NAME = {
        id: 1,
        description: "Description",
        weight: 1,
        length: 1,
        height: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_NAME as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in create request (description)', async () => {

    const ITEM_INFO_WITH_MISSING_DESCRIPTION = {
        id: 1,
        name: "Full Name",
        weight: 1,
        length: 1,
        height: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_DESCRIPTION as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in create request (weight)', async () => {

    const ITEM_INFO_WITH_MISSING_WEIGHT = {
        id: 1,
        name: "Full Name",
        description: "Description",
        length: 1,
        height: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_WEIGHT as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in create request (length)', async () => {

    const ITEM_INFO_WITH_MISSING_LENGTH = {
        id: 1,
        name: "Full Name",
        description: "Description",
        weight: 1,
        height: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_LENGTH as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  it('missing data in create request (height)', async () => {

    const ITEM_INFO_WITH_MISSING_HEIGHT = {
        id: 1,
        name: "Full Name",
        description: "Description",
        weight: 1,
        length: 1,
        quantity: 10
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_HEIGHT as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });

  
  it('missing data in create request (quantity)', async () => {

    const ITEM_INFO_WITH_MISSING_QUANTITY = {
        id: 1,
        name: "Full Name",
        description: "Description",
        weight: 1,
        length: 1,
        height: 1
    };

    const itemService: ItemService = container.resolve(ItemService);

    await expect(
        itemService.createItem(ITEM_INFO_WITH_MISSING_QUANTITY as ItemCreationDTO)
      ).rejects.toThrowError('Data is missing some value(s).');
  });
});
