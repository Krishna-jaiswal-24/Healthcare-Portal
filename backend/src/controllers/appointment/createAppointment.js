import Appointment from "../../models/appointment.js";
import Patient from "../../models/patients.js";

export const createAppointment = async (req, res) => {
	const { patientId, doctorId, appointmentDate, prescription, remarks, status, type } = req.body;

	if (!patientId || !doctorId || !appointmentDate) {
		return res.status(400).json({ message: "Patient ID, Doctor ID, and Appointment Date are required." });
	}

	// Correctly structured MongoDB query to find if an appointment already exists with the same details
	const appointmentExists = await Appointment.findOne({
		patient: patientId,
		doctor: doctorId,
		date: appointmentDate
	});

	if (appointmentExists) {
		return res.status(409).json({ message: "An appointment already exists with the given details" });
	}

	const patient=await Patient.findById(patientId);
	if(!patient){
		return res.status(404).json({message: "Patient not found"});
	}

	try {
		const newAppointment = new Appointment({
			patient: patientId,
			doctor: doctorId,
			date: appointmentDate,
			prescription,
			remarks,
			status,
			type
		});

		const savedAppointment = await newAppointment.save();

		if (!savedAppointment) {
			throw new Error("Failed to save the appointment.");
		}
		patient.appointments.push(savedAppointment._id);
		await patient.save();
		return res.status(201).json({ message: "Appointment created successfully", appointment: savedAppointment });
	} catch (error) {
		return res.status(500).json({ message: "Could not create the appointment", error: error.message });
	}
}
