import express from "express";
import {doctorLogin, doctorRegistration, getAllDoctors} from "../controllers/doctors/doctor.login.js";
import getDoctorAppointments from "../controllers/doctors/doctorAppointments.js";
import updateAppointment from "../controllers/appointment/updateAppointment.js";
import getPatients from "../controllers/doctors/getPatients.js";
import getPatientByUsername from "../controllers/doctors/GetPatientById.js";

const router = express.Router()

router.post("/register", doctorRegistration);
router.post('/login',doctorLogin);

router.get('/getAppointments/:doctorId',getDoctorAppointments);
router.put('/updateAppointment/:appointmentId', (req, res, next) => {
	console.log(req.body);
	next();
}, updateAppointment);
router.get("/allDoctors", getAllDoctors);

router.get("/getPatients/:doctorId", getPatients);
router.get('/getPatientByUsername/:username', getPatientByUsername);

export default router;

