import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Routers
import patientRouter from "./routes/patient.js";
import doctorRouter from "./routes/doctor.js";
import hospitalRouter from "./routes/hospital.js";

app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/hospital", hospitalRouter);


export {app}