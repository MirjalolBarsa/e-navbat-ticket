import Customer from "../models/customer.model.js";
import { handleError } from "../helpers/error-handle.js";
import { successRes } from "../helpers/success-response.js";
import { createCustomerValidator } from "../validations/customer.validation.js";
import config from "../config/index.js";
import { Token } from "../utils/token-service.js";

const token = new Token();

export class CustomerController {
  async signUp(req, res) {
    try {
      const { value, error } = createCustomerValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      const existsPhone = await Customer.findOne({
        phoneNumber: value.phoneNumber,
      });
      if (existsPhone) {
        return handleError(res, "Phone number already registered", 409);
      }

      const customer = await Customer.create(value);
      const payload = { id: customer._id };

      const accessToken = await token.generateAccessToken(payload);
      const refreshToken = await token.generateRefreshToken(payload);

      res.cookie("refreshTokenCustomer", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      return successRes(
        res,
        {
          data: customer,
          token: accessToken,
        },
        201
      );
    } catch (error) {
      return handleError(res, error);
    }
  }
}
