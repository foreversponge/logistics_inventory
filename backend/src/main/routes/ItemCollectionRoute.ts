import express from 'express';
import { RoutesConfig } from './RoutesConfig';
import { inject, injectable } from 'tsyringe';
import { ItemCollectionService } from '../services/ItemCollectionService';
import HttpError from '../errors/HttpError';

@injectable()
export default class ItemCollectionRoute extends RoutesConfig {
  constructor(
    @inject('express-app') app: express.Application,
    private itemCollectionService: ItemCollectionService,
  ) {
    super(app, 'ItemCollectionRoute');
  }

  configureRoutes(): express.Application {
    this.getApp()
      .route(`/itemCollection`)
      .post(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const newItemCollection = await this.itemCollectionService.createItemCollection(req.body);
            res.status(201).send(newItemCollection);
          } catch (err) {
            next(err);
          }
        }
      )

    this.getApp() 
      .route(`/itemCollections`)
      .get(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const retrievedItemCollections = await this.itemCollectionService.getAllItemCollections();

            if (retrievedItemCollections === null || retrievedItemCollections.length === 0) {
              next(new HttpError(200, `No collections were found.`));
            } else {
              res.status(200).send(retrievedItemCollections);
            }
          } catch (err) {
            next(err);
          }
        }
      );

    this.getApp()
      .route(`/itemCollection/:itemId/:collectionId`)
      .delete(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            await this.itemCollectionService.deleteItemCollection(Number(req.params.itemId),Number(req.params.collectionId));
            res.status(200).send();
          } catch (err) {
            next(err);
          }
        }
      );

    return this.getApp();
  }
}
