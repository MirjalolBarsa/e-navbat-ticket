import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find().populate("transport");
  res.json(tickets);
};

export const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate("transport");
  if (!ticket) return res.status(404).json({ message: "Not found" });
  res.json(ticket);
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) return res.status(404).json({ message: "Not found" });
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};
