import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
