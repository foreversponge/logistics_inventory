import "reflect-metadata";
import express from 'express';
import { RoutesConfig } from './routes/RoutesConfig';
import { AppSettings } from './config/AppSettings';
import debug from 'debug';
import cors from 'cors';
import { container } from 'tsyringe';
import { httpErrorMiddleware, failSafeHandler } from './middleware/ErrorMiddleware';
import { sequelize } from './config/sequelize';

import ItemRoute from './routes/ItemRoute';
import CollectionRoute from './routes/CollectionRoute';
import ItemCollectionRoute from './routes/ItemCollectionRoute';

const main = async () => {
  sequelize.authenticate().then(() => console.log('Authenticated on Sequelize'));

  const app: express.Application = express();

  const port = process.env.PORT || AppSettings.BACKEND_PORT;

  const routes: Array<RoutesConfig> = [];

  const debugLog: debug.IDebugger = debug('app');

  app.use(express.json());

  // Adding middleware to allow cross-origin requests
  app.use(cors());

  // Registering express app to tsyringe. This allows it to be injected in other classes.
  container.register<express.Application>('express-app', {
    useFactory: () => app,
  });

  // Instanciating the routes here:
  routes.push(container.resolve(ItemRoute));
  routes.push(container.resolve(CollectionRoute));
  routes.push(container.resolve(ItemCollectionRoute));

  // Middleware
  app.use(httpErrorMiddleware);
  app.use(failSafeHandler);

  app.listen(port, () => {
    routes.forEach((route: RoutesConfig) => {
      debugLog(`Routes configured for ${route.getName()}`);
    });

    console.log(`Server started on port ${port}`);
  });
};

//App start
main().catch((err) => {
  console.error(err);
});
