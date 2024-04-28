import express from "express";
import {doctorLogin, doctorRegistration, getAllDoctors} from "../controllers/doctors/doctor.login.js";

const router = express.Router()

router.post("/register", doctorRegistration);
router.post('/login',doctorLogin);

router.get("/allDoctors", getAllDoctors);


export default router;

