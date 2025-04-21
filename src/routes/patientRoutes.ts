import { Router } from "express";
import { createPatient, getPatients } from "../controllers/patientController";
import { authenticate } from "../middleware/authMiddleware";
import * as patientController from "../controllers/patientController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de pacientes vinculados a cuidadores
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Cadastra um novo paciente vinculado ao cuidador autenticado
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       500:
 *         description: Erro ao criar paciente
 */
router.post("/", authenticate, patientController.createPatient);

/**
 * @swagger
 * /api/patients/{userId}:
 *   get:
 *     summary: Obtém a lista de pacientes de um cuidador específico
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cuidador
 *     responses:
 *       200:
 *         description: Lista de pacientes obtida com sucesso
 *       404:
 *         description: Cuidador não encontrado
 *       500:
 *         description: Erro ao obter pacientes
 */
router.get("/:userId", authenticate, getPatients);

export default router;
