import { Schema, model } from "mongoose";

const transportSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["bus", "train", "plane", "taxi"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

transportSchema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "ticketId",
});

const Transport = model("Transport", transportSchema);

export default Transport;
