import { isValidObjectId } from "mongoose";
import { handleError } from "../helpers/error-handle.js";
import { successRes } from "../helpers/success-response.js";
import Transport from "../models/transport.model.js";
import {
  createTransportValidator,
  updateTransportValidator,
} from "../validations/transport.validation.js";
import Ticket from "../models/ticket.model.js";

export class TransportController {
  async createTransport(req, res) {
    try {
      const { value, error } = createTransportValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const transport = await Transport.create(value);
      return successRes(res, transport, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAllTransports(_, res) {
    try {
      const transports = await Transport.find().populate("tickets");
      return successRes(res, transports);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getTransportById(req, res) {
    try {
      const transport = await TransportController.findTransportById(
        res,
        req.params.id
      );
      return successRes(res, transport);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateTransport(req, res) {
    try {
      const { value, error } = updateTransportValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }
      const id = req.params.id;
      await TransportController.findTransportById(res, id);
      const updatedTransport = await Transport.findByIdAndUpdate(id, value, {
        new: true,
      });
      return successRes(res, updatedTransport);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteTransport(req, res) {
    try {
      const id = req.params.id;
      await TransportController.findTransportById(res, id);
      await Transport.findByIdAndDelete(id);
      await Ticket.deleteMany({ transportId: id });
      return successRes(res, { message: "Transport deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async findTransportById(res, id) {
    try {
      if (!isValidObjectId(id)) {
        return handleError(res, "Invalid object ID", 400);
      }
      const transport = await Transport.findById(id).populate("tickets");
      if (!transport) {
        return handleError(res, "Transport not found", 404);
      }
      return transport;
    } catch (error) {
      return handleError(res, error);
    }
  }
}
