import { Schema, model } from "mongoose";

const CustomerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    address: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true },
    age: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Customer = model("Customer", CustomerSchema);
export default Customer;
