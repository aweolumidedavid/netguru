import * as Joi from 'joi';

// define validation for all env variables
export const envValidationSchema = Joi.object({
  CONNECTION_STRING: Joi.string().trim().required(),
  PORT: Joi.number().default(4005),
  TOKEN_SECRET: Joi.string().required(),
});
