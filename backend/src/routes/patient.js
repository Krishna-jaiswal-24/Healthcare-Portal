import {register,login} from "../controllers/patients/patient.login.js";
import {createAppointment} from "../controllers/appointment/createAppointment.js";
import express from 'express';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/createAppointment',createAppointment );
export default router;