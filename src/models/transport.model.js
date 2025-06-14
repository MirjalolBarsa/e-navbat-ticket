import { Schema, model } from "mongoose";

const transportSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["bus", "train", "taxi", "plane"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

 const Transport =  model("Transport", transportSchema);

 export default Transport;
