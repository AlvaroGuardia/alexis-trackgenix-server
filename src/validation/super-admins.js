import Joi from 'joi';

const stringPattern = /^[a-zA-Z]*$/;

const validateCreation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().regex(stringPattern).min(3).required(),
    lastName: Joi.string().regex(stringPattern).min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    active: Joi.boolean().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      error: validation.error.details[0],
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().regex(stringPattern).min(3),
    lastName: Joi.string().regex(stringPattern).min(3),
    email: Joi.string().email(),
    password: Joi.string().min(8).alphanum(),
    active: Joi.boolean(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'There was an error during the request validation',
      error: validation.error.details[0],
    });
  }
  return next();
};

export default {
  validateCreation,
  validateUpdate,
};
