import { Router } from "express";
import { createPatient, getPatients } from "../controllers/patientController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createPatient);
router.get("/:userId", authenticate, getPatients);

export default router;
