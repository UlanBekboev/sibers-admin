import { Router } from "express";
import { showLoginForm, login, logout } from "../controllers/authController.js";
import { validateLogin } from "../controllers/validationController.js";

const router = Router();

router.get("/login", showLoginForm);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;