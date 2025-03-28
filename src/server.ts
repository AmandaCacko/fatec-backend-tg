import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupSwagger } from "./swagger";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import patientRoutes from "./routes/patientRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
