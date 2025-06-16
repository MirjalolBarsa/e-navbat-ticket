import Joi from "joi";

export const createTicketValidator = (data) => {
  const ticket = Joi.object({
    passengerName: Joi.string().required(),
    transportId: Joi.string().required(),
    date: Joi.date().required(),
    price: Joi.number().min(0).required(),
    seatNumber: Joi.string().optional(),
  });
  return ticket.validate(data);
};

export const updateTicketValidator = (data) => {
  const ticket = Joi.object({
    passengerName: Joi.string().optional(),
    transportId: Joi.string().optional(),
    date: Joi.date().optional(),
    price: Joi.number().min(0).optional(),
    seatNumber: Joi.string().optional(),
  });
  return ticket.validate(data);
};
