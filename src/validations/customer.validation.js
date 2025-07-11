import Joi from "joi";

export const signUpCustomerValidator = (data) => {
  const customer = Joi.object({
    phoneNumber: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .required(),
    email: Joi.string().email().required(),
  });
  return customer.validate(data);
};

export const signInCustomerValidator = (data) => {
  const customer = Joi.object({
    email: Joi.string().required(),
  });
  return customer.validate(data);
};

export const confirmSignInCustomerValidator = (data) => {
  const customer = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required(),
  });
  return customer.validate(data);
};

export const updateCustomerValidator = (data) => {
  const customer = Joi.object({
    phoneNumber: Joi.string()
      .regex(/^\+998\s?(9[012345789]|3[3]|7[1])\s?\d{3}\s?\d{2}\s?\d{2}$/)
      .optional(),
  });
  return customer.validate(data);
};
