import { Schema, Types, model } from "mongoose";

const TicketSchema = new Schema(
  {
    passengerName: { type: String, required: true },
    transportId: { type: Types.ObjectId, ref: "Transport", required: true },
    date: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    seatNumber: { type: String }, // ixtiyoriy
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", TicketSchema);
export default Ticket;
