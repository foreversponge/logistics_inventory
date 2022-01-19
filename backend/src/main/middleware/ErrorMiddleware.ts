import express from 'express';
import HttpError from '../errors/HttpError';

// Specific middleware to handle HTTP errors
const httpErrorMiddleware = ( err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction ): void => {
  const status = err.statusCode || 500;
  const message = err.message || 'Unexpected backend error';
  res.status(status).send({ status, message,});
};

// Any other type of error will fall back to this generic error
const failSafeHandler = ( err: any | Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.status(500).send(err);
};

export { httpErrorMiddleware, failSafeHandler };
