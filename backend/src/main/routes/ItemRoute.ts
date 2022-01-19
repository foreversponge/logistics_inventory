import express from 'express';
import { RoutesConfig } from './RoutesConfig';
import { inject, injectable } from 'tsyringe';
import { ItemService } from '../services/ItemService';
import HttpError from '../errors/HttpError';

@injectable()
export default class ItemRoute extends RoutesConfig {
  constructor(
    @inject('express-app') app: express.Application,
    private itemService: ItemService,
  ) {
    super(app, 'ItemRoute');
  }

  configureRoutes(): express.Application {
    this.getApp()
      .route(`/item`)
      .post(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const newItem = await this.itemService.createItem(req.body);
            res.status(201).send(newItem);
          } catch (err) {
            next(err);
          }
        }
      )

    this.getApp()   
      .route(`/items`)
      .get(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const retrievedItems = await this.itemService.getAllItems();

            if (retrievedItems === null || retrievedItems.length === 0) {
              next(new HttpError(200, `No items were found.`));
            } else {
              res.status(200).send(retrievedItems);
            }
          } catch (err) {
            next(err);
          }
        }
      );

    this.getApp()
      .route(`/item/:id`)
      .get(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const item = await this.itemService.getItem(Number(req.params.id))

            if (item === null) {
              next(new HttpError(200, `Item with ID ${req.params.id} was not found.`));
            } else {
              res.status(200).send(item);
            }
          } catch (err) {
            next(err);
          }
        }
      )
      .put(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            await this.itemService.updateItem(Number(req.params.id), req.body)
            res.status(200).send();
          } catch (err) {
            next(err);
          }
        }
      )
      .delete(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            await this.itemService.deleteItem({id: Number(req.params.id)});
            res.status(200).send();
          } catch (err) {
            next(err);
          }
        }
      );

    return this.getApp();
  }
}
