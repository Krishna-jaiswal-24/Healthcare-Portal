import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

const createLog = (req, res, next) => {
	res.on("finish", function() {
		console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
	});
	next();
};

app.use(createLog);
//Routers
import patientRouter from "./routes/patient.js";
import doctorRouter from "./routes/doctor.js";
import hospitalRouter from "./routes/hospital.js";

app.use("/api/patient", patientRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/hospital", hospitalRouter);


export {app}