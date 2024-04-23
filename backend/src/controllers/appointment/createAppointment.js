import Appointment from "../../models/appointment.js";

export const createAppointment = async (req, res) => {
	const {patientId, doctorId, appointmentDate, prescription,remarks,status,type} = req.body;

	if (!patientId || !doctorId ||  !appointmentDate) {
		return res.status(400).json({message: "Patient Id, doctorId and appointment required "});
	}

	const appointmentExists = await Appointment.findOne({patientId, doctorId, appointmentDate});

	if (appointmentExists) {
		return res.status(409).json({message: "Appointment already exists with the given details"});
	}

	const appointment = await Appointment.create({
		patient:patientId,
		doctor:doctorId,
		date:appointmentDate,
		prescription,
		remarks,
		status,
		type
	});

	if (!appointment) {
		return res.status(500).json({message: "Could not create the appointment"});
	}
	return res.status(201).json({message: "Appointment created successfully", appointment: appointment});
}


