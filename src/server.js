import express from "express";
import config from "./config/index.js";
import { connectDB } from "./db/index.js";
import { createSuperAdmin } from "./db/create-superadmin.js";
import AdminRouter from './routes/admin.route.js';
import TransportRouter from './routes/transport.route.js';
import TicketRouter from './routes/ticket.route.js';
import CustomerRouter from './routes/customer.route.js';
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());

await connectDB();
await createSuperAdmin();

app.use('/admin', AdminRouter);
app.use('/transport', TransportRouter);
app.use('/ticket', TicketRouter);
app.use('/customer', CustomerRouter);

app.use(cookieParser());


app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
