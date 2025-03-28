import { Router } from "express";
import { login, getUserProfile } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

/**
 * Rota para login
 * A função login é assíncrona e retorna um Promise<Response>
 */
router.post("/login", login);

/**
 * Rota para obter o perfil do usuário
 * A função getUserProfile é protegida por autenticação
 */
router.get("/profile", authenticate, getUserProfile);

export default router;
