import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";

const controller = new CustomerController();
const router = Router();

router.post("/signup", controller.signUp);
export default router;
