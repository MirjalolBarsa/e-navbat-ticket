import express from "express";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import transportRouter from "./routes/transport.route.js"
import ticketRouter from "./routes/ticket.route.js"
config(); // .env ni o‘qish
const app = express();
app.use(express.json());

await connectDB(); // bu yerda MONGO_URI ishlatiladi

const PORT = process.env.PORT || 5000;

app.use("/transport", transportRouter);
app.use("/ticket", ticketRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
