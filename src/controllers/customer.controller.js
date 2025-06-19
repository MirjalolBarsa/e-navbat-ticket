import Customer from "../models/customer.model.js";
import { handleError } from "../helpers/error-handle.js";
import { successRes } from "../helpers/success-response.js";
import {
  confirmSignInCustomerValidator,
  signUpCustomerValidator,
  signInCustomerValidator,
} from "../validations/customer.validation.js";
import { Token } from "../utils/token-service.js";
import { generateOTP } from "../helpers/generate-otp.js";
import NodeCache from "node-cache";
import { transporter } from "../helpers/send-email.js";
import config from "../config/index.js";

const token = new Token();
const cache = new NodeCache();

export class CustomerController {
  async signUp(req, res) {
    try {
      const { value, error } = signUpCustomerValidator(req.body);
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
        maxAge: 30 * 24 * 60 * 60 * 1000, 
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

  async signIn(req, res) {
    try {
      const { value, error } = signInCustomerValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const email = value.email;
      const customer = await Customer.findOne({ email });
      if (!customer) {
        return handleError(res, "Customer not found", 404);
      }
      const otp = generateOTP();
      const mailOptions = {
        from: config.MAIL_USER,
        to: email,
        subject: "e-ticket",
        text: otp,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return handleError(res, "Error on sending to email", 400);
        } else {
          console.log(info);
        }
        cache.set(email, otp, 120);
        return successRes(res, {
          message: "OTP sent successfully to email",
        });
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async confirmSignIn(req, res) {
    try {
      const { value, error } = confirmSignInCustomerValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      const customer = await Customer.findOne({ email: value.email });
      if (!customer) {
        return handleError(res, "Customer not found", 404);
      }
      const cacheOTP = cache.get(value.email);
      if (!cacheOTP || cacheOTP != value.otp) {
        return handleError(res, "OTP expired", 400);
      }
      const payload = { id: customer.id };
      const accessToken = await token.generateAccessToken(payload);
      const refreshToken = await token.generateRefreshToken(payload);
      res.cookie("refreshTokenCustomer", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
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
