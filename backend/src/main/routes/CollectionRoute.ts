import express from 'express';
import { RoutesConfig } from './RoutesConfig';
import { inject, injectable } from 'tsyringe';
import { CollectionService } from '../services/CollectionService';
import HttpError from '../errors/HttpError';

@injectable()
export default class CollectionRoute extends RoutesConfig {
  constructor(
    @inject('express-app') app: express.Application,
    private collectionService: CollectionService,
  ) {
    super(app, 'CollectionRoute');
  }

  configureRoutes(): express.Application {
    this.getApp()
      .route(`/collection`)
      .post(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const newCollection = await this.collectionService.createCollection(req.body);
            res.status(201).send(newCollection);
          } catch (err) {
            next(err);
          }
        }
      )

    this.getApp() 
      .route(`/collections`)
      .get(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const retrievedCollections = await this.collectionService.getAllCollections();
            if (retrievedCollections === null || retrievedCollections.length === 0) {
              next(new HttpError(200, `No collections were found.`));
            } else {
              res.status(200).send(retrievedCollections);
            }
          } catch (err) {
            next(err);
          }
        }
      );

    this.getApp()
      .route(`/collection/:id`)
      .get(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            const collection = await this.collectionService.getCollection(Number(req.params.id))

            if (collection === null) {
              next(new HttpError(200, `Collection with ID ${req.params.id} was not found.`));
            } else {
              res.status(200).send(collection);
            }
          } catch (err) {
            next(err);
          }
        }
      )
      .put(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            await this.collectionService.updateCollection(Number(req.params.id), req.body)
            res.status(200).send();
          } catch (err) {
            next(err);
          }
        }
      )
      .delete(
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
          try {
            await this.collectionService.deleteCollection({id: Number(req.params.id)});
            res.status(200).send();
          } catch (err) {
            next(err);
          }
        }
      );

    return this.getApp();
  }
}
