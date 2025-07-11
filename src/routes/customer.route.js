import { Router } from "express";
import { CustomerController } from "../controllers/customer.controller.js";

const controller = new CustomerController();
const router = Router();

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.post("/confirm-signin", controller.confirmSignIn);
router.post('/token', controller.newAccessToken);
router.post('/logout', controller.logOut)
export default router;
