import { Router } from "express";

import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import {registerValidation} from "../validations/auth.js";

const router = new Router();

router.post("/register", registerValidation, register);

router.post("/login", login);

router.get("/getMe", checkAuth , getMe);

export default router;
