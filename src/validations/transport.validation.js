import Joi from "joi";

export const createTransportValidator = (data) => {
  const transport = Joi.object({
    name: Joi.string().required(),
    type: Joi.string().valid("bus", "train", "plane", "taxi").required(),
    capacity: Joi.number().integer().min(1).required(),
  });
  return transport.validate(data);
};

export const updateTransportValidator = (data) => {
  const transport = Joi.object({
    name: Joi.string().optional(),
    type: Joi.string().valid("bus", "train", "plane", "taxi").optional(),
    capacity: Joi.number().integer().min(1).optional(),
  });
  return transport.validate(data);
};
