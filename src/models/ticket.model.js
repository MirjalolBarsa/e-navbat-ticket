import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    transport: {
      type: Schema.Types.ObjectId,
      ref: "Transport",
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);
export default Ticket;
