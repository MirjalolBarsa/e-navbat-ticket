import Ticket from "../models/ticket.model.js";
import { handleError } from "../helpers/error-handle.js";
import { successRes } from "../helpers/success-response.js";
import {
  createTicketValidator,
  updateTicketValidator,
} from "../validations/ticket.validation.js";
import Transport from "../models/transport.model.js";
import { isValidObjectId } from "mongoose";

export class TicketController {
  async createTicket(req, res) {
    try {
      const { value, error } = createTicketValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      if (!isValidObjectId(value.transportId)) {
        return handleError(res, "Invalid transport ID", 400);
      }

      const existsTransport = await Transport.findById(value.transportId);
      if (!existsTransport) {
        return handleError(res, "Transport not found", 404);
      }

      const isBusy = await Ticket.findOne({
        seatNumber: value.seatNumber,
        transportId: value.transportId,
      });
      if (isBusy) {
        return handleError(res, "This seat is already booked", 400);
      }

      const ticket = await Ticket.create(value);
      return successRes(res, ticket, 201);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getAllTickets(_, res) {
    try {
      const tickets = await Ticket.find().populate("transportId");
      return successRes(res, tickets);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getTicketById(req, res) {
    try {
      const ticket = await TicketController.findTicketById(res, req.params.id);
      return successRes(res, ticket);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateTicket(req, res) {
    try {
      const id = req.params.id;
      await TicketController.findTicketById(res, id);

      const { value, error } = updateTicketValidator(req.body);
      if (error) {
        return handleError(res, error, 422);
      }

      if (value.seatNumber && value.transportId) {
        const isBusy = await Ticket.findOne({
          seatNumber: value.seatNumber,
          transportId: value.transportId,
        });
        if (isBusy && isBusy._id.toString() !== id) {
          return handleError(res, "This seat is already booked", 400);
        }
      }

      if (value.transportId) {
        if (!isValidObjectId(value.transportId)) {
          return handleError(res, "Invalid transport ID", 400);
        }
        const existsTransport = await Transport.findById(value.transportId);
        if (!existsTransport) {
          return handleError(res, "Transport not found", 404);
        }
      }

      const updatedTicket = await Ticket.findByIdAndUpdate(id, value, {
        new: true,
      });
      return successRes(res, updatedTicket);
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteTicket(req, res) {
    try {
      const id = req.params.id;
      await TicketController.findTicketById(res, id);
      await Ticket.findByIdAndDelete(id);
      return successRes(res, { message: "Ticket deleted successfully" });
    } catch (error) {
      return handleError(res, error);
    }
  }

  static async findTicketById(res, id) {
    try {
      if (!isValidObjectId(id)) {
        return handleError(res, "Invalid ObjectId", 400);
      }
      const ticket = await Ticket.findById(id).populate("transportId");
      if (!ticket) {
        return handleError(res, "Ticket not found", 404);
      }
      return ticket;
    } catch (error) {
      return handleError(res, error);
    }
  }
}
