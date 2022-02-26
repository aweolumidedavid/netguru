import * as Joi from 'joi';

export const movieValidator = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': `"title" should be a type of 'text'`,
    'any.required': `"title" is a required field`,
  }),
});
