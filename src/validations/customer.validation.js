import Joi from "joi";

export const createCustomerValidator = (data) => {
  const customer = Joi.object({
    fullName: Joi.string().required(),
    phoneNumber: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .required(),
    address: Joi.string().optional(),
    gender: Joi.string().valid("male", "female").required(),
    age: Joi.number().required(),
  });
  return customer.validate(data);
};

export const updateCustomerValidator = (data) => {
  const customer = Joi.object({
    fullName: Joi.string().optional(),
    phoneNumber: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .optional(),
    address: Joi.string().optional(),
    gender: Joi.string().valid("male", "female").optional(),
    age: Joi.number().optional(),
  });
  return customer.validate(data);
};
