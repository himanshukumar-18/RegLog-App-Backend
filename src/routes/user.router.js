import { Router } from "express"
import { registerUser } from "../controller/users.controller.js";

const router = Router();

router.post("/register", registerUser)



export default router