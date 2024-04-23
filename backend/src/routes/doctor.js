import express from "express";
import { doctorRegistration } from "../controllers/doctors/doctor.login.js";

const router = express.Router()

router.post("/register", doctorRegistration);

export default router;

