import express from "express";
import {createHospital,getAllHospital} from "../controllers/hospital/create.hospital.js";

const router = express.Router();
router.post('/createHospital', createHospital);
router.get('/getAllHospital', getAllHospital);


export default router;