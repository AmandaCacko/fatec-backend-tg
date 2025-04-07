import { Router } from "express";
import { handleCreateUser } from "../controllers/userController";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários cuidadores
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário cuidador
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - userEmail
 *               - userPassword
 *               - userType
 *             properties:
 *               userName:
 *                 type: string
 *                 example: João Silva
 *               userEmail:
 *                 type: string
 *                 example: joao@email.com
 *               userPassword:
 *                 type: string
 *                 example: minhaSenhaSegura123
 *               userType:
 *                 type: string
 *                 enum: [C, A]
 *                 description: Tipo de usuário (C = Cuidador, A = Admin)
 *                 example: C
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados incompletos
 *       500:
 *         description: Erro ao criar usuário
 */

router.post("/", handleCreateUser);

export default router;
