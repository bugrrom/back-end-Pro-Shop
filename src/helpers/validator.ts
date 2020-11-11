// Core
import * as Ajv from 'ajv';
import { Response, Request, NextFunction } from 'express';
// Instruments
import { ValidationError } from './errors/validationError';

export const validator = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(req.body);

  if (valid) {
    next();
  } else {
    const errors = validate.errors?.map(({ message }) => message).join(', ');
    const body = JSON.stringify(req.body, null, 2);

    next(new ValidationError(`${req.method}: ${req.originalUrl} [ should have required property ]`));
  }
};
