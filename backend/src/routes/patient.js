import {register,login,getAllPatients,getPatient} from "../controllers/patients/patient.login.js";
import {createAppointment} from "../controllers/appointment/createAppointment.js";
import{ getAppointment} from "../controllers/appointment/getAppointment.js";
import {getPatientAppointments} from "../controllers/patients/patient.appointments.js";

import express from 'express';
const router = express.Router();
router.post('/register', register);
router.get('/allPatients', getAllPatients);
router.post('/login', login);
router.post('/createAppointment',createAppointment );
router.get('/getPatient/:patientId', getPatient);
router.get('/getPatientAppointments/:patientId', getPatientAppointments);
router.get('/getAppointment/:appointmentId', getAppointment);


export default router;